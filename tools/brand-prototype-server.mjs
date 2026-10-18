// Throwaway preview server: only this prototype and its existing brand reference.
import http from 'node:http';
import fs from 'node:fs';
const root = new URL('../', import.meta.url);
const routes = new Map([
  ['/docs/product/prototypes/brand-workspace.js', ['docs/product/prototypes/brand-workspace.js', 'text/javascript; charset=utf-8']],
  ['/docs/product/prototypes/brand-unified-prototype.html', ['docs/product/prototypes/brand-unified-prototype.html', 'text/html; charset=utf-8']],
  ['/docs/product/prototypes/brand-unified-base.css', ['docs/product/prototypes/brand-unified-base.css', 'text/css; charset=utf-8']],
  ['/docs/product/prototypes/brand-unified.css', ['docs/product/prototypes/brand-unified.css', 'text/css; charset=utf-8']],
  ['/docs/product/prototypes/brand-unified.js', ['docs/product/prototypes/brand-unified.js', 'text/javascript; charset=utf-8']],
  ['/docs/product/prototypes/brand-day-prototype.html', ['docs/product/prototypes/brand-day-prototype.html', 'text/html; charset=utf-8']],
  ['/docs/assets/brand-concept.png', ['docs/assets/brand-concept.png', 'image/png']],
]);
http.createServer((req,res)=>{
  const path = new URL(req.url,'http://localhost').pathname;
  if(path==='/'){res.writeHead(302,{Location:'/docs/product/prototypes/brand-unified-prototype.html?scene=home'});res.end();return;}
  const route=routes.get(path);
  if(!route){res.writeHead(404);res.end();return;}
  res.writeHead(200,{'Content-Type':route[1],'Cache-Control':'no-store'});
  fs.createReadStream(new URL(route[0],root)).pipe(res);
}).listen(4178,'127.0.0.1',()=>console.log('Paperdo prototype: http://127.0.0.1:4178'));
