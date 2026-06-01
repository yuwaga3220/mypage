/**
 * src/ 以下のパーシャル・セクションを index.template.html に結合し、
 * ルートの index.html を生成する。
 *
 * 使い方: node scripts/build.js  （npm run build）
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");
const INCLUDE_RE = /(\n?)([ \t]*)<!--\s*include:([^\s]+)\s*-->/g;

function readPartial(relativePath) {
  const filePath = path.join(SRC, relativePath);
  if (!fs.existsSync(filePath)) {
    throw new Error("Missing partial: " + relativePath);
  }
  return fs.readFileSync(filePath, "utf8").trimEnd();
}

function indentLines(text, indent) {
  if (!indent) return text;
  return text
    .split("\n")
    .map(function (line) {
      return line.length === 0 ? line : indent + line;
    })
    .join("\n");
}

function buildHtml(template) {
  return template.replace(INCLUDE_RE, function (_match, _newline, indent, relativePath) {
    const content = indentLines(readPartial(relativePath), indent);
    return "\n" + content;
  });
}

function main() {
  const templatePath = path.join(SRC, "index.template.html");
  const outPath = path.join(ROOT, "index.html");

  if (!fs.existsSync(templatePath)) {
    console.error("Template not found:", templatePath);
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, "utf8");
  const banner =
    "<!-- Generated from src/. Edit src/ and run: npm run build -->\n";
  const html = banner + buildHtml(template) + "\n";

  fs.writeFileSync(outPath, html, "utf8");
  console.log("Built", path.relative(ROOT, outPath));
}

main();
