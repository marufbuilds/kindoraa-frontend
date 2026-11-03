 
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Users,
  ArrowLeft,
  CalendarCheck,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

type Event = {
  _id: string;
  title: string;
  category: string;
  date: string;
  startTime: string;
  location: string;
  volunteerSpots: number;
  imageUrl: string;
  description: string;
  joinedAt?: string;
  joinedCount?: number;
};

export default function JoinedEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch joined events
  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        if (!API_URL) {
          throw new Error("API URL is missing.");
        }

        const { data: tokenData, error: tokenError } =
          await authClient.token();

        const token = tokenData?.token;

        if (tokenError || !token) {
          throw new Error("Please log in to see your joined events.");
        }

        const response = await fetch(`${API_URL}/events/joined`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load joined events."
          );
        }

        setEvents(Array.isArray(result) ? result : result.events || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [API_URL]);

  // Cancel participation
  const handleCancelEvent = async (eventId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your participation in this event?"
    );

    if (!confirmed) return;

    if (!API_URL) {
      toast.error("API URL is missing.");
      return;
    }

    setCancellingId(eventId);

    const toastId = toast.loading("Cancelling participation...");

    try {
      const { data: tokenData, error: tokenError } =
        await authClient.token();

      const token = tokenData?.token;

      if (tokenError || !token) {
        throw new Error("Please log in again.");
      }

      const response = await fetch(
        `${API_URL}/events/${eventId}/leave`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to cancel participation."
        );
      }

      // Remove the cancelled event from the page
      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== eventId)
      );

      toast.success(
        result.message || "Participation cancelled successfully.",
        { id: toastId }
      );
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong.",
        { id: toastId }
      );
    } finally {
      setCancellingId(null);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#f7f9f5] text-gray-600 dark:bg-[#101a13] dark:text-gray-300">
        Loading your joined events...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <p className="text-red-600">{error}</p>

        <Link
          href="/events"
          className="mt-5 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
        >
          Browse Events
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f9f5] px-4 py-16 dark:bg-[#101a13]">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">
          <Link
            href="/events"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-900 dark:text-green-400"
          >
            <ArrowLeft size={17} />
            Back to Events
          </Link>

          <p className="font-semibold text-green-700 dark:text-green-400">
            My Activities
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#174b2b] dark:text-white">
            Joined Events
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Events you have joined and are ready to participate in.
          </p>
        </div>

        {/* Empty State */}
        {events.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-[#18251c]">
            <CalendarCheck
              size={45}
              className="mx-auto text-green-700 dark:text-green-400"
            />

            <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
              No joined events yet
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              You havent joined any community events.
            </p>

            <Link
              href="/events"
              className="mt-6 inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Explore Events
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-5 text-sm font-medium text-gray-600 dark:text-gray-400">
              You have joined {events.length} event(s).
            </p>

            {/* Event Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-[#18251c]"
                >
                  {/* Event Image */}
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.title || "Event image"}
                      className="h-52 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-52 w-full items-center justify-center bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <CalendarDays size={45} />
                    </div>
                  )}

                  <div className="p-5">
                    {/* Category */}
                    {event.category && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        {event.category}
                      </span>
                    )}

                    {/* Title */}
                    <h2 className="mt-4 text-xl font-bold text-[#174b2b] dark:text-white">
                      {event.title || "Untitled Event"}
                    </h2>

                    {/* Event Information */}
                    <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={17}
                          className="shrink-0 text-green-700 dark:text-green-400"
                        />
                        <span>
                          {event.date || "Date not available"}
                          {event.startTime && ` · ${event.startTime}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin
                          size={17}
                          className="shrink-0 text-green-700 dark:text-green-400"
                        />
                        <span>
                          {event.location || "Location not available"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users
                          size={17}
                          className="shrink-0 text-green-700 dark:text-green-400"
                        />
                        <span>
                          {event.joinedCount ?? 0} volunteers joined
                        </span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-3">
                      <Link
                        href={`/events/${event._id}`}
                        className="flex-1 rounded-xl bg-green-700 px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-800"
                      >
                        View Details
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleCancelEvent(event._id)}
                        disabled={cancellingId === event._id}
                        className="flex-1 rounded-xl border border-red-200 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/40 dark:hover:bg-red-950/30"
                      >
                        {cancellingId === event._id
                          ? "Cancelling..."
                          : "Cancel"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
