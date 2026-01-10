---
layout: default
title: Journal
---

<h1 class="page-title">Journal</h1>

<div class="journal-list">
  {% for post in site.posts %}
    <div class="journal-item">
      <h2 class="journal-title">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h2>
      <p class="journal-meta">{{ post.date | date: "%B %d, %Y" }}</p>
      <p class="journal-excerpt">{{ post.excerpt | strip_html | truncate: 200 }}</p>
    </div>
  {% endfor %}
</div>
