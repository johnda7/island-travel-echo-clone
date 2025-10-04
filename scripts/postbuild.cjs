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
  
  // Создаем 404.html для HashRouter с сохранением путей (умный редирект)
  const spa404Html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ПхукетGO - Загрузка...</title>
  <script>
    // Умный редирект для HashRouter с сохранением пути
    (function() {
      var l = window.location;
      var basePath = '/island-travel-echo-clone';
      
      // Получаем путь после базового пути
      var pathAfterBase = l.pathname.replace(basePath, '').replace(/^\\//, '');
      
      // Если есть путь после базового, добавляем его к hash
      var redirectPath = basePath + '/#/' + pathAfterBase;
      
      // Сохраняем query параметры
      if (l.search) {
        redirectPath += l.search;
      }
      
      // Мгновенный редирект
      l.replace(redirectPath);
    })();
  </script>
  <!-- Fallback для браузеров без JS -->
  <meta http-equiv="refresh" content="0;url=/island-travel-echo-clone/#/">
</head>
<body>
  <div style="text-align:center;padding:50px;font-family:Arial,sans-serif;">
    <p>Загрузка...</p>
    <p><a href="/island-travel-echo-clone/#/">Если страница не загрузилась, нажмите здесь</a></p>
  </div>
</body>
</html>`;
  
  // Сохраняем файлы
  fs.writeFileSync(indexPath, html, "utf8");
  fs.writeFileSync(fallbackPath, spa404Html, "utf8");
  
  console.log("postbuild: appended build timestamp and wrote SPA 404.html");
  console.log(`postbuild: timestamp - ${ts}`);
}

run();
