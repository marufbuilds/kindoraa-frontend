 
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Users, ArrowUpRight } from "lucide-react";
import type { Event } from "@/app/types/events";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [year, month, day] = event.date.split("-");

  const formattedDate = `${day} ${new Date(
    2000,
    Number(month) - 1
  ).toLocaleString("en-US", { month: "short" })}, ${year}`;

  return (
    <Link
      href={`/events/${event._id}`}
      className="block"
    >
      <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-[#18251C]">
        {/* Event Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#166534] shadow-sm">
            {event.category}
          </span>
        </div>

        {/* Event Information */}
        <div className="p-5">
          <h2 className="line-clamp-1 text-xl font-bold text-gray-900 dark:text-white">
            {event.title}
          </h2>

          <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-gray-600 dark:text-gray-400">
            {event.description}
          </p>

          <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <CalendarDays size={17} className="text-[#166534]" />
              <span>
                {formattedDate} · {event.startTime}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={17} className="text-[#166534]" />
              <span className="line-clamp-1">{event.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users size={17} className="text-[#166534]" />
              <span>{event.volunteerSpots} volunteer spots</span>
            </div>
          </div>

          {/* View Details */}
          <div className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#166534] px-4 py-3 text-sm font-semibold text-white transition group-hover:bg-[#174B2B]">
            View Details
            <ArrowUpRight size={17} />
          </div>
        </div>
      </article>
    </Link>
  );
}
