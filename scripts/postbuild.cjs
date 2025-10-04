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
  // ВАЖНО: используем meta refresh для надежного редиректа в Telegram
  const spa404Html = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="refresh" content="0; url=/island-travel-echo-clone/" />
    <title>ПхукетGO - Загрузка...</title>
    <script type="text/javascript">
      // Telegram Mini App - instant redirect
      window.location.replace('/island-travel-echo-clone/' + window.location.search + window.location.hash);
    </script>
  </head>
  <body>
    <p style="text-align:center;padding:50px;">Загрузка...</p>
  </body>
</html>`;
  
  // Сохраняем файлы
  fs.writeFileSync(indexPath, html, "utf8");
  fs.writeFileSync(fallbackPath, spa404Html, "utf8");
  
  console.log("postbuild: appended build timestamp and wrote SPA 404.html");
  console.log(`postbuild: timestamp - ${ts}`);
}

run();
