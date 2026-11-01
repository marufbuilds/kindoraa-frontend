import Link from "next/link";

const columns = [
  {
    heading: "Explore",
    links: [
      { label: "Discover events", href: "/events" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Community causes", href: "/causes" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { label: "Volunteer", href: "/events" },
      { label: "Host an event", href: "/events" },
      { label: "Our impact", href: "/about" },
    ],
  },
  {
    heading: "Kindora",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Sign in", href: "/sign-in" },
    ],
  },
];

type FooterProps = {
  className?: string;
};

/**
 * Site footer — rendered once in the root layout so it appears on every page.
 * Self-contained dark-green surface, so it looks identical in light/dark themes.
 * `mt-auto` in the layout pins it to the bottom of short pages.
 */
export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer
      className={`border-t border-white/10 bg-[#1a4d2e] ${className}`}
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="text-[26px] font-extrabold leading-none tracking-tight text-white">
              kindora<span className="text-[#e8930c]">.</span>
            </p>
            <p className="mt-2 text-[13px] font-medium text-[#a8c4ae]">
              Together We Grow
            </p>
            <p className="mt-5 text-[13px] leading-relaxed text-[#8fae96]">
              Connecting people with local causes, meaningful events, and
              opportunities to make a difference.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-[15px] font-bold text-white">
                {column.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[#8fae96] transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/10 pt-7">
          <div className="flex flex-col gap-2 text-[12px] text-[#8fae96] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Kindora. Made for communities that care.</p>
            <p>Small actions. Bigger change.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
