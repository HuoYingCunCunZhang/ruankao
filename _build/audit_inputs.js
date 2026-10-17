const fs = require('fs');
const path = require('path');
global.window = {};
const src = fs.readFileSync(path.join(__dirname, '..', 'content.js'), 'utf8');
eval(src);
const d = window.COURSE_DATA;

d.modules.forEach(m => m.chapters.forEach(c => {
  c.sections.forEach(s => {
    const body = s.body || '';
    // 判断是否缺「输入」（过程型小节应有输入；用启发式：标题含“过程组”的章节重点检查）
    const hasInput = /输入/.test(body);
    if (!hasInput) {
      console.log(`[缺输入] 第${c.num}章 ${s.num} ${s.title}`);
    }
  });
}));
