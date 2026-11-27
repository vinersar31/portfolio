import { SKILLS, THINGS_I_ENJOY } from "@/data/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "about",
};

function Slash() {
  return <span className="text-primary font-mono mr-1.5" aria-hidden="true">/</span>;
}

function List({ items }: { items: { icon: string; text: string }[] }) {
  return (
    <ul className="grid grid-cols-1 border-t border-border sm:grid-cols-2 sm:gap-x-8">
      {items.map((item) => (
        <li key={item.text} className="flex items-center gap-3 border-b border-border py-3 text-foreground">
          <span className="text-lg" aria-hidden="true">{item.icon}</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

export default function About() {
  return (
    <section className="mx-auto max-w-2xl space-y-12 pt-6 animate-fade-in-up">
      <div className="space-y-6">
        <h1 className="text-[clamp(1.75rem,5vw,2.6rem)] font-semibold tracking-[-0.025em]">
          <span className="text-primary font-mono">/</span> hi there
        </h1>

        <div className="space-y-4 text-[17px] leading-relaxed text-muted-foreground">
          <p>
            <Slash />i&apos;m a software developer passionate about building meaningful tools and solving complex problems.
            at work, i focus on developing and maintaining software products while exploring ways to make workflows smoother and more efficient.
            i enjoy bridging technical skills with creativity, whether it&apos;s coding, designing dashboards, or automating repetitive tasks.
          </p>
          <p>
            <Slash />outside of work, i&apos;m equally curious and love exploring many areas of life. i&apos;m into finance, stocks, economics, and politics, always trying to understand how the world works.
            i also enjoy video games 🎮, going out with friends, and just having fun when i&apos;m not experimenting with side projects.
          </p>
          <p>
            <Slash />this site is my little corner on the internet: a place to share projects, ideas, and maybe a bit of personality too.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">/</span> skills & tech
        </h2>
        <List items={SKILLS} />
      </div>

      <div className="space-y-4">
        <h2 className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">/</span> things i enjoy
        </h2>
        <List items={THINGS_I_ENJOY} />
      </div>
    </section>
  );
}
