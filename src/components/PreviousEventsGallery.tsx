 
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";

const previousEvents = [
  {
    id: "1",
    title: "Community Tree Plantation",
    category: "Environment",
    date: "September 15, 2026",
    location: "Rajshahi, Bangladesh",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
  },
  {
    id: "2",
    title: "Community Food Distribution",
    category: "Community Service",
    date: "September 20, 2026",
    location: "Dhaka, Bangladesh",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433",
  },
  {
    id: "3",
    title: "Neighborhood Clean-up Drive",
    category: "Cleanliness",
    date: "October 5, 2026",
    location: "Rajshahi, Bangladesh",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
  },
  {
    id: "4",
    title: "Helping Children Learn",
    category: "Education",
    date: "October 12, 2026",
    location: "Chittagong, Bangladesh",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  },
];

export default function PreviousEventsGallery() {
  return (
    <section className="bg-[#F8F7F2] px-4 py-16 dark:bg-[#101B14] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#166534] dark:text-green-400">
            Our Memories
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Previous Events
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-500 dark:text-gray-400">
            Celebrating the moments when our community came together to
            make a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {previousEvents.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-[#18251C]"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-3 top-3 rounded-full bg-[#174B2B] px-3 py-1 text-xs font-semibold text-white">
                  {event.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {event.title}
                </h3>

                <div className="mt-4 space-y-3 text-sm text-gray-500 dark:text-gray-400">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-[#166534]" />
                    {event.date}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#166534]" />
                    {event.location}
                  </p>
                </div>

                <Link
                  href="/events"
                  className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm font-semibold text-[#174B2B] transition hover:text-green-600 dark:border-gray-700 dark:text-green-400"
                >
                  Explore Events
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
