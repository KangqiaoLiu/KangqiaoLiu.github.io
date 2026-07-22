---
layout: archive
title: "PROJECTS"
permalink: /projects/
author_profile: true
---

<ol class="project-list" aria-label="Open projects">
  <li class="project-card">
    <div class="project-card__header">
      <div class="project-card__meta">
        <span class="project-card__category">Open source · Research tooling</span>
        <span class="project-card__status">Release candidate</span>
      </div>
      <h2 class="project-card__title">Scientific Manuscript Audit</h2>
      <p class="project-card__lede">
        An author-side manuscript audit skill for Codex and Claude Code, built for rigorous
        pre-submission and revision quality control.
      </p>
    </div>

    <div class="project-card__content">
      <p>
        The skill reconstructs a paper's central claims, maps them to the available evidence,
        separates technical correctness from novelty and significance, and calibrates issue
        severity by recoverability. Its final recommendation remains explicitly tied to the
        major findings rather than produced as an isolated verdict.
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
        Intended for author-owned, public, or explicitly authorized materials. It does not
        replace human peer review or editorial judgment.
      </p>
    </div>

    <div class="project-card__actions">
      <a class="ai-button ai-button--primary" href="https://github.com/KangqiaoLiu/scientific-manuscript-audit" target="_blank" rel="noopener">
        GitHub repository <span aria-hidden="true">↗</span>
      </a>
    </div>
  </li>
</ol>
