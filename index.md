---
layout: default
title: Home
---

<style>
  .hello {
    font-size: 6rem;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .hello span {
    display: inline-block;
    transition: color 0.4s ease, transform 0.3s ease;
    cursor: default;
  }

  .hello span:hover {
    transform: scale(1.15);
  }

  .hello .h:hover { color: #ff4757; }   /* Red */
  .hello .e:hover { color: #ffa502; }   /* Orange */
  .hello .l1:hover { color: #2ed573; }  /* Green */
  .hello .l2:hover { color: #1e90ff; }  /* Blue */
  .hello .o:hover { color: #a55eea; }   /* Purple */
  .hello .period { color: #ff4757; }    /* Static red period */

  .description {
    font-size: 1.75rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    color: #555;
    text-align: center;
  }

  section {
    padding: 6rem 1rem;
    text-align: center;
  }
</style>

<section>
  <h1 class="hello" aria-label="Hello.">
    <span class="h">H</span><span class="e">e</span><span class="l1">l</span><span class="l2">l</span><span class="o">o</span><span class="period">.</span>
  </h1>
  <p class="description">
    I’m a passionate software developer who builds clean, efficient, and
    user-friendly applications.<br />
    Experienced in web technologies and always eager to learn new things.
  </p>
</section>
