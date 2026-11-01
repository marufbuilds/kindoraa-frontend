 
"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import EventCard from "./EventCard";
import type { Event } from "@/app/types/events";
import EventList from "./EventList";

interface EventBrowserProps {
  events: Event[];
}

const categories = [
  "All events",
  "Environment",
  "Education",
  "Community",
  "Health",
  "Food Support",
];

export default function EventBrowser({ events }: EventBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All events");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        event.title.toLowerCase().includes(search) ||
        event.location.toLowerCase().includes(search) ||
        event.category.toLowerCase().includes(search) ||
        event.description.toLowerCase().includes(search);

      const matchesCategory =
        activeCategory === "All events" ||
        (activeCategory === "Community"
          ? event.category.toLowerCase().includes("community")
          : event.category.toLowerCase() === activeCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, activeCategory]);

  return (
     
    <section>
      {/* Page Heading */}
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-widest text-[#166534]">
          Make Your Time Matter
        </p>

        <h1 className="mt-3 text-3xl font-bold text-[#1A291F] sm:text-4xl dark:text-white">
          Explore community events
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Find an opportunity that matches your interests and schedule.
        </p>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mb-6 flex flex-col gap-3 sm:flex-row"
      >
        <div className="flex h-14 flex-1 items-center gap-3 rounded-xl border border-[#E3E8E0] bg-white px-4 dark:border-white/10 dark:bg-[#18251C]">
          <Search className="h-5 w-5 shrink-0 text-[#637369]" />

          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by event, location, or cause..."
            className="h-full w-full bg-transparent text-sm text-[#1A291F] outline-none placeholder:text-[#9AA69D] dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="h-14 rounded-xl bg-[#166534] px-8 font-semibold text-white transition hover:bg-[#174B2B]"
        >
          Search
        </button>
      </form>

      {/* Category Filters */}
      <div className="mb-12 flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-xs font-medium transition ${
                isActive
                  ? "bg-[#166534] text-white"
                  : "bg-white text-[#637369] hover:bg-[#E8F2E5] dark:bg-[#18251C] dark:text-gray-300 dark:hover:bg-[#24382A]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Event Results Heading */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[#1A291F] sm:text-2xl dark:text-white">
          Upcoming opportunities
        </h2>

        <p className="text-sm text-[#637369] dark:text-gray-400">
          Showing {filteredEvents.length}{" "}
          {filteredEvents.length === 1 ? "event" : "events"}
        </p>
      </div>

      {/* Event Cards */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#D5DED3] bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-[#18251C]">
          <Search className="mx-auto mb-4 h-10 w-10 text-[#9AA69D]" />

          <h3 className="text-lg font-semibold text-[#1A291F] dark:text-white">
            No events found
          </h3>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Try another search term or choose a different category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setActiveCategory("All events");
            }}
            className="mt-5 rounded-lg bg-[#166534] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#174B2B]"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
