 
"use client";

import { useEffect, useState } from "react";
import ManageEventsClient from "@/app/components/events/ManageEventsClient";
import type { Event } from "@/app/types/events";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    let cancelled = false;

    const getMyEvents = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        // Check login session
        if (!session?.user) {
          throw new Error("Please log in to view your events.");
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("API URL is not configured.");
        }

        // Get JWT token
        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          console.error("JWT token error:", error);
          throw new Error("Unable to get your authentication token.");
        }

        // Fetch user's events
        const response = await fetch(
          `${apiUrl.replace(/\/$/, "")}/events/my-events`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || `Failed to load events (${response.status}).`
          );
        }

        if (!cancelled) {
          setEvents(Array.isArray(result) ? result : []);
        }
      } catch (error) {
        console.error("Error fetching your events:", error);

        const message =
          error instanceof Error
            ? error.message
            : "Unable to load your events.";

        if (!cancelled) {
          setErrorMessage(message);
          toast.error(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    getMyEvents();

    return () => {
      cancelled = true;
    };
  }, [session, isPending]);

  if (loading || isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F7F2] dark:bg-[#101B14]">
        <p className="text-lg font-medium text-[#166534] dark:text-green-400">
          Loading your events...
        </p>
      </main>
    );
  }

  return (
    <ManageEventsClient
      initialEvents={events}
      errorMessage={errorMessage}
    />
  );
}
