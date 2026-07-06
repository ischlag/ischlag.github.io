---
layout: default
title: Thesis Proposals
noindex: true
---

<p class="page-description">Open thesis proposals. These pages are not linked from the main site; share the URLs directly with interested students.</p>

<ul class="thesis-list">
  {% for thesis in site.theses %}
  <li>
    <a href="{{ thesis.url | relative_url }}">{{ thesis.title }}</a>
    <span class="thesis-meta">
      {% if thesis.level %}<span class="level">{{ thesis.level }}</span>{% endif %}
      {% if thesis.status %}<span class="status status-{{ thesis.status | downcase }}">{{ thesis.status }}</span>{% endif %}
    </span>
  </li>
  {% endfor %}
</ul>
