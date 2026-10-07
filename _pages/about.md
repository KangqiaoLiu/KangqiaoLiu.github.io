---
layout: default
permalink: /
title: "Kangqiao LIU 刘康桥"
excerpt: "Machine learning, stochastic dynamics, and theoretical physics"
author_profile: false
redirect_from: 
  - /about/
  - /about.html
---

<div class="ai-home">
  <div class="ai-container">
    <section class="ai-hero" aria-labelledby="ai-home-title">
      <div class="ai-hero__copy ai-reveal">
        <p class="ai-eyebrow">Machine Learning · Stochastic Dynamics · Theoretical Physics</p>
        <h1 class="ai-hero__title" id="ai-home-title">
          <span>Kangqiao Liu</span>
          <span class="ai-name-cn">刘康桥</span>
        </h1>
        <p class="ai-hero__lede">
          I study how learning and physical systems move through noisy, high-dimensional landscapes.
          My work spans stochastic optimization, nonequilibrium physics, quantum information, and
          complex dynamics, with current interests in reasoning and AI-assisted scientific discovery.
        </p>

        <div class="ai-hero__actions" aria-label="Primary links">
          <a class="ai-button ai-button--primary" href="{{ '/research/' | relative_url }}">Explore research</a>
          <a class="ai-button" href="{{ '/publications/' | relative_url }}">View publications</a>
          <a class="ai-button" href="{{ '/cv/' | relative_url }}">Curriculum vitae</a>
          <a class="ai-button" href="{{ '/files/Kangqiao_Liu_AI_Research_CV.pdf' | relative_url }}" download>AI Research CV (PDF)</a>
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
          <h2 class="ai-section__title">Dynamics across learning and physical systems.</h2>
        </div>
        <p class="ai-section__summary">
          The subjects have changed over time, but the questions have stayed surprisingly similar:
          what sets fluctuations, response, escape, transport, and instability?
        </p>
      </div>

      <div class="ai-research-grid">
        <a class="ai-research-card ai-reveal" href="{{ '/research/' | relative_url }}">
          <span class="ai-card__index">01 / LEARNING</span>
          <span class="ai-card__title">Stochastic learning and optimization</span>
          <span class="ai-card__text">Finite-learning-rate SGD, minibatch noise, escape dynamics, and the stochastic structure of learning.</span>
          <span class="ai-card__arrow" aria-hidden="true">→</span>
        </a>

        <a class="ai-research-card ai-reveal" href="{{ '/research/' | relative_url }}">
          <span class="ai-card__index">02 / NONEQUILIBRIUM &amp; QUANTUM</span>
          <span class="ai-card__title">Information, response, and transport</span>
          <span class="ai-card__text">Kinetic uncertainty relations, quantum response bounds, information engines, random access codes, and constrained transport.</span>
          <span class="ai-card__arrow" aria-hidden="true">→</span>
        </a>

        <a class="ai-research-card ai-reveal" href="{{ '/research/' | relative_url }}">
          <span class="ai-card__index">03 / COMPLEX DYNAMICS</span>
          <span class="ai-card__title">Instability and chaos</span>
          <span class="ai-card__text">Lyapunov bounds, competing dynamical scales, and instability in gravitating systems.</span>
          <span class="ai-card__arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>

  <section class="ai-section">
    <div class="ai-container">
      <div class="ai-section__head ai-reveal">
        <div>
          <p class="ai-section__kicker">Selected work</p>
          <h2 class="ai-section__title">A few points along the research trajectory.</h2>
        </div>
        <p class="ai-section__summary">
          These papers show the thread from learning dynamics to nonequilibrium response and
          quantum transport. The publications page contains the complete record.
        </p>
      </div>

      <div class="ai-work-grid">
        <a class="ai-work-card ai-reveal" href="http://proceedings.mlr.press/v139/liu21ad.html" target="_blank" rel="noopener">
          <span class="ai-card__index">2021 · MACHINE LEARNING</span>
          <span class="ai-card__title">Noise and Fluctuation of Finite Learning Rate Stochastic Gradient Descent</span>
          <span class="ai-card__arrow" aria-hidden="true">↗</span>
        </a>

        <a class="ai-work-card ai-reveal" href="https://www.nature.com/articles/s42005-025-01982-w" target="_blank" rel="noopener">
          <span class="ai-card__index">2025 · NONEQUILIBRIUM DYNAMICS</span>
          <span class="ai-card__title">Dynamical activity universally bounds precision of response in Markovian nonequilibrium systems</span>
          <span class="ai-card__arrow" aria-hidden="true">↗</span>
        </a>

        <a class="ai-work-card ai-reveal" href="https://journals.aps.org/pra/abstract/10.1103/dyyr-z1k8" target="_blank" rel="noopener">
          <span class="ai-card__index">2026 · QUANTUM DYNAMICS</span>
          <span class="ai-card__title">Maximal-velocity deficit under a finite-support constraint in a hard-wall half-line continuous-time quantum walk</span>
          <span class="ai-card__arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </section>

  <section class="ai-section ai-projects-section">
    <div class="ai-container">
      <div class="ai-section__head ai-reveal">
        <div>
          <p class="ai-section__kicker">Research tooling</p>
          <h2 class="ai-section__title">Tools that grew out of actual research work.</h2>
        </div>
        <p class="ai-section__summary">
          I keep a small number of tools public when they become useful beyond a single project.
        </p>
      </div>

      <article class="ai-project-feature ai-reveal">
        <span class="ai-card__index">OPEN SOURCE · RESEARCH TOOLING</span>
        <h3>Scientific Manuscript Audit</h3>
        <p>
          A structured manuscript-audit workflow for Codex and Claude Code, built to trace claims
          back to evidence before submission or revision.
        </p>

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
