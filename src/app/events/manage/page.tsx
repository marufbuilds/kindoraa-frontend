 
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

  useEffect(() => {
    const getMyEvents = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        // Get JWT token
        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          throw new Error("Please log in to view your events.");
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("API URL is not configured.");
        }

        // Fetch only the logged-in user's events
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

        // Read backend response
        const result = await response.json();

        console.log("My events status:", response.status);
        console.log("My events response:", result);

        if (!response.ok) {
          throw new Error(
            result.message || `Failed to load events (${response.status}).`
          );
        }

        setEvents(result);
      } catch (error) {
        console.error("Error fetching your events:", error);

        const message =
          error instanceof Error
            ? error.message
            : "Unable to load your events.";

        setErrorMessage(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    getMyEvents();
  }, []);

  if (loading) {
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
