---
layout: archive
title: "PROJECTS"
permalink: /projects/
author_profile: true
---

{% include base_path %}

This page highlights open-source tools, software, and research-derived projects developed to make rigorous scientific work more usable beyond individual papers. Projects are listed here in a compact form; larger projects may later receive dedicated pages.

[中文版](/projects_zh/)

## Scientific Manuscript Audit

**Scientific Manuscript Audit** is an open-source, author-side manuscript audit skill for Codex and Claude Code. It turns demanding pre-submission and revision checks into a traceable workflow built around:

```text
claim → burden of proof → inspected evidence → decision-relevant gap → bounded resolution → recommendation impact
```

The skill reconstructs a paper's central claims, maps them to the available evidence, separates technical correctness from novelty and significance, calibrates issue severity by recoverability, and keeps the final recommendation consistent with the major findings. The repository also includes synthetic evaluation cases, distribution packages for Codex and Claude Code, and explicit safeguards for confidentiality and responsible use.

It is intended for author-owned, public, or explicitly authorized materials. It does not replace human peer review or editorial judgment.

[View the project on GitHub](https://github.com/KangqiaoLiu/scientific-manuscript-audit){: .btn .btn--primary }
