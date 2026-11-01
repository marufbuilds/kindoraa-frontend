 
import { Suspense } from "react";

import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import Causes from "@/components/causes";
import Testimonial from "@/components/testimonial";
import CtaBanner from "@/components/cta-banner";
import Stats from "@/components/stats";
import EventList from "./components/events/EventList";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Stats />

      {/* Upcoming Events Section */}
      <section className="bg-[#F8F7F2] py-16 dark:bg-[#101B14]">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="py-16 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Loading events...
                </p>
              </div>
            }
          >
            <EventList limit={6} />
          </Suspense>
        </div>
      </section>

      <HowItWorks />
      <Causes />
      <Testimonial />
      <CtaBanner />
    </div>
  );
}
