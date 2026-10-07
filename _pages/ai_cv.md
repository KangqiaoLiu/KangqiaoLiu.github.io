---
layout: archive
title: "AI RESEARCH CV"
permalink: /ai-cv/
author_profile: true
---

{% include base_path %}

**Kangqiao Liu**  
*Machine Learning Researcher & Theoretical Physicist*

[kqliu@xhu.edu.cn](mailto:kqliu@xhu.edu.cn) · [GitHub](https://github.com/KangqiaoLiu) · [Google Scholar](https://scholar.google.com/citations?user=utIJkHcAAAAJ&hl=en) · [Full academic CV]({{ '/cv/' | relative_url }})

## Research profile

I study stochastic learning dynamics and theoretical models of complex systems. My earlier machine-learning work developed finite-learning-rate theories of SGD noise, minibatch fluctuations, and escape dynamics; my recent work has focused on nonequilibrium response, quantum information, and mathematically controlled dynamical problems. I am now bringing these lines back together around reasoning dynamics, scientific AI, and verifiable autonomous discovery.

## Research focus

- **Stochastic optimization and training dynamics:** finite-learning-rate SGD, minibatch noise, escape and rare-event dynamics.
- **Reasoning and scientific AI:** dynamics of search and reasoning, verifiable scientific agents, research-grade evaluation environments.
- **Theoretical modeling:** stochastic processes, nonequilibrium response, information-theoretic bounds, quantum and complex dynamics.

## Selected machine learning research

**Noise and Fluctuation of Finite Learning Rate Stochastic Gradient Descent** — **ICML 2021**  
**Kangqiao Liu**\*, Liu Ziyin\*, and Masahito Ueda (\*equal contribution)  
Developed a discrete-time theory of SGD at finite learning rate, deriving analytical noise and parameter-fluctuation formulas and stability boundaries beyond continuous-time Langevin approximations.  
[[paper]](http://proceedings.mlr.press/v139/liu21ad.html) [[arXiv]](https://arxiv.org/abs/2012.03636)

**Strength of Minibatch Noise in SGD** — **ICLR 2022 Spotlight**  
Liu Ziyin\*, **Kangqiao Liu**\*, Takashi Mori, and Masahito Ueda (\*equal contribution)  
Analyzed minibatch noise in discrete-time SGD and derived how noise strength and model fluctuations depend on learning rate, batch size, width, and regularization.  
[[paper]](https://openreview.net/forum?id=uorVGbWV5sw) [[arXiv]](https://arxiv.org/abs/2102.05375)

**Power-law Escape Rate of SGD** — **ICML 2022 Spotlight**  
Takashi Mori, Liu Ziyin, **Kangqiao Liu**, and Masahito Ueda  
Derived the stationary distribution around local minima and identified power-law escape dynamics for minibatch SGD, linking optimization escape to the loss-dependent structure of stochastic noise.  
[[paper]](https://proceedings.mlr.press/v162/mori22a.html) [[arXiv]](https://arxiv.org/abs/2105.09557)

## Selected independent research

**Dynamical activity universally bounds precision of response in Markovian nonequilibrium systems** — **Communications Physics (2025)**  
**Kangqiao Liu** and Jie Gu  
Established a universal kinetic bound connecting static response precision to dynamical activity in nonequilibrium Markov processes.  
[[journal]](https://www.nature.com/articles/s42005-025-01982-w) [[arXiv]](https://arxiv.org/abs/2410.20800)

**Classical codes violate the conjectured square-root bound for quantum random access codes** — **2026 preprint**  
**Kangqiao Liu** (sole author)  
Constructed a family of counterexamples and characterized the asymptotic region between the conjectured square-root curve and Nayak's entropy bound.  
[[arXiv]](https://arxiv.org/abs/2607.15617)

**Maximal-velocity deficit under a finite-support constraint in a hard-wall half-line continuous-time quantum walk** — **Physical Review A (2026)**  
**Kangqiao Liu** and Deyou Chen  
Reduced an optimal transport problem to a principal-eigenvalue problem and derived the exact asymptotic velocity deficit under finite-support preparation.  
[[journal]](https://journals.aps.org/pra/abstract/10.1103/dyyr-z1k8) [[arXiv]](https://arxiv.org/abs/2609.01970)

## Current direction and research tooling

- Developing a research program that connects stochastic-process methods with modern reasoning and agent systems: trajectory ensembles, search dynamics, verification, failure recovery, and compute allocation.
- Exploring verifiable scientific-agent environments built from genuine mathematical and physical research tasks, with emphasis on mechanisms and evaluation signals that remain meaningful beyond a single model generation.
- Built **Scientific Manuscript Audit**, an open-source research workflow for Codex and Claude Code with claim-to-evidence tracing, synthetic evaluation cases, automated validation, and reproducible distribution packages. [[GitHub]](https://github.com/KangqiaoLiu/scientific-manuscript-audit)

## Experience

**2023–present — Lecturer of Physics**, School of Science, Xihua University, Chengdu, China  
Independent research in nonequilibrium physics, quantum information, stochastic dynamics, and machine learning.

**2020–2023 — Ph.D. in Physics**, The University of Tokyo, Japan  
Advisor: Prof. Masahito Ueda. Thesis: *Theoretical Study on Information Engines for Quantum Transport*.

**2018–2020 — M.Sc. in Physics**, The University of Tokyo, Japan  
Advisor: Prof. Masahito Ueda. Thesis: *Thermodynamic Uncertainty Relations in Markovian Processes*.

## Selected funding

- **National Natural Science Foundation of China, Young Scientists Fund (Category C)**, Principal Investigator, CNY 300,000, 2027–2029.
- **Xihua University Scientific Research Start-up Foundation**, Principal Investigator, 2024–2026.
- **JSPS DC2 Grant-in-Aid for Research Fellow**, Principal Investigator, 2023.

## Technical and research skills

- **Programming / research computing:** Python, PyTorch, NumPy/SciPy, Jupyter, Git, Linux, reproducible numerical workflows.
- **Research methods:** stochastic-process modeling, optimization theory, analytical derivations, numerical experiments, benchmarking and evaluation design.
- **Scientific communication:** LaTeX, reproducible research packages, technical writing and peer review across machine learning and physics.

## Academic service

Reviewer for **NeurIPS, ICLR, ICML**; **Physical Review Letters, Physical Review Research, Physical Review E, Communications Physics**.
