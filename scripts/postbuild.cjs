// Append build timestamp to index.html and ensure 404.html mirrors it (SPA fallback)
const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "../dist");
const indexPath = path.join(distDir, "index.html");
const fallbackPath = path.join(distDir, "404.html");

function run() {
  if (!fs.existsSync(indexPath)) {
    console.error("postbuild: dist/index.html not found");
    process.exit(0);
  }
  
  const ts = new Date().toISOString();
  let html = fs.readFileSync(indexPath, "utf8");
  
  // Удаляем предыдущие метки сборки, если они уже есть
  html = html.replace(/<!-- build:.*? -->\n/g, "");
  
  // Добавляем новую метку сборки
  const buildMark = `<!-- build:${ts} -->\n`;
  html += buildMark;
  
  // Создаем 404.html для HashRouter - АБСОЛЮТНО невидимый МГНОВЕННЫЙ редирект
  const spa404Html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0; url=/island-travel-echo-clone/#/">
  <title>ПхукетGO</title>
  <style>*{display:none!important;visibility:hidden!important;opacity:0!important;}</style>
  <script>
    (function(){var l=window.location,b='/island-travel-echo-clone',p=l.pathname.replace(b,'').replace(/^\\/+/,'');if(p)l.replace(b+'/#/'+p+(l.search||''));else l.replace(b+'/#/')})();
  </script>
</head>
<body style="display:none!important"></body>
</html>`;
  
  // Сохраняем файлы
  fs.writeFileSync(indexPath, html, "utf8");
  fs.writeFileSync(fallbackPath, spa404Html, "utf8");
  
  console.log("postbuild: appended build timestamp and wrote SPA 404.html");
  console.log(`postbuild: timestamp - ${ts}`);
}

run();
