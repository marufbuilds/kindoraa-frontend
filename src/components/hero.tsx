import Image from "next/image";
import Link from "next/link";
import { Sparkle } from "lucide-react";

/**
 * 
 */
export default function Hero() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Copy */}
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#166534] dark:text-[#6fbf8b]">
              Small actions, bigger change.
            </p>

            <h1 className="mt-5 max-w-[560px] text-[32px] font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[56px]">
              Make a difference, one community at a time.
            </h1>

            <p className="mt-5 max-w-[540px] text-base leading-relaxed text-muted-foreground lg:text-lg">
              Join local initiatives, meet people who care, and turn your time
              into meaningful impact.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/events"
                className="rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#125329] hover:shadow-md dark:hover:bg-[#85cda0]"
              >
                Explore events
              </Link>
              <Link
                href="/events/create"
                className="rounded-lg border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted"
              >
                Create an event
              </Link>
            </div>

            <p className="mt-7 flex items-center gap-2 text-[13px] text-muted-foreground">
              <Sparkle
                aria-hidden="true"
                size={15}
                className="shrink-0 text-[#166534] dark:text-[#6fbf8b]"
              />
              Join{" "}
              <span className="font-bold text-foreground">2,400+</span> people
              creating positive change
            </p>
          </div>

          {/* Photo card */}
          <div className="rounded-3xl border border-[#e3ebe0] bg-[#e9f1e5] p-4 shadow-[0_24px_50px_-30px_rgba(20,38,27,0.25)] dark:border-border dark:bg-card">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image
                src="/hero.png"
                alt="Volunteers planting a tree together"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-[center_58%]"
              />
            </div>

            <p className="mt-3 rounded-xl bg-[#d9e8d1] px-4 py-3 text-center text-[13px] font-bold text-[#1a4d2e] dark:bg-[#1c2c23] dark:text-[#6fbf8b]">
              Good things happen when we show up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
