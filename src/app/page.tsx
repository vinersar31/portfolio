import Image from "next/image";
import Link from "next/link";
import mePhoto from "@/../public/images/me.jpg";
import { projects } from "@/data/projects";
import { INTRO, NOW, SELECTED_WORK, SOCIAL_LINKS } from "@/data/home";
import { TerminalToggle } from "@/components/terminal-toggle";

const SELECTED = SELECTED_WORK.map((item) => {
  const project = projects.find((p) => p.title === item.title);
  return {
    ...item,
    href: project?.siteUrl ?? project?.url ?? "/projects",
    kind: project?.siteUrl ? "live" : project?.category ?? "work",
  };
});

function Slash() {
  return <span className="text-primary font-mono mr-1.5" aria-hidden="true">/</span>;
}

export default function Home() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10 pt-6 animate-fade-in-up">
      <section className="flex flex-col gap-8" aria-labelledby="intro">
        <div className="flex items-center gap-4">
          <Image
            src={mePhoto}
            alt="dan-ioan vinersar"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-background"
            priority
          />
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">
            <span aria-hidden="true">👋 </span>
            {INTRO.greeting}
            <br />
            {INTRO.location}
          </p>
        </div>

        <h1 id="intro" className="text-[clamp(1.75rem,5vw,2.6rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-balance">
          {INTRO.headlineStart}{" "}
          <mark className="bg-transparent bg-[linear-gradient(transparent_62%,hsl(var(--accent))_62%)] text-inherit">
            {INTRO.headlineHighlight}
          </mark>{" "}
          {INTRO.headlineEnd}
        </h1>

        <div className="space-y-3 text-[17px] leading-relaxed text-muted-foreground">
          {INTRO.bio.map((line) => (
            <p key={line}>
              <Slash />
              {line}
            </p>
          ))}
        </div>

        <p className="flex flex-wrap gap-x-2 font-mono text-sm text-muted-foreground">
          {SOCIAL_LINKS.map((link, i) => (
            <span key={link.label}>
              {i > 0 && <span className="mr-2" aria-hidden="true">/</span>}
              {link.href.startsWith("/") ? (
                <Link href={link.href} className="link-underline text-foreground">
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="link-underline text-foreground"
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              )}
            </span>
          ))}
        </p>
      </section>

      <section className="rounded-[var(--radius)] bg-accent px-5 py-4" aria-labelledby="now">
        <h2 id="now" className="font-mono text-xs text-primary">/now</h2>
        <p className="mt-1 text-[15px] text-foreground">{NOW.join(" · ")}</p>
      </section>

      <section aria-labelledby="selected-work" className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 id="selected-work" className="font-mono text-[13px] text-muted-foreground">
            / selected work
          </h2>
          <Link href="/projects" className="font-mono text-[13px] link-underline text-muted-foreground">
            all projects
          </Link>
        </div>
        <ul className="border-t border-border">
          {SELECTED.map((item) => (
            <li key={item.title} className="border-b border-border">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-4"
              >
                <span className="font-medium group-hover:text-primary transition-colors">{item.title}</span>
                <span className="row-span-2 font-mono text-xs text-muted-foreground">
                  {item.kind} <span aria-hidden="true">↗</span>
                </span>
                <span className="text-sm text-muted-foreground min-w-0">{item.summary}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <TerminalToggle />
    </div>
  );
}
