---
layout: archive
title: "项目"
permalink: /projects_zh/
author_profile: true
---

这里收录的是从实际科研流程中逐渐长出来、并且值得在单篇论文之外继续复用的研究系统与工具。只有当假设、测试和使用流程足够清楚时，我才会把它们公开出来。

<ol class="project-list" aria-label="开放项目">
  <li class="project-card">
    <div class="project-card__header">
      <div class="project-card__meta">
        <span class="project-card__category">科研工具 · 科学工作流</span>
      </div>
      <h2 class="project-card__title">Scientific Manuscript Audit</h2>
      <p class="project-card__lede">
        一个用于 Codex 与 Claude Code 的稿件审查工作流。我主要用它在投稿前或修订时反复检查论文的主张、证据和真正影响决策的问题。
      </p>
    </div>

    <div class="project-card__content">
      <p>
        这个工作流从论文最核心的主张出发，反向检查每项主张实际需要哪些证据。技术正确性、创新性和科学意义分别处理，
        最后的判断只落在那些真正会改变投稿或修订决定的问题上。
      </p>

      <div class="project-card__workflow" aria-label="审查结构">
        <span>审查结构</span>
        <code>主张 → 证明责任 → 已检查证据 → 决策相关缺口 → 有边界的解决方案 → 对投稿建议的影响</code>
      </div>

      <ul class="project-card__features">
        <li>可追踪的主张—证据分析</li>
        <li>合成评测案例与自动化校验</li>
        <li>Codex 与 Claude Code 分发包</li>
        <li>明确的保密性与负责任使用保护</li>
      </ul>

      <p class="project-card__scope">
        本项目用于作者自有、已经公开或已明确授权处理的材料，目标是辅助科研判断，而不是代替同行评审或编辑决定。
      </p>
    </div>

    <div class="project-card__actions">
      <a class="ai-button ai-button--primary" href="https://github.com/KangqiaoLiu/scientific-manuscript-audit" target="_blank" rel="noopener">
        GitHub 仓库 <span aria-hidden="true">↗</span>
      </a>
    </div>
  </li>

  <li class="project-card">
    <div class="project-card__header">
      <div class="project-card__meta">
        <span class="project-card__category">开放课程资源 · 交互式物理学习</span>
      </div>
      <h2 class="project-card__title">Advanced Quantum Mechanics · 高等量子力学</h2>
      <p class="project-card__lede">
        面向研究生的全英文讲义，以及支持课后自主探索的浏览器交互材料。
      </p>
    </div>

    <div class="project-card__content">
      <p>
        课程涵盖九章高等量子力学内容，强调完整的数学推导和具体物理模型。
        配套的35个交互实验将抽象公式与能谱、动力学、量子测量、散射、拓扑和量子学习中的定量结果联系起来。
        每个实验提供明确的模型假设、独立数值检验和探索性问题，
        便于学生结合计算工具与 AI 辅助学习进行推导复核和自主研究。
        讲义在对应推导处提供各实验的直接入口与学习提示，便于边学习、边计算、边验证。
      </p>
      <p class="project-card__scope">
        英文讲义与交互材料可直接在线使用。公开仓库保留相应的物理模型与课程材料，
        便于有兴趣的读者检查计算过程并进一步探索。 使用与改编范围见<a href="https://github.com/KangqiaoLiu/advanced-quantum-mechanics-lecture-note/blob/main/COPYRIGHT.md" target="_blank" rel="noopener">版权与许可说明</a>。
      </p>
    </div>

    <div class="project-card__actions">
      <a class="ai-button ai-button--primary" href="/courses/advanced-quantum-mechanics/companion/">
        交互式课程 <span aria-hidden="true">↗</span>
      </a>
      <a class="ai-button" href="/courses/advanced-quantum-mechanics/pdf/advanced-quantum-mechanics.pdf" target="_blank" rel="noopener" type="application/pdf">
        英文讲义 PDF <span aria-hidden="true">↗</span>
      </a>
      <a class="ai-button" href="https://github.com/KangqiaoLiu/advanced-quantum-mechanics-lecture-note" target="_blank" rel="noopener">
        公开仓库 <span aria-hidden="true">↗</span>
      </a>
    </div>
  </li>
</ol>
