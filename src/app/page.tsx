import { Terminal } from "@/components/Terminal";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center py-12 md:py-24 animate-in fade-in duration-1000">
      <div className="w-full max-w-3xl">
        <Terminal />
      </div>
    </section>
  );
}
