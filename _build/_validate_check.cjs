const fs = require('fs');
const path = require('path');
const dir = __dirname;
for (const f of ['ch05.js', 'ch06.js', 'ch07.js']) {
  const p = path.join(dir, f);
  const src = fs.readFileSync(p, 'utf8');
  // 检查是否有 ${ 和多余反引号（模板字符串内不允许出现）
  if (src.includes('${')) {
    console.log(f + ' : FAIL (contains ${)');
    continue;
  }
  try {
    // 用 Function 构造求值（裸对象字面量需要加括号）
    const obj = Function('return (' + src + ');')();
    const info = {
      id: obj.id,
      sections: obj.sections.length,
      choice: obj.quizOriginal.choice.length,
      essay: obj.quizOriginal.essay.length,
      self: obj.quizSelf.length,
      mapNodes: obj.map.length
    };
    // 检查每题答案下标是否越界
    let bad = 0;
    for (const q of obj.quizOriginal.choice) {
      if (q.a < 0 || q.a >= q.opts.length) { bad++; console.log('  bad original choice answer: ' + q.q); }
    }
    for (const q of obj.quizSelf) {
      if (q.a < 0 || q.a >= q.opts.length) { bad++; console.log('  bad self choice answer: ' + q.q); }
    }
    console.log(f + ' : OK ' + JSON.stringify(info) + (bad ? ' BAD_ANSWERS=' + bad : ''));
  } catch (e) {
    console.log(f + ' : FAIL ' + e.message);
  }
}
