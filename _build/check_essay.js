const fs = require('fs');
const path = require('path');
global.window = {};
const src = fs.readFileSync(path.join(__dirname, '..', 'content.js'), 'utf8');
eval(src);
const d = window.COURSE_DATA;
let total = 0, empty = 0;
d.modules.forEach(m => m.chapters.forEach(c => {
  const es = (c.quizOriginal && c.quizOriginal.essay) || [];
  es.forEach((e, i) => {
    total++;
    if (!e.answer || !e.answer.trim()) {
      empty++;
      console.log(`[空答案] 第${c.num}章 第${i+1}题: ${e.q}`);
    }
  });
}));
console.log(`思考题/案例题总数: ${total}, 空答案数: ${empty}`);
