const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.error('未找到 <script>'); process.exit(1); }
const code = m[1];
try {
  new Function(code);
  console.log('index.html 内联脚本语法 OK，长度', code.length);
} catch (e) {
  console.error('语法错误:', e.message);
  process.exit(1);
}
