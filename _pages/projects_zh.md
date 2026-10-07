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
</ol>
