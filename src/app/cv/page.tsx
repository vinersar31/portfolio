import { Download } from "lucide-react";

export default function CV() {
  return (
    <section className="py-24 md:py-32 max-w-2xl mx-auto text-center space-y-12">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight font-mono lowercase">
          <span className="text-red-500">/</span> curriculum vitae
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto font-light">
          here you&apos;ll find a snapshot of my professional background in software development.
          download the full CV below for details on my experience, education, and skills.
        </p>
      </div>

      <div className="pt-8">
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-red-500 text-white hover:bg-red-600 text-lg font-semibold px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 font-mono lowercase"
        >
          <Download className="w-6 h-6" /> download cv (pdf)
        </a>
      </div>
    </section>
  );
}
