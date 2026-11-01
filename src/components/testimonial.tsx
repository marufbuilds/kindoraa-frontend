const testimonial = {
  quote:
    "I joined to give a few hours. I stayed because I found people who care about the same things I do.",
  author: "A Kindora volunteer",
  event: "Community clean-up",
};

/**
 * Testimonial section — featured volunteer quote.
 *
 * Left-aligned header (eyebrow + heading) above a sage quote card with an
 * amber accent rule on the right. Server Component — no client JS needed.
 */
export default function Testimonial() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        {/* Section header */}
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#166534] dark:text-[#6fbf8b]">
          Real people. Real impact.
        </p>
        <h2 className="mt-4 text-[26px] font-extrabold leading-tight tracking-tight text-[#174b2b] sm:text-[32px] dark:text-[#ece7d9]">
          Change feels bigger when we do it together.
        </h2>

        {/* Quote card */}
        <figure className="relative mt-8 overflow-hidden rounded-2xl bg-[#e8f2e4] px-7 py-9 shadow-[0_4px_14px_-4px_rgba(20,38,27,0.06)] sm:px-10 lg:px-12 dark:bg-[#16241c]">
          <blockquote className="max-w-3xl text-[17px] font-medium leading-relaxed text-foreground sm:text-[18px]">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          <figcaption className="mt-7 text-[13px] font-bold text-[#166534] dark:text-[#6fbf8b]">
            {testimonial.author}
            <span className="mx-1.5 font-normal text-[#6a9b76] dark:text-[#8fbd9b]">
              ·
            </span>
            <span className="font-bold">{testimonial.event}</span>
          </figcaption>

          {/* Amber accent rule */}
          <span
            aria-hidden="true"
            className="absolute right-[18%] top-1/2 hidden h-24 w-[3px] -translate-y-1/2 rounded-full bg-[#e8930c] sm:block dark:bg-[#f0a93a]"
          />
        </figure>
      </div>
    </section>
  );
}
