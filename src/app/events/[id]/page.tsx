 
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
  ArrowRight,
} from "lucide-react";
import type { Event } from "@/app/types/events";

interface EventDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const instant = false;

async function getEvent(id: string): Promise<Event | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is missing");
  }

  const requestURL = `${API_URL.replace(/\/$/, "")}/events/${id}`;

  try {
    console.log("========== EVENT API DEBUG ==========");
    console.log("Event ID:", id);
    console.log("Request URL:", requestURL);

    const response = await fetch(requestURL, {
      cache: "no-store",
    });

    const responseText = await response.text();

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }

    console.log("Response status:", response.status);
    console.log("Response data:", data);
    console.log("=====================================");

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(
        typeof data === "object" && data?.message
          ? data.message
          : `API request failed with status ${response.status}`
      );
    }

    return data as Event;
  } catch (error) {
    console.error("Event details error:", error);
    throw error;
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

  const joinedCount = event.joinedCount ?? 0;

  const remainingSpots =
    event.remainingSpots ??
    Math.max(0, event.volunteerSpots - joinedCount);

  const volunteers = event.volunteers ?? [];

  return (
    <main className="min-h-screen bg-[#F8F7F2] py-12 dark:bg-[#101B14]">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
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
            {/* Event Image */}
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

            {/* Event Description */}
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

                {/* Date */}
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

                {/* Start Time */}
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

                {/* Location */}
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

                {/* Volunteer Capacity */}
                <div className="flex gap-4">
                  <Users className="mt-1 h-5 w-5 shrink-0 text-[#166534]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Volunteer capacity
                    </p>

                    <p className="mt-1 font-semibold text-gray-800 dark:text-white">
                      {joinedCount} / {event.volunteerSpots} joined
                    </p>

                    <p className="mt-1 text-sm text-[#166534] dark:text-green-400">
                      {remainingSpots} spots remaining
                    </p>
                  </div>
                </div>

                {/* Organizer Email */}
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

              {/* Join Event Button */}
              {remainingSpots > 0 ? (
                <Link
                  href={`/events/join?eventId=${event._id}`}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#166534] px-6 py-4 font-semibold text-white transition hover:bg-[#174B2B]"
                >
                  Join This Event
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <div className="mt-8 rounded-xl bg-gray-200 px-6 py-4 text-center font-semibold text-gray-600 dark:bg-white/10 dark:text-gray-300">
                  Event is Full
                </div>
              )}

              <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                Become a volunteer and make a difference in your community.
              </p>
            </div>

            {/* Volunteers Information Card */}
            <div className="mt-6 rounded-2xl border border-[#E3E8E0] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#18251C]">

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#174B2B] dark:text-white">
                  Our Volunteers
                </h2>

                <span className="rounded-full bg-[#E8F2E5] px-3 py-1 text-sm font-semibold text-[#166534] dark:bg-[#24382A] dark:text-green-300">
                  {joinedCount} joined
                </span>
              </div>

              {volunteers.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {volunteers.map((volunteer) => (
                    <div
                      key={volunteer._id}
                      className="flex items-center gap-3"
                    >
                      {volunteer.image ? (
                        <Image
                          src={volunteer.image}
                          alt={volunteer.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F2E5] text-lg font-bold text-[#166534] dark:bg-[#24382A] dark:text-green-300">
                          {volunteer.name?.charAt(0).toUpperCase() || "V"}
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {volunteer.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Volunteer
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Users
                    size={30}
                    className="mx-auto text-[#166534] dark:text-green-400"
                  />
                  <p className="mt-3 font-semibold text-gray-700 dark:text-white">
                    No volunteers yet
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Be the first to join this event!
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
