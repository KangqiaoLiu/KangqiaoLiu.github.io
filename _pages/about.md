---
layout: default
permalink: /
title: "Kangqiao LIU 刘康桥"
excerpt: "Theoretical physics, quantum information, and machine learning"
author_profile: false
redirect_from: 
  - /about/
  - /about.html
---

<div class="ai-home">
  <div class="ai-container">
    <section class="ai-hero" aria-labelledby="ai-home-title">
      <div class="ai-hero__copy ai-reveal">
        <p class="ai-eyebrow">Theoretical Physics · Quantum Information · Machine Learning</p>
        <h1 class="ai-hero__title" id="ai-home-title">
          <span>Kangqiao Liu</span>
          <span class="ai-name-cn">刘康桥</span>
        </h1>
        <p class="ai-hero__lede">
          I study fluctuations, information, response, and complexity across nonequilibrium,
          quantum, gravitational, and learning systems.
        </p>

        <div class="ai-hero__actions" aria-label="Primary links">
          <a class="ai-button ai-button--primary" href="{{ '/research/' | relative_url }}">Explore research</a>
          <a class="ai-button" href="{{ '/publications/' | relative_url }}">View publications</a>
          <a class="ai-button" href="{{ '/cv/' | relative_url }}">Curriculum vitae</a>
        </div>

        <div class="ai-hero__meta">
          <div>
            <strong>Lecturer of Physics</strong>
            School of Science, Xihua University
          </div>
          <div>
            <strong>Based in Chengdu</strong>
            Sichuan, China 610039
          </div>
        </div>

        <div class="ai-home-links">
          <p class="ai-home-links__label">Academic profiles</p>
          {% include academic-links.html mode="hero" %}
        </div>
      </div>

      <div class="ai-home-media ai-reveal">
        <figure class="ai-home-photo-card">
          <img src="{{ '/images/IMG_6440-min.jpeg' | relative_url }}" alt="Portrait of Kangqiao Liu" loading="eager" fetchpriority="high" decoding="async" />
        </figure>

        <div class="ai-home-particle-card" aria-hidden="true">
          <canvas id="ai-research-canvas"></canvas>
          <span class="ai-orbit-label ai-orbit-label--one">Dynamics</span>
          <span class="ai-orbit-label ai-orbit-label--two">Information</span>
          <span class="ai-orbit-label ai-orbit-label--three">Fluctuations</span>
        </div>
      </div>
    </section>
  </div>

  <section class="ai-section">
    <div class="ai-container">
      <div class="ai-section__head ai-reveal">
        <div>
          <p class="ai-section__kicker">Research landscape</p>
          <h2 class="ai-section__title">One language across different physical systems.</h2>
        </div>
        <p class="ai-section__summary">
          My work connects stochastic dynamics, quantum information, gravitation, and learning
          through response bounds, fluctuations, transport, and instability.
        </p>
      </div>

      <div class="ai-research-grid">
        <a class="ai-research-card ai-reveal" href="{{ '/research/' | relative_url }}">
          <span class="ai-card__index">01 / NONEQUILIBRIUM</span>
          <span class="ai-card__title">Statistical physics and machine learning</span>
          <span class="ai-card__text">Kinetic uncertainty relations, stochastic response, and the dynamics of finite-learning-rate SGD.</span>
          <span class="ai-card__arrow" aria-hidden="true">→</span>
        </a>

        <a class="ai-research-card ai-reveal" href="{{ '/research/' | relative_url }}">
          <span class="ai-card__index">02 / QUANTUM</span>
          <span class="ai-card__title">Quantum information and thermodynamics</span>
          <span class="ai-card__text">Quantum response bounds, information engines, random access codes, and Maxwell's demon.</span>
          <span class="ai-card__arrow" aria-hidden="true">→</span>
        </a>

        <a class="ai-research-card ai-reveal" href="{{ '/research/' | relative_url }}">
          <span class="ai-card__index">03 / GRAVITATION</span>
          <span class="ai-card__title">Black-hole dynamics and chaos</span>
          <span class="ai-card__text">Lyapunov-exponent bounds and spinning-particle dynamics in Kerr–Newman spacetimes.</span>
          <span class="ai-card__arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>

  <section class="ai-section">
    <div class="ai-container">
      <div class="ai-section__head ai-reveal">
        <div>
          <p class="ai-section__kicker">Recent work</p>
          <h2 class="ai-section__title">Current research, directly accessible.</h2>
        </div>
        <p class="ai-section__summary">
          Selected recent results. The complete record, journal links, preprints, PDFs, and
          supplements are available on the publications page.
        </p>
      </div>

      <div class="ai-work-grid">
        <a class="ai-work-card ai-reveal" href="https://arxiv.org/abs/2607.15617" target="_blank" rel="noopener">
          <span class="ai-card__index">2026 · QUANTUM INFORMATION</span>
          <span class="ai-card__title">Classical codes violate the conjectured square-root bound for quantum random access codes</span>
          <span class="ai-card__arrow" aria-hidden="true">↗</span>
        </a>

        <a class="ai-work-card ai-reveal" href="https://doi.org/10.1140/epjc/s10052-026-15894-8" target="_blank" rel="noopener">
          <span class="ai-card__index">2026 · GRAVITATION</span>
          <span class="ai-card__title">Bound on Lyapunov exponents with spinning particles in Kerr–Newman spacetimes</span>
          <span class="ai-card__arrow" aria-hidden="true">↗</span>
        </a>

        <a class="ai-work-card ai-reveal" href="https://journals.aps.org/pra/abstract/10.1103/ps1b-8l1x" target="_blank" rel="noopener">
          <span class="ai-card__index">2026 · OPEN QUANTUM SYSTEMS</span>
          <span class="ai-card__title">Response kinetic uncertainty relation for Markovian open quantum systems</span>
          <span class="ai-card__arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </section>

  <section class="ai-section ai-projects-section">
    <div class="ai-container">
      <div class="ai-section__head ai-reveal">
        <div>
          <p class="ai-section__kicker">Open projects</p>
          <h2 class="ai-section__title">Tools built around rigorous scientific work.</h2>
        </div>
        <p class="ai-section__summary">
          Open-source tools and research-derived systems for reusable scientific workflows.
        </p>
      </div>

      <article class="ai-project-feature ai-reveal">
        <span class="ai-card__index">OPEN SOURCE · RESEARCH TOOLING</span>
        <h3>Scientific Manuscript Audit</h3>
        <p>
          An author-side manuscript audit skill for Codex and Claude Code, linking central claims to
          inspected evidence for pre-submission and revision quality control.
        </p>

        <div class="project-card__workflow ai-project-feature__workflow" aria-label="Review architecture">
          <span>Review architecture</span>
          <code>claim → burden of proof → inspected evidence → decision-relevant gap → bounded resolution → recommendation impact</code>
        </div>

        <div class="ai-project-feature__actions">
          <a class="ai-button ai-button--primary" href="{{ '/projects/' | relative_url }}">Explore projects</a>
          <a class="ai-button" href="https://github.com/KangqiaoLiu/scientific-manuscript-audit" target="_blank" rel="noopener">View on GitHub ↗</a>
        </div>
      </article>
    </div>
  </section>

  <section class="ai-section">
    <div class="ai-container">
      <div class="ai-contact-panel ai-reveal">
        <div>
          <p class="ai-section__kicker">Affiliation</p>
          <h2 class="ai-section__title">Xihua University</h2>
          <p><a href="http://english.xhu.edu.cn/_s69/58/7e/c3521a88190/page.psp">School of Science</a></p>
          <p><a href="http://english.xhu.edu.cn/_s69/58/b5/c3522a88245/page.psp">Key Laboratory of High Performance Scientific Computation</a></p>
          <p>物理学讲师 · 西华大学理学院</p>
        </div>
        <div>
          <p class="ai-section__kicker">Contact</p>
          <p><strong>Email</strong><br />kqliu-AT-xhu.edu.cn <small>(replace -AT- by @)</small></p>
          <p><strong>Office</strong><br />6D416</p>
          <p><strong>Address</strong><br />Chengdu, Sichuan, China 610039</p>
        </div>
      </div>
    </div>
  </section>
</div>
