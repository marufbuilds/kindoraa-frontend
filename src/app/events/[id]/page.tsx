
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Mail,
} from "lucide-react";
import type { Event } from "@/app/types/events";

interface EventDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const instant = false;

async function getEvent(id: string): Promise<Event | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }

    return await response.json();
  } catch (error) {
    console.error("Event details error:", error);
    return null;
  }
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const formattedDate = new Date(
    `${event.date}T00:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#F8F7F2] py-12 dark:bg-[#101B14]">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">

        <Link
          href="/events"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#166534] transition hover:text-[#174B2B] dark:text-green-400"
        >
          <ArrowLeft size={18} />
          Back to events
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">

          {/* Main Event Content */}
          <div>
            <div className="relative h-[280px] overflow-hidden rounded-2xl sm:h-[420px]">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <div className="mt-8">
              <span className="inline-flex rounded-full bg-[#E8F2E5] px-4 py-2 text-sm font-semibold text-[#166534] dark:bg-[#24382A] dark:text-green-300">
                {event.category}
              </span>

              <h1 className="mt-5 text-3xl font-bold text-[#174B2B] sm:text-4xl dark:text-white">
                {event.title}
              </h1>

              <p className="mt-6 leading-8 text-gray-600 dark:text-gray-300">
                {event.description}
              </p>

              <div className="mt-10">
                <h2 className="text-xl font-bold text-[#174B2B] dark:text-white">
                  About this event
                </h2>

                <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">
                  Join us for this community event and become part of
                  something meaningful. Your time, effort, and support
                  can help create a positive impact.
                </p>
              </div>
            </div>
          </div>

          {/* Event Information Sidebar */}
          <aside>
            <div className="rounded-2xl border border-[#E3E8E0] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#18251C]">

              <h2 className="text-xl font-bold text-[#174B2B] dark:text-white">
                Event information
              </h2>

              <div className="mt-7 space-y-6">

                <div className="flex gap-4">
                  <CalendarDays className="mt-1 h-5 w-5 shrink-0 text-[#166534]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Date
                    </p>
                    <p className="mt-1 font-semibold text-gray-800 dark:text-white">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-[#166534]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Start time
                    </p>
                    <p className="mt-1 font-semibold text-gray-800 dark:text-white">
                      {event.startTime}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#166534]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Location
                    </p>
                    <p className="mt-1 font-semibold text-gray-800 dark:text-white">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Users className="mt-1 h-5 w-5 shrink-0 text-[#166534]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Volunteer spots
                    </p>
                    <p className="mt-1 font-semibold text-gray-800 dark:text-white">
                      {event.volunteerSpots} spots available
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-[#166534]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Organizer email
                    </p>
                    <a
                      href={`mailto:${event.organizerEmail}`}
                      className="mt-1 block break-all font-semibold text-[#166534] hover:underline dark:text-green-400"
                    >
                      {event.organizerEmail}
                    </a>
                  </div>
                </div>

              </div>

              <a
                href={`mailto:${event.organizerEmail}?subject=${encodeURIComponent(
                  `Volunteer registration: ${event.title}`
                )}`}
                className="mt-8 flex w-full items-center justify-center rounded-xl bg-[#166534] px-6 py-4 font-semibold text-white transition hover:bg-[#174B2B]"
              >
                Join This Event
              </a>

              <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                Contact the organizer to register.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
