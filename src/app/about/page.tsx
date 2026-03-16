export default function About() {
  return (
    <section className="py-12 md:py-24 max-w-3xl mx-auto space-y-8 font-light">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-mono lowercase">
        <span className="text-red-500">/</span> hi there <span className="text-2xl">👋</span>
      </h1>

      <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
        <p>
          <span className="text-red-500 font-mono">/</span> i&apos;m a software developer passionate about building meaningful tools and solving complex problems.
          at work, i focus on developing and maintaining software products while exploring ways to make workflows smoother and more efficient.
          i enjoy bridging technical skills with creativity, whether it&apos;s coding, designing dashboards, or automating repetitive tasks.
        </p>

        <p>
          <span className="text-red-500 font-mono">/</span> outside of work, i&apos;m equally curious and love exploring many areas of life. i&apos;m into finance, stocks, economics, and politics — always trying to understand how the world works.
          i also enjoy video games 🎮, going out with friends, and just having fun when i&apos;m not experimenting with side projects.
        </p>

        <p>
          <span className="text-red-500 font-mono">/</span> this site is my little corner on the internet — a place to share projects, ideas, and maybe a bit of personality too.
        </p>
      </div>

      <div className="pt-8">
        <h2 className="text-3xl font-semibold mb-6 font-mono lowercase"><span className="text-red-500">/</span> skills & tech</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">⚡</span> c++, python, rust</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">🧠</span> ai, llms, rag</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">⚛️</span> react, next.js</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">🐳</span> docker, kubernetes, aws</li>
        </ul>
      </div>

      <div className="pt-8">
        <h2 className="text-3xl font-semibold mb-6 font-mono lowercase"><span className="text-red-500">/</span> things i enjoy</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">💻</span> building useful tools</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">📈</span> visualizing data in creative ways</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">🤖</span> playing with AI & automation</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">🎮</span> gaming & unwinding with friends</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">💹</span> exploring finance, stocks & economics</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">🗳️</span> following politics & global events</li>
          <li className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg"><span className="text-2xl">🌍</span> learning constantly</li>
        </ul>
      </div>
    </section>
  );
}
