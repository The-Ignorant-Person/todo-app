// Throwaway refinement. No production persistence, accounts, billing, or sync.
const compactScreen=()=>matchMedia('(max-width:900px)').matches;
let taskQuery='',taskSort='manual',entryDraft='',undoItem=null;
const noteDrafts=new Map();
const previousBind=bind,previousRender=render;
selected=null;
function workspaceTasks(){
  let arr=tasks.filter(t=>filter==='已完成'?t.done:filter==='全部'?true:filter==='今天'?!t.done:t.list===filter&&!t.done);
  if(taskQuery)arr=arr.filter(t=>(t.title+' '+t.note+' '+t.list).toLowerCase().includes(taskQuery.toLowerCase()));
  if(taskSort==='time')arr=arr.slice().sort((a,b)=>(a.time||'99:99').localeCompare(b.time||'99:99'));
  return arr;
}
function closeTask(){const last=selected;selected=null;render();(document.querySelector(`[data-select="${last}"]`)||document.getElementById('new-task'))?.focus({preventScroll:true})}
function openTask(id){selected=id;render();if(!compactScreen())document.getElementById('detail-title')?.focus({preventScroll:true})}
function toggleTask(id){
  const task=tasks.find(t=>t.id===id),before=task.done;task.done=!before;
  if(state==='offline')pending++;
  undoItem={id,before};if(selected===id)selected=null;render();
  notify((task.done?'已完成：':'已重新打开：')+task.title,true);
  (document.querySelector('[data-done]')||document.getElementById('new-task'))?.focus({preventScroll:true});
}
notify=function(text,canUndo=false){
  clearTimeout(timer);const notice=document.getElementById('notice');
  notice.innerHTML=`<span>${esc(text)}</span>${canUndo?'<button class="outline" id="undo-task">撤销</button>':''}`;
  if(canUndo)document.getElementById('undo-task').onclick=()=>{
    const t=tasks.find(t=>t.id===undoItem?.id);if(t){t.done=undoItem.before;if(state==='offline')pending++;render();notify('已撤销，任务已恢复。');document.querySelector(`[data-select="${t.id}"]`)?.focus({preventScroll:true})}undoItem=null;
  };
  // Keep an undo affordance until another action replaces it, without a timer race.
  if(!canUndo)timer=setTimeout(()=>{if(!notice.contains(document.activeElement))notice.textContent=''},5000);
};
detail=function(){
  const t=tasks.find(t=>t.id===selected);if(!t||state==='loading'||state==='error')return '';
  const mobile=compactScreen(),tag=mobile?'dialog':'aside';
  return `<${tag} id="task-detail" class="detail workspace-detail" aria-labelledby="detail-title"><div class="detail-top"><span class="muted">${esc(t.list)} / 任务</span><button id="close-detail" class="outline" aria-label="关闭任务详情">关闭 <kbd>Esc</kbd></button></div><h2 id="detail-title" tabindex="-1">${esc(t.title)}</h2><div class="detail-badges"><span>10 月 18 日${t.time?' · '+t.time:' · 仅日期'}</span><span>${t.done?'已完成':'未完成'}</span></div><form id="note-form"><label for="task-note">备注</label><textarea id="task-note" maxlength="2000" placeholder="补充这件事需要的信息…">${esc(noteDrafts.get(t.id)??t.note)}</textarea><div class="note-actions"><small id="draft-state">${noteDrafts.has(t.id)&&noteDrafts.get(t.id)!==t.note?'未保存草稿':'已保存到本次演示'}</small><button class="primary" type="submit">保存备注</button></div></form><button class="outline detail-complete" data-done="${t.id}">${t.done?'重新打开任务':'完成这件事'}</button><p class="hint">${state==='offline'?'离线编辑 · 保存后加入待同步。':'关闭详情后，未保存的草稿仍保留在本次页面中。'}</p></${tag}>`;
};
app=function(){
  const arr=workspaceTasks(),done=tasks.filter(t=>t.done).length;
  const navNames=['今天','全部','已完成'];
  const taskNav=navNames.map(n=>`<button class="nav-button ${filter===n?'active':''}" data-filter="${n}" aria-pressed="${filter===n}"><span>${n}</span><span class="count">${n==='已完成'?done:n==='全部'?tasks.length:tasks.length-done}</span></button>`).join('');
  let body='';
  if(state==='loading')body='<section class="state-box" aria-busy="true"><h2>正在读取清单…</h2><div class="skeleton"></div><div class="skeleton short"></div><button class="outline" data-state="normal">结束加载演示</button></section>';
  else if(state==='error')body='<section class="state-box"><h2>暂时无法读取清单</h2><p>连接恢复后可以重试。读取失败不代表任务已被删除。</p><button class="primary" data-state="normal">重新加载</button><button data-scene="help">查看帮助</button></section>';
  else body=`${state==='offline'?`<div class="offline-help"><span>当前离线，可继续编辑。${pending} 项变更待同步。</span><button class="outline" data-state="normal">模拟恢复联网</button></div>`:''}<form class="entry" id="add-form"><label for="new-task">添加今天的任务</label><span class="add-sign" aria-hidden="true">＋</span><input id="new-task" maxlength="160" value="${esc(entryDraft)}" placeholder="添加一件事，按 Enter 保存" autocomplete="off" required><button class="primary" type="submit">添加</button></form><div class="workspace-toolbar"><label class="task-search"><span class="sr-only">搜索当前视图任务</span><input id="task-search" type="search" value="${esc(taskQuery)}" placeholder="搜索任务或备注…" aria-keyshortcuts="/"></label><label class="sort-control"><span class="sr-only">任务排序</span><select id="task-sort"><option value="manual" ${taskSort==='manual'?'selected':''}>添加顺序</option><option value="time" ${taskSort==='time'?'selected':''}>按时间</option></select></label></div><div class="list-heading"><span>${taskQuery?'搜索结果':esc(filter)} · ${arr.length} 件</span><span>${done} 件已完成</span></div><section id="task-rows" aria-label="任务列表">${arr.length?arr.map(row).join(''):`<div class="state-box"><h2>${taskQuery?'没有找到匹配的任务':filter==='已完成'?'还没有已完成的任务':'今天，从一件小事开始。'}</h2><p>${taskQuery?'试试更短的关键词，或清除搜索条件。':filter==='已完成'?'完成的事情会保留在这里，随时可以回看。':'写下来，就不用一直记在脑海里。'}</p><button class="outline" id="${taskQuery?'clear-task-search':'focus-add'}">${taskQuery?'清除搜索':'添加一件事'}</button></div>`}</section><p class="workspace-tip"><kbd>N</kbd> 添加任务 <span>·</span> <kbd>/</kbd> 搜索 <span>·</span> <kbd>Esc</kbd> 关闭详情</p>`;
  return `<div class="app A workspace-layout ${selected!==null?'with-detail':''}"><aside class="sidebar">${brand()}<p class="workspace-name">我的日常</p><nav aria-label="任务视图">${taskNav}</nav><p class="group">清单</p><div class="lists">${['学习','个人项目','生活'].map(n=>`<button class="nav-button ${filter===n?'active':''}" data-filter="${n}" aria-pressed="${filter===n}"><span class="list-dot" aria-hidden="true"></span><span>${n}</span><span class="count">${tasks.filter(t=>t.list===n&&!t.done).length}</span></button>`).join('')}</div><div class="sidebar-links">${link('home','官网')}${link('help','帮助')}${link('membership','会员')}</div><p class="foot">在一页一页里，<br>把生活轻轻安顿。</p></aside><main id="main" class="workspace" tabindex="-1"><div class="heading"><div><p class="date">星期日 · 2026 年 10 月 18 日</p><h1>${esc(filter)}</h1></div>${status()}</div><div class="mobile-list-select"><label for="mobile-list">查看</label><select id="mobile-list">${[...navNames,'学习','个人项目','生活'].map(n=>`<option ${filter===n?'selected':''}>${n}</option>`).join('')}</select></div>${body}</main>${detail()}</div>`;
};
bind=function(){
  if(scene!=='app')previousBind();
  else {
    document.querySelectorAll('[data-scene]').forEach(el=>el.onclick=e=>{if(e.ctrlKey||e.metaKey||e.shiftKey)return;e.preventDefault();navigate(el.dataset.scene)});
    document.querySelectorAll('[data-state]').forEach(el=>el.onclick=()=>applyState(el.dataset.state));
  }
  document.querySelectorAll('[data-filter]').forEach(el=>el.onclick=()=>{filter=el.dataset.filter;taskQuery='';selected=null;render();document.querySelector(`[data-filter="${filter}"]`)?.focus({preventScroll:true})});
  document.querySelectorAll('[data-select]').forEach(el=>el.onclick=()=>openTask(Number(el.dataset.select)));
  document.querySelectorAll('[data-done]').forEach(el=>el.onclick=()=>toggleTask(Number(el.dataset.done)));
  const note=document.getElementById('task-note');
  if(note)note.oninput=()=>{noteDrafts.set(selected,note.value);document.getElementById('draft-state').textContent=note.value===tasks.find(t=>t.id===selected).note?'已保存到本次演示':'未保存草稿'};
  const form=document.getElementById('note-form');if(form)form.onsubmit=e=>{e.preventDefault();const t=tasks.find(t=>t.id===selected);t.note=note.value;noteDrafts.delete(selected);if(state==='offline')pending++;render();notify('备注已保存'+(state==='offline'?' · 待同步':''))};
  // Replace the original add form handler by replacing its DOM node.
  const add=document.getElementById('add-form');if(add){const clean=add.cloneNode(true);add.replaceWith(clean);const input=clean.querySelector('input');input.oninput=()=>{entryDraft=input.value;input.setCustomValidity('')};clean.onkeydown=e=>{if(e.key==='Enter'&&e.isComposing)e.preventDefault()};clean.onsubmit=e=>{e.preventDefault();const title=input.value.trim();if(!title){input.setCustomValidity('请输入任务名称');input.reportValidity();return}tasks.unshift({id:counter++,title,list:['学习','个人项目','生活'].includes(filter)?filter:'生活',time:'',note:'',done:false});if(state==='offline')pending++;if(state==='empty')state='normal';entryDraft='';taskQuery='';filter='今天';render();document.getElementById('new-task').focus();notify('已添加到今天'+(state==='offline'?' · 待同步':''))}}
  const search=document.getElementById('task-search');if(search){const update=()=>{taskQuery=search.value;render();document.getElementById('task-search')?.focus({preventScroll:true})};search.oninput=e=>{if(!e.isComposing)update()};search.oncompositionend=update}
  document.getElementById('task-sort')?.addEventListener('change',e=>{taskSort=e.target.value;render();document.getElementById('task-sort').focus()});
  document.getElementById('mobile-list')?.addEventListener('change',e=>{filter=e.target.value;taskQuery='';render()});
  document.getElementById('clear-task-search')?.addEventListener('click',()=>{taskQuery='';render();document.getElementById('task-search').focus()});
  document.getElementById('focus-add')?.addEventListener('click',()=>document.getElementById('new-task')?.focus());
  const close=document.getElementById('close-detail');if(close)close.onclick=closeTask;
  const modal=document.getElementById('task-detail');if(modal?.tagName==='DIALOG'){modal.showModal();modal.oncancel=e=>{e.preventDefault();closeTask()}}
  // Search terms are literal, case-insensitive, and ignore whitespace in helper copy.
  const helpInput=document.getElementById('help-query');if(helpInput)helpInput.placeholder='搜索任务、离线或会员问题…';
};
render=function(){document.body.removeAttribute('data-scene');document.body.onclick=null;previousRender();document.body.dataset.page=scene};
document.getElementById('reset').onclick=()=>{tasks=structuredClone(initial);selected=null;filter='今天';state='normal';pending=0;query='';topic='全部';taskQuery='';entryDraft='';taskSort='manual';noteDrafts.clear();undoItem=null;render();notify('示例已重置')};
document.addEventListener('keydown',e=>{
  if(e.isComposing||e.altKey||e.ctrlKey||e.metaKey)return;
  if(e.key==='Escape'&&scene==='app'&&selected!==null&&!document.querySelector('dialog[open]')){e.preventDefault();closeTask();return}
  if(e.target.closest('input,textarea,select,[contenteditable],dialog'))return;
  if(e.key.toLowerCase()==='n'&&scene==='app'){e.preventDefault();document.getElementById('new-task')?.focus()}
  if(e.key==='/'){const target=document.getElementById(scene==='help'?'help-query':'task-search');if(target){e.preventDefault();target.focus()}}
});
matchMedia('(max-width:900px)').addEventListener('change',()=>{if(scene==='app')render()});
render();

