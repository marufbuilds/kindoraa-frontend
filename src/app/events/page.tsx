 
import EventList from "@/app/components/events/EventList";

export const instant = false;

export default function HomePage() {
  return (
    <main>
      <section className="bg-[#F8F7F2] py-16 dark:bg-[#101B14]">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#166534]">
              Make Your Time Matter
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#174B2B] dark:text-white sm:text-4xl">
              Upcoming Community Events
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Discover opportunities to make a difference in your community.
            </p>
          </div>

          <EventList   />
        </div>
      </section>
    </main>
  );
}
