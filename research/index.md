---
layout: default
title: Research
---

<div class="research-intro">
  <p>My research focuses on three interconnected areas. Below are my <a href="https://scholar.google.com/citations?user=nFQJEskAAAAJ&hl=en&oi=ao" target="_blank">publications</a> organised by these research themes, with each paper listed in its primary category despite potential overlap.</p>
</div>

## Open-Source LLMs and Responsible AI

<div class="research-section-intro">
  <p>I focus on developing open-source LLMs that are transparent and compliant with current legal frameworks. This work provides a foundation for society to build trustworthy AI products and services while enabling researchers to better understand the benefits and risks of LLM-based systems. Key technical challenges include quantifying the impact of training data governance decisions, understanding memorization risks in large-scale models, and developing infrastructure that democratizes access to language modeling research across different computational scales.</p>
</div>

<div class="paper-list-compact">
  {% assign responsible_ai_papers = "fan2025can,xu2025positional,stanic2023languini" | split: "," %}
  {% for paper_key in responsible_ai_papers %}
    {% assign paper = site.data.publications | where: "key", paper_key | first %}
    {% if paper %}
      <div class="paper-compact">
        <div class="paper-title">{{ paper.title }}</div>
        <div class="paper-meta-compact">
          <span class="authors">{{ paper.authors }}</span> — 
          {% if paper.links.size > 0 %}
            <a href="{{ paper.links[0].url }}" class="venue-link">{{ paper.venue }} {{ paper.year }}</a>
          {% else %}
            <span class="venue">{{ paper.venue }} {{ paper.year }}</span>
          {% endif %}
        </div>
      </div>
    {% endif %}
  {% endfor %}
</div>

## Neural Architecture Research

<div class="research-section-intro">
  <p>I advance neural architecture research through fast weight programmers such as the <a href="https://proceedings.mlr.press/v139/schlag21a" target="_blank">DeltaNet</a>, which contributes to the most significant architectural innovation since the rise of the Transformer. Similar to linear RNNs, like Mamba or RWKV, it offers enhanced efficiency and generality compared to attention-based architectures. This research explores self-referential weight matrices that learn to modify themselves, block-recurrent mechanisms that maintain global context while enabling parallel training, and novel activation functions derived through mathematical integration principles.</p>
</div>

<div class="paper-list-compact">
  {% assign architecture_papers = "hernandez2025towards,huang2024deriving,hutchins2022block,schlag2023fast,schlag2021learning,irie2021going,schlag2021linear,irie2021modern,schlag2019enhancing,schlag2018learning,schlag2017gated" | split: "," %}
  {% for paper_key in architecture_papers %}
    {% assign paper = site.data.publications | where: "key", paper_key | first %}
    {% if paper %}
      <div class="paper-compact">
        <div class="paper-title">{{ paper.title }}</div>
        <div class="paper-meta-compact">
          <span class="authors">{{ paper.authors }}</span> — 
          {% if paper.links.size > 0 %}
            <a href="{{ paper.links[0].url }}" class="venue-link">{{ paper.venue }} {{ paper.year }}</a>
          {% else %}
            <span class="venue">{{ paper.venue }} {{ paper.year }}</span>
          {% endif %}
        </div>
      </div>
    {% endif %}
  {% endfor %}
</div>

## LLM Scaling and Generalization

<div class="research-section-intro">
  <p>I investigate fundamental questions around LLM scaling and generalisation. In particular, how to train these systems more efficiently and enable them to generalise beyond their current limitations. This includes exploring self-modifying neural networks as a pathway toward more general AI systems. Technical focus areas include developing compute-optimal training strategies through adaptive scaling laws, investigating the role of tokenization and language imbalance in cross-lingual transfer, and creating hybrid neuro-symbolic approaches that augment classical algorithms with neural components for robust generalization.</p>
</div>

<div class="paper-list-compact">
  {% assign scaling_papers = "schafer2024effect,anagnostidis2024navigating,schafer2024role,schlag2023large,zhuge2023mindstorms,lewkowycz2022solving,schlag2021augmenting,irie2021improving" | split: "," %}
  {% for paper_key in scaling_papers %}
    {% assign paper = site.data.publications | where: "key", paper_key | first %}
    {% if paper %}
      <div class="paper-compact">
        <div class="paper-title">{{ paper.title }}</div>
        <div class="paper-meta-compact">
          <span class="authors">{{ paper.authors }}</span> — 
          {% if paper.links.size > 0 %}
            <a href="{{ paper.links[0].url }}" class="venue-link">{{ paper.venue }} {{ paper.year }}</a>
          {% else %}
            <span class="venue">{{ paper.venue }} {{ paper.year }}</span>
          {% endif %}
        </div>
      </div>
    {% endif %}
  {% endfor %}
</div>

