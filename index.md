---
layout: default
title: Home
---

<style>
  .hero {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    padding: 6rem 1rem;
    flex-wrap: wrap; /* keeps it responsive */
  }

  .hero-text {
    max-width: 600px;
    text-align: left;
  }

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
    font-size: 1.5rem;
    line-height: 1.6;
    color: #555;
  }

  .hero-image {
    flex-shrink: 0;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
  }

  .hero-image:hover {
    transform: scale(1.05);
  }
</style>

<section class="hero">
  <div class="hero-text">
    <h1 class="hello" aria-label="Hello.">
      <span class="h">H</span><span class="e">e</span><span class="l1">l</span><span class="l2">l</span><span class="o">o</span><span class="period">.</span>
    </h1>
    <p class="description">
      I’m a software developer with a strong background in <strong>C++</strong> and
      <strong>ADAS systems</strong>, focused on building reliable and performance-critical applications.<br />
      I’m deeply passionate about <strong>artificial intelligence</strong>,
      <strong>machine learning</strong>, and <strong>embedded systems</strong> — always exploring how these technologies can work together to solve real-world problems.
    </p>
  </div>

  <img src="/assets/images/me.jpg" alt="Your photo" class="hero-image" />
</section>
