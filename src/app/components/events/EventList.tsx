 
import { connection } from "next/server";
import EventBrowser from "./EventBrowser";
import type { Event } from "@/app/types/events";

interface EventListProps {
  limit?: number;
}

export default async function EventList({ limit }: EventListProps) {
  // Wait until a real request comes in.
  // This prevents Next.js from fetching events during prerendering.
  await connection();

  let events: Event[] = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("API URL is not configured.");
    }

    const response = await fetch(
      `${apiUrl.replace(/\/$/, "")}/events`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`);
    }

    events = await response.json();
  } catch (error) {
    console.error("Event fetching error:", error);
  }

  const displayedEvents = limit
    ? events.slice(0, limit)
    : events;

  return <EventBrowser events={displayedEvents} />;
}
