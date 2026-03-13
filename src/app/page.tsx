import Image from "next/image";
import { Terminal } from "@/components/Terminal";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-80px)] py-12 md:py-16">
      <section className="flex flex-col-reverse md:flex-row items-center justify-center gap-12 w-full max-w-5xl">
        <div className="max-w-xl text-left">
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-6 cursor-default font-mono">
            <span className="text-red-500">/</span>
            <span className="inline-block transition-all duration-300 hover:scale-110 hover:text-red-500">h</span>
            <span className="inline-block transition-all duration-300 hover:scale-110 hover:text-orange-500">e</span>
            <span className="inline-block transition-all duration-300 hover:scale-110 hover:text-green-500">l</span>
            <span className="inline-block transition-all duration-300 hover:scale-110 hover:text-blue-500">l</span>
            <span className="inline-block transition-all duration-300 hover:scale-110 hover:text-purple-500">o</span>
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground font-light">
            <span className="text-red-500 font-mono">/</span> i&apos;m a software developer with a strong background in <strong className="text-foreground font-mono">C++</strong> and <strong className="text-foreground font-mono">ADAS systems</strong>, focused on building reliable and performance-critical applications.<br className="hidden md:block" />
            <br className="hidden md:block" />
            <span className="text-red-500 font-mono">/</span> i&apos;m deeply passionate about <strong className="text-foreground font-mono">artificial intelligence</strong>, <strong className="text-foreground font-mono">machine learning</strong>, and <strong className="text-foreground font-mono">embedded systems</strong> — always exploring how these technologies can work together to solve real-world problems.
          </p>
        </div>

        <div className="shrink-0 transition-transform duration-300 hover:scale-105">
          <Image
            src="/images/me.jpg"
            alt="My photo"
            width={280}
            height={280}
            className="rounded-full object-cover shadow-xl dark:shadow-none dark:ring-4 dark:ring-border border-4 border-red-500"
            priority
          />
        </div>
      </section>

      <section className="w-full max-w-3xl mt-24 mb-8">
        <Terminal />
      </section>
    </div>
  );
}
