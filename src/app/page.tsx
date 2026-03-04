import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-center gap-12 py-24 md:py-32">
      <div className="max-w-xl text-left">
        <h1 className="text-6xl md:text-8xl font-black leading-none mb-6 cursor-default">
          <span className="inline-block transition-all duration-300 hover:scale-110 hover:text-red-500">H</span>
          <span className="inline-block transition-all duration-300 hover:scale-110 hover:text-orange-500">e</span>
          <span className="inline-block transition-all duration-300 hover:scale-110 hover:text-green-500">l</span>
          <span className="inline-block transition-all duration-300 hover:scale-110 hover:text-blue-500">l</span>
          <span className="inline-block transition-all duration-300 hover:scale-110 hover:text-purple-500">o</span>
          <span className="text-red-500">.</span>
        </h1>
        <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
          I’m a software developer with a strong background in <strong className="text-foreground">C++</strong> and <strong className="text-foreground">ADAS systems</strong>, focused on building reliable and performance-critical applications.<br className="hidden md:block" />
          I’m deeply passionate about <strong className="text-foreground">artificial intelligence</strong>, <strong className="text-foreground">machine learning</strong>, and <strong className="text-foreground">embedded systems</strong> — always exploring how these technologies can work together to solve real-world problems.
        </p>
      </div>

      <div className="shrink-0 transition-transform duration-300 hover:scale-105">
        <Image
          src="/images/me.jpg"
          alt="My photo"
          width={280}
          height={280}
          className="rounded-full object-cover shadow-xl dark:shadow-none dark:ring-4 dark:ring-border"
          priority
        />
      </div>
    </section>
  );
}
