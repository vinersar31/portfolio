export default function About() {
  return (
    <section className="py-12 md:py-24 max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Hi there 👋</h1>

      <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
        <p>
          I&apos;m a software developer passionate about building meaningful tools and solving complex problems.
          At work, I focus on developing and maintaining software products while exploring ways to make workflows smoother and more efficient.
          I enjoy bridging technical skills with creativity, whether it&apos;s coding, designing dashboards, or automating repetitive tasks.
        </p>

        <p>
          Outside of work, I&apos;m equally curious and love exploring many areas of life. I&apos;m into finance, stocks, economics, and politics — always trying to understand how the world works.
          I also enjoy video games 🎮, going out with friends, and just having fun when I&apos;m not experimenting with side projects.
        </p>

        <p>
          This site is my little corner on the internet — a place to share projects, ideas, and maybe a bit of personality too.
        </p>
      </div>

      <div className="pt-8">
        <h2 className="text-3xl font-semibold mb-6">Things I enjoy</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">💻</span> Building useful tools</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">📈</span> Visualizing data in creative ways</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">🤖</span> Playing with AI & automation</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">🎮</span> Gaming & unwinding with friends</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">💹</span> Exploring finance, stocks & economics</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">🗳️</span> Following politics & global events</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">🌍</span> Learning constantly</li>
        </ul>
      </div>
    </section>
  );
}
