 
import { notFound } from "next/navigation";
import CreateEventForm from "@/app/components/events/CreateEventForm";
import type { Event } from "@/app/types/events";
export const instant = false;

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

async function getEvent(id: string): Promise<Event | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${apiUrl}/events/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  return response.json();
}

export default async function EditEventPage({
  params,
}: EditEventPageProps) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  return <CreateEventForm event={event} />;
}
