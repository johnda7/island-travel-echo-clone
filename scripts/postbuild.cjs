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
  
  // Создаем специальный 404.html для GitHub Pages SPA routing
  const spa404Html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Island Travel</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // https://github.com/rafgraph/spa-github-pages
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + 
        '/#' + l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/') + 
        (l.search ? '&' + l.search.slice(1) : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>`;
  
  // Сохраняем файлы
  fs.writeFileSync(indexPath, html, "utf8");
  fs.writeFileSync(fallbackPath, spa404Html, "utf8");
  
  console.log("postbuild: appended build timestamp and wrote SPA 404.html");
  console.log(`postbuild: timestamp - ${ts}`);
}

run();
