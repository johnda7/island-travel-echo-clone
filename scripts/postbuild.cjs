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
  
  // Создаем специальный 404.html для GitHub Pages SPA routing + Telegram Mini App
  const spa404Html = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ПхукетGO - Туры и экскурсии на Пхукете</title>
    <script type="text/javascript">
      // SPA Redirect for GitHub Pages + Telegram Mini App support
      // Instant redirect to index.html with preserved path
      (function() {
        var pathSegmentsToKeep = 1;
        var l = window.location;
        
        // Redirect to index.html with path stored in query param
        l.replace(
          l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
          l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + 
          '/?/' + l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
          (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
          l.hash
        );
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
  
  // Сохраняем файлы
  fs.writeFileSync(indexPath, html, "utf8");
  fs.writeFileSync(fallbackPath, spa404Html, "utf8");
  
  console.log("postbuild: appended build timestamp and wrote SPA 404.html");
  console.log(`postbuild: timestamp - ${ts}`);
}

run();
