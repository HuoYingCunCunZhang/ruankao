const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'content.js'), 'utf8');
global.window = {};
eval(src);
const d = window.COURSE_DATA;
let totalSections = 0, totalChoice = 0, totalEssay = 0, totalSelf = 0, totalCh = 0;
d.modules.forEach(m => m.chapters.forEach(c => {
  totalCh++;
  totalSections += c.sections.length;
  if (c.quizOriginal) { totalChoice += (c.quizOriginal.choice||[]).length; totalEssay += (c.quizOriginal.essay||[]).length; }
  totalSelf += (c.quizSelf||[]).length;
}));
console.log('模块数:', d.modules.length, '| 章数:', totalCh);
console.log('小节数:', totalSections, '| 教材原题选择题:', totalChoice, '思考题:', totalEssay, '| 自编题:', totalSelf);
const c1 = d.modules[0].chapters[0];
console.log('第1章标题:', c1.title, '| 小节:', c1.sections.map(s=>s.num).join(', '));
console.log('OK: JS 语法与结构校验通过');
