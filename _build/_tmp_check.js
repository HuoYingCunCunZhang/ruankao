const fs = require('fs');
const path = require('path');
const dir = __dirname;
for (const f of ['ch14.js', 'ch15.js', 'ch16.js']) {
  const s = fs.readFileSync(path.join(dir, f), 'utf8');
  try {
    const o = eval('(' + s + ')');
    const qo = o.quizOriginal || {};
    console.log(
      f,
      '| title=' + o.title,
      '| sections=' + o.sections.length,
      '| choice=' + (qo.choice || []).length,
      '| essay=' + (qo.essay || []).length,
      '| self=' + (o.quizSelf || []).length
    );
    // 校验选择题答案下标范围
    let bad = [];
    (qo.choice || []).forEach((x, i) => { if (x.a < 0 || x.a > 3 || x.a >= x.opts.length) bad.push('choice#' + i); });
    (o.quizSelf || []).forEach((x, i) => { if (x.a < 0 || x.a > 3 || x.a >= x.opts.length) bad.push('self#' + i); });
    if (bad.length) console.log('  !! 答案下标越界:', bad.join(','));
  } catch (e) {
    console.log(f, 'SYNTAX ERROR:', e.message);
  }
}
