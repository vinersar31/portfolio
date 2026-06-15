import Image from "next/image";
import { Terminal } from "@/components/Terminal";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-80px)] py-12 md:py-16 pt-24">
      {/* Background ambient glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-float pointer-events-none" />

      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 w-full max-w-5xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="max-w-2xl text-left flex-1 relative z-10">
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-8 cursor-default tracking-tighter">
            <span className="text-primary mr-1">/</span>
            <span className="inline-block transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:text-[#ff5f56]">h</span>
            <span className="inline-block transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:text-[#ffbd2e]">e</span>
            <span className="inline-block transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:text-[#27c93f]">l</span>
            <span className="inline-block transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:text-blue-500">l</span>
            <span className="inline-block transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:text-purple-500">o</span>
          </h1>

          <div className="space-y-6">
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground font-light">
              <span className="text-primary font-mono font-bold mr-2">&gt;</span>
              I&apos;m a software developer with a strong background in <strong className="text-foreground font-mono bg-foreground/5 px-1.5 py-0.5 rounded-md">C++</strong> and <strong className="text-foreground font-mono bg-foreground/5 px-1.5 py-0.5 rounded-md">ADAS systems</strong>, focused on building reliable and performance-critical applications.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground font-light">
              <span className="text-primary font-mono font-bold mr-2">&gt;</span>
              I&apos;m deeply passionate about <strong className="text-foreground font-mono bg-foreground/5 px-1.5 py-0.5 rounded-md">AI</strong>, <strong className="text-foreground font-mono bg-foreground/5 px-1.5 py-0.5 rounded-md">machine learning</strong>, and <strong className="text-foreground font-mono bg-foreground/5 px-1.5 py-0.5 rounded-md">embedded systems</strong> — always exploring how these technologies can work together to solve real-world problems.
            </p>
          </div>
        </div>

        <div className="shrink-0 relative group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {/* Subtle glow behind image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-blue-500/40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative p-1 rounded-full bg-gradient-to-br from-border to-background shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-primary/20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <Image
              src="/images/me.jpg"
              alt="My photo"
              width={260}
              height={260}
              className="rounded-full object-cover relative z-10 border-4 border-background"
              priority
            />
          </div>
        </div>
      </section>

      <section className="w-full max-w-4xl mt-24 md:mt-32 mb-8 animate-fade-in-up relative" style={{ animationDelay: '0.5s' }}>
        {/* Terminal glow effect */}
        <div className="absolute inset-0 bg-primary/5 blur-[80px] -z-10 rounded-full" />
        <Terminal />
      </section>
    </div>
  );
}
