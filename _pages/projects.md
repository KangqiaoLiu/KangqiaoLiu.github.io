---
layout: archive
title: "PROJECTS"
permalink: /projects/
author_profile: true
---

I use this page for research systems and tools that became useful beyond a single paper. I keep them public when the assumptions, tests, and workflow are clear enough to be reused.

<ol class="project-list" aria-label="Open projects">
  <li class="project-card">
    <div class="project-card__header">
      <div class="project-card__meta">
        <span class="project-card__category">Research tool · Scientific workflow</span>
      </div>
      <h2 class="project-card__title">Scientific Manuscript Audit</h2>
      <p class="project-card__lede">
        A manuscript-audit workflow for Codex and Claude Code that I use to stress-test
        claims, evidence, and revision decisions before submission.
      </p>
    </div>

    <div class="project-card__content">
      <p>
        The workflow starts from a paper's main claims and works backward to the evidence each
        claim actually needs. It checks technical correctness separately from novelty and
        significance, and keeps the final recommendation tied to the issues that would genuinely
        change a submission or revision decision.
      </p>

      <div class="project-card__workflow" aria-label="Review architecture">
        <span>Review architecture</span>
        <code>claim → burden of proof → inspected evidence → decision-relevant gap → bounded resolution → recommendation impact</code>
      </div>

      <ul class="project-card__features">
        <li>Traceable claim-to-evidence analysis</li>
        <li>Synthetic evaluation cases and automated validation</li>
        <li>Distribution packages for Codex and Claude Code</li>
        <li>Explicit confidentiality and responsible-use safeguards</li>
      </ul>

      <p class="project-card__scope">
        It is designed for author-owned, public, or explicitly authorized materials and is meant
        to support, rather than stand in for, scientific judgment.
      </p>
    </div>

    <div class="project-card__actions">
      <a class="ai-button ai-button--primary" href="https://github.com/KangqiaoLiu/scientific-manuscript-audit" target="_blank" rel="noopener">
        GitHub repository <span aria-hidden="true">↗</span>
      </a>
    </div>
  </li>
</ol>
