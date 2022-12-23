---
layout: archive
title: "PUBLICATIONS"
permalink: /publications/
author_profile: true
---

<!-- {% if author.googlescholar %} -->
  You can also find my articles on my [Google Scholar](https://scholar.google.com/citations?user=utIJkHcAAAAJ&hl=en) profile</a>.</u>
<!-- {% endif %} -->

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
