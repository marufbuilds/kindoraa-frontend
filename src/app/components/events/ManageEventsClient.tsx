 
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  Users,
  Plus,
  ArrowUpRight,
  Trash2,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";
import type { Event } from "@/app/types/events";
import { authClient } from "@/lib/auth-client";

interface ManageEventsClientProps {
  initialEvents: Event[];
  errorMessage: string;
}

export default function ManageEventsClient({
  initialEvents,
  errorMessage,
}: ManageEventsClientProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (event: Event) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(event._id);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      // Check current login session
      const session = await authClient.getSession();

      console.log("Current session:", session.data);
      console.log("Session error:", session.error);

      if (!session.data?.session) {
        throw new Error("Your session has expired. Please log in again.");
      }

      // Get JWT token
      const { data, error } = await authClient.token();

      console.log("JWT received:", Boolean(data?.token));
      console.log("JWT error:", error);

      if (error || !data?.token) {
        throw new Error("Could not get authentication token. Please log in again.");
      }

      // Send DELETE request with JWT
      const response = await fetch(`${apiUrl}/events/${event._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const result = await response.json();

      console.log("Delete response status:", response.status);
      console.log("Delete response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete event.");
      }

      // Remove deleted event from the UI
      setEvents((previousEvents) =>
        previousEvents.filter((item) => item._id !== event._id)
      );

      toast.success("Event deleted successfully!", {
        description: `"${event.title}" has been removed.`,
      });
    } catch (error) {
      console.error("Delete event error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F7F2] py-12 dark:bg-[#101B14]">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#166534] dark:text-green-400">
              Event Management
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Manage Your Events
            </h1>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              View and manage the community events you have created.
            </p>
          </div>

          <Link
            href="/events/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#166534] px-5 py-3 font-semibold text-white transition hover:bg-[#174B2B]"
          >
            <Plus size={19} />
            Create Event
          </Link>
        </div>

        {/* Event Count */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-[#18251C]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Events
          </p>

          <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
            {events.length}
          </p>
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {errorMessage}
          </div>
        )}

        {/* Empty State */}
        {!errorMessage && events.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center dark:border-gray-800 dark:bg-[#18251C]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              No events found
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Create your first event to get started.
            </p>

            <Link
              href="/events/create"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#166534] px-5 py-3 font-semibold text-white hover:bg-[#174B2B]"
            >
              <Plus size={18} />
              Create Your First Event
            </Link>
          </div>
        )}

        {/* Events List */}
        {!errorMessage && events.length > 0 && (
          <div className="space-y-5">
            {events.map((event) => (
              <article
                key={event._id}
                className="flex flex-col gap-5 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#18251C] md:flex-row md:items-center"
              >
                {/* Image */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl md:h-32 md:w-44">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 176px"
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-[#166534] dark:bg-green-900/40 dark:text-green-300">
                    {event.category}
                  </span>

                  <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {event.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {event.date} · {event.startTime}
                    </span>

                    <span className="flex items-center gap-2">
                      <MapPin size={16} />
                      {event.location}
                    </span>

                    <span className="flex items-center gap-2">
                      <Users size={16} />
                      {event.volunteerSpots} spots
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-row gap-3 md:flex-col">
                  <Link
                    href={`/events/${event._id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    View
                    <ArrowUpRight size={16} />
                  </Link>

                  <Link
                    href={`/events/edit/${event._id}`}
                    className="flex flex-1 items-center justify-center rounded-lg bg-[#EAF3E9] px-4 py-2.5 text-sm font-semibold text-[#166534] transition hover:bg-[#DCEBDC] dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(event)}
                    disabled={deletingId !== null}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/60"
                  >
                    {deletingId === event._id ? (
                      <>
                        <LoaderCircle
                          size={16}
                          className="animate-spin"
                        />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={16} />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
