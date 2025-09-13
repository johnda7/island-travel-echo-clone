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
  html += `\n<!-- build:${ts} -->\n`;
  fs.writeFileSync(indexPath, html, "utf8");
  fs.writeFileSync(fallbackPath, html, "utf8");
  console.log("postbuild: appended build timestamp and wrote 404.html");
}

run();
