# -*- coding: utf-8 -*-
"""把 _build/chNN.js 各章片段组装成 content.js"""
import os, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

build_dir = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(build_dir)

MODULES = [
    {
        "id": "m1",
        "title": "第一部分 · IT技术基础",
        "range": "第 1—8 章",
        "logic": "编写套路：从宏观到微观、从抽象到具体。概念定义 → 分类/组成 → 架构/模式 → 实际应用。",
        "weight": "选择题为主，分值占比中，不追求死记硬背，重在建立印象。",
        "chapters": ["01", "02", "03", "04", "05", "06", "07", "08"],
    },
    {
        "id": "m2",
        "title": "第二部分 · 项目管理核心",
        "range": "第 9—14 章",
        "logic": "编写套路：严格遵循项目生命周期因果律——启动（决策）→ 规划（计划）→ 执行（干活）→ 监控（纠偏）→ 收尾（交差）。每个子过程全是「输入 → 工具与技术 → 输出」。",
        "weight": "考试绝对大头！选择题约 40 分，案例题全部围绕此部分，需精读。",
        "chapters": ["09", "10", "11", "12", "13", "14"],
    },
    {
        "id": "m3",
        "title": "第三部分 · 组织与支撑",
        "range": "第 15—18 章",
        "logic": "编写套路：外围保障与兜底。项目不在真空里，需要配置变更、监理、法律标准、职业道德来保证合法合规。",
        "weight": "分值相对少，重在理解与记忆关键条款。",
        "chapters": ["15", "16", "17", "18"],
    },
]

def load(num):
    p = os.path.join(build_dir, f"ch{num}.js")
    if not os.path.exists(p):
        return None
    with open(p, encoding="utf-8") as f:
        s = f.read().strip()
    return s.rstrip(",").rstrip()

header = '''/* ============================================================
 * 系统集成项目管理工程师（第3版）备考助手 —— 内容数据
 * 依据《系统集成项目管理工程师教程（第3版）》（2024年下半年启用）逐章重写
 * 结构：
 *   authorLogic  = 作者写作思路（= 出题逻辑）
 *   map          = 章节逻辑架构图（树形）
 *   sections[]   = 各节（position 定位 + body 核心内容/考点/口诀）
 *   quizOriginal = 教材原题（choice 选择题 + essay 思考题，题干/答案忠于原文）
 *   quizSelf     = 出题人自编题
 * ============================================================ */

window.COURSE_DATA = {
  title: "系统集成项目管理工程师",
  subtitle: "备考助手 · 第3版教材",
  edition: "依据《系统集成项目管理工程师教程（第3版）》（2024年下半年启用）逐章重写",
  note: "内容按「作者思路=出题思路」组织。训练题分两类：📗 教材原题（本章练习原题+原答案）与 ✍️ 自编题（出题人结合考点新拟），思考题附参考要点。",

  modules: [
'''

parts = [header]
for mi, m in enumerate(MODULES):
    parts.append('    {\n')
    parts.append(f'      id: "{m["id"]}",\n')
    parts.append(f'      title: "{m["title"]}",\n')
    parts.append(f'      range: "{m["range"]}",\n')
    parts.append(f'      logic: "{m["logic"]}",\n')
    parts.append(f'      weight: "{m["weight"]}",\n')
    parts.append('      chapters: [\n')
    frags = []
    for num in m["chapters"]:
        s = load(num)
        if s is None:
            print(f"[warn] 缺少 ch{num}.js，跳过")
            continue
        frags.append("        " + s.replace("\n", "\n        "))
    parts.append(",\n".join(frags))
    parts.append('\n      ]\n    }' + ("," if mi < len(MODULES)-1 else ""))
    parts.append('\n')

parts.append('''
  ]
};
''')

out = "".join(parts)
out_path = os.path.join(root, "content.js")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(out)
print(f"已生成 {out_path}  ({len(out)} chars)")
