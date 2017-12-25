const Koa = require('koa');
const ReactSSR = require('react-dom/server');
const path = require('path');
const fs = require('fs');
const serverEntry = require('../dist/server-entry').default;
const app = new Koa();
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8');
const staticServe = require("koa-static");

app.use(staticServe(path.join(__dirname, "../dist")));

app.use(async ctx => {
    let appString = ReactSSR.renderToString(serverEntry);
    ctx.body = template.replace('<app></app>', appString);
});

app.listen(3000);

console.log('server is start');