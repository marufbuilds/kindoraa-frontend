import Link from "next/link";

/**
 * CTA banner — full-width forest-green band with headline and pill button.
 *
 * Content sits in the standard Kindora container so it aligns with the other
 * homepage sections. Works in both themes (self-contained dark surface).
 */
export default function CtaBanner() {
  return (
    <section className="border-y border-[#2f7a4a]/50 bg-[#166534]">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between md:py-14 lg:px-10">
        <div>
          <h2 className="text-[28px] font-extrabold leading-tight tracking-tight text-white sm:text-[32px]">
            Your community is waiting for you.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#d3e5d5]">
            Find an event, bring a friend, and turn good intentions into action.
          </p>
        </div>

        <Link
          href="/events"
          className="shrink-0 rounded-full bg-[#e8930c] px-7 py-3.5 text-sm font-bold text-[#14261b] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f0a020] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#166534]"
        >
          Explore opportunities
        </Link>
      </div>
    </section>
  );
}
