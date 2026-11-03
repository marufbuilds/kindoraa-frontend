 "use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type Event = {
  _id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
};

export default function JoinEventPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const eventId = searchParams.get("eventId");

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

 const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

  // Get event details
  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId || !API_URL) {
        setLoading(false);
        toast.error("Event information is missing.");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/events/${eventId}`);

        if (!response.ok) {
          throw new Error("Event not found");
        }

        const data = await response.json();
        setEvent(data);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, API_URL]);

  // Join event
  const handleJoinEvent = async () => {
    if (!eventId || !API_URL) {
      toast.error("Event information is missing.");
      return;
    }

    setJoining(true);

    const toastId = toast.loading("Joining event...");

    try {
      const { data: tokenData, error: tokenError } =
        await authClient.token();

      const token = tokenData?.token;

      if (tokenError || !token) {
        throw new Error("Please log in before joining an event.");
      }

      const response = await fetch(
        `${API_URL}/events/${eventId}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to join event");
      }

      toast.success(
        result.message || "You joined the event successfully!",
        { id: toastId }
      );

      router.push(`/events/${eventId}`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong",
        { id: toastId }
      );
    } finally {
      setJoining(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <p className="py-20 text-center text-gray-600">
        Loading event...
      </p>
    );
  }

  // Event not found
  if (!event) {
    return (
      <p className="py-20 text-center text-red-600">
        Event not found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-gray-900">
          Join Event
        </h1>

        <img
          src={event.imageUrl}
          alt={event.title}
          className="mt-5 h-52 w-full rounded-xl object-cover"
        />

        <h2 className="mt-5 text-xl font-semibold text-gray-900">
          {event.title}
        </h2>

        <p className="mt-2 text-gray-600">
          {event.date} · {event.location}
        </p>

        <button
          onClick={handleJoinEvent}
          disabled={joining}
          className="mt-6 w-full rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {joining ? "Joining..." : "Confirm & Join Event"}
        </button>
      </div>
    </div>
  );
}