 import EventBrowser from "./EventBrowser";
import type { Event } from "@/app/types/events";

interface EventListProps {
  limit?: number;
}

export default async function EventList({ limit }: EventListProps) {
  let events: Event[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    events = await response.json();
  } catch (error) {
    console.error("Event fetching error:", error);
  }

  const displayedEvents = limit ? events.slice(0, limit) : events;

  return <EventBrowser events={displayedEvents} />;
}