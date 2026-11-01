 
"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Image as ImageIcon,
  Users,
  Tag,
  Type,
  HeartHandshake,
  Sparkles,
  Mail,
  CheckCircle2,
  Leaf,
  HandHeart,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import type { Event } from "@/app/types/events";

const eventCategories = [
  "Community Service",
  "Donation Drive",
  "Environmental Cleanup",
  "Tree Plantation",
  "Education",
  "Food Support",
  "Health & Wellness",
  "Other",
];

interface CreateEventFormProps {
  event?: Event;
}

export default function CreateEventForm({
  event,
}: CreateEventFormProps) {
  const isEditMode = Boolean(event);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("FORM SUBMITTED");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const eventData = {
      title: formData.get("title"),
      category: formData.get("category"),
      date: formData.get("date"),
      startTime: formData.get("startTime"),
      location: formData.get("location"),
      volunteerSpots: Number(formData.get("volunteerSpots")),
      imageUrl: formData.get("imageUrl"),
      description: formData.get("description"),
      organizerEmail: formData.get("organizerEmail"),
    };

    try {
      setIsSubmitting(true);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      // Get JWT from Better Auth
      const { data, error } = await authClient.token();

      console.log("JWT received:", Boolean(data?.token));
      console.log("JWT error:", error);

      if (error || !data?.token) {
        throw new Error("Please log in to continue.");
      }

      const requestUrl = `${apiUrl}/events${isEditMode ? `/${event?._id}` : ""}`;
      const method = isEditMode ? "PATCH" : "POST";

      console.log("Sending event request...");
      console.log("Request URL:", requestUrl);
      console.log("Request method:", method);

      const response = await fetch(requestUrl, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(eventData),
      });

      console.log("Event response status:", response.status);

      const result = await response.json().catch(() => null);

      console.log("Event response:", result);

      if (!response.ok) {
        throw new Error(
          result?.message ||
            (isEditMode
              ? "Failed to update event."
              : "Failed to create event.")
        );
      }

      if (isEditMode) {
        toast.success("Event updated successfully!", {
          description: "Your changes have been saved.",
        });
      } else {
        toast.success("Event created successfully!", {
          description: "Your new event is now published.",
        });

        form.reset();
      }
    } catch (error) {
      console.error("Event submission error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#E5E9E3] bg-[#FCFDFB] px-4 py-3.5 text-sm text-[#25372A] outline-none transition duration-200 placeholder:text-gray-400 hover:border-[#B8CBB9] focus:border-[#166534] focus:bg-white focus:ring-4 focus:ring-[#166534]/10 dark:border-[#34483A] dark:bg-[#142019] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-[#18251C]";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#263A2C] dark:text-gray-200";

  const sectionTitle =
    "text-base font-bold text-[#1D3423] dark:text-white";

  const iconClass =
    "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7C927F]";

  return (
    <main className="min-h-screen bg-[#F6F8F3] px-4 py-8 dark:bg-[#101B14] sm:px-6 lg:py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-7">
          <Link
            href={isEditMode ? "/events/manage" : "/events"}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#718174] transition hover:text-[#166534] dark:text-gray-400 dark:hover:text-green-400"
          >
            <ArrowLeft size={16} />
            {isEditMode ? "Back to manage events" : "Back to events"}
          </Link>
        </div>

        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#DCE9DC] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#166534] dark:border-[#34483A] dark:bg-[#18251C] dark:text-green-400">
              <Sparkles size={14} />
              Make an impact
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#1B3020] sm:text-4xl lg:text-5xl dark:text-white">
              {isEditMode ? "Edit your event" : "Create an event"}
              <span className="text-[#E99A37">.</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#78877A] sm:text-base dark:text-gray-400">
              Great things happen when people come together. Share your
              idea, bring your community together, and make a difference.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-[#E4EAE1] bg-white px-4 py-3 text-sm font-medium text-[#526754] shadow-sm dark:border-[#34483A] dark:bg-[#18251C] dark:text-gray-300 md:self-auto">
            <ShieldCheck size={18} className="text-[#166534] dark:text-green-400" />
            Community first
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_310px]">
          <div className="overflow-hidden rounded-2xl border border-[#E6EBE3] bg-white shadow-[0_8px_35px_rgba(30,60,35,0.04)] dark:border-[#2B3C30] dark:bg-[#18251C]">
            <div className="border-b border-[#EDF0EB] px-5 py-6 sm:px-8 dark:border-[#2B3C30]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3E9] text-[#166534] dark:bg-green-900/30 dark:text-green-400">
                  <HeartHandshake size={23} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#203725] dark:text-white">
                    Event information
                  </h2>
                  <p className="mt-1 text-xs text-[#8A978B] dark:text-gray-400">
                    {isEditMode
                      ? "Update your event information below."
                      : "Fill in the details below to publish your event."}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 p-5 sm:p-8">
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF3E9] text-xs font-bold text-[#166534] dark:bg-green-900/30 dark:text-green-400">
                    01
                  </span>
                  <div>
                    <h3 className={sectionTitle}>Basic information</h3>
                    <p className="mt-0.5 text-xs text-[#8A978B] dark:text-gray-400">
                      Give your event a name and choose its category.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="title" className={labelClass}>
                      Event title <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Type size={17} className={iconClass} />
                      <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        maxLength={100}
                        defaultValue={event?.title ?? ""}
                        placeholder="e.g. Community Winter Clothes Drive"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className={labelClass}>
                      Event category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Tag size={17} className={iconClass} />
                      <select
                        id="category"
                        name="category"
                        required
                        defaultValue={event?.category ?? ""}
                        className={`${inputClass} appearance-none pl-11`}
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {eventCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <div className="h-px bg-[#EDF0EB] dark:bg-[#2B3C30]" />

              <section>
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF3E9] text-xs font-bold text-[#166534] dark:bg-green-900/30 dark:text-green-400">
                    02
                  </span>
                  <div>
                    <h3 className={sectionTitle}>Date and location</h3>
                    <p className="mt-0.5 text-xs text-[#8A978B] dark:text-gray-400">
                      Let volunteers know when and where to join.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="date" className={labelClass}>
                      Event date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <CalendarDays size={17} className={iconClass} />
                      <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        defaultValue={event?.date ?? ""}
                        onFocus={(e) => {
                          if (isEditMode) return;

                          const today = new Date();
                          const localDate = [
                            today.getFullYear(),
                            String(today.getMonth() + 1).padStart(2, "0"),
                            String(today.getDate()).padStart(2, "0"),
                          ].join("-");

                          e.currentTarget.min = localDate;
                        }}
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="startTime" className={labelClass}>
                      Starting time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock3 size={17} className={iconClass} />
                      <input
                        id="startTime"
                        name="startTime"
                        type="time"
                        required
                        defaultValue={event?.startTime ?? ""}
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="location" className={labelClass}>
                    Event location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={17} className={iconClass} />
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      defaultValue={event?.location ?? ""}
                      placeholder="Enter the event venue or address"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>
              </section>

              <div className="h-px bg-[#EDF0EB] dark:bg-[#2B3C30]" />

              <section>
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF3E9] text-xs font-bold text-[#166534] dark:bg-green-900/30 dark:text-green-400">
                    03
                  </span>
                  <div>
                    <h3 className={sectionTitle}>Volunteers and media</h3>
                    <p className="mt-0.5 text-xs text-[#8A978B] dark:text-gray-400">
                      Set the capacity and add an event image.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="volunteerSpots" className={labelClass}>
                      Available volunteer spots{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Users size={17} className={iconClass} />
                      <input
                        id="volunteerSpots"
                        name="volunteerSpots"
                        type="number"
                        min="1"
                        required
                        defaultValue={event?.volunteerSpots ?? ""}
                        placeholder="e.g. 50"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="imageUrl" className={labelClass}>
                      Event image URL <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <ImageIcon size={17} className={iconClass} />
                      <input
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        required
                        defaultValue={event?.imageUrl ?? ""}
                        placeholder="https://images.unsplash.com/..."
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                    <p className="mt-2 text-xs text-[#929E93] dark:text-gray-500">
                      Use a public image URL that represents your event.
                    </p>
                  </div>
                </div>
              </section>

              <div className="h-px bg-[#EDF0EB] dark:bg-[#2B3C30]" />

              <section>
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF3E9] text-xs font-bold text-[#166534] dark:bg-green-900/30 dark:text-green-400">
                    04
                  </span>
                  <div>
                    <h3 className={sectionTitle}>Description and contact</h3>
                    <p className="mt-0.5 text-xs text-[#8A978B] dark:text-gray-400">
                      Explain your mission and provide contact information.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="description" className={labelClass}>
                      About this event <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      minLength={20}
                      maxLength={2000}
                      rows={5}
                      defaultValue={event?.description ?? ""}
                      placeholder="What is the purpose of this event? What will volunteers do? Who will benefit?"
                      className={`${inputClass} resize-y py-4`}
                    />
                    <p className="mt-2 text-xs text-[#929E93] dark:text-gray-500">
                      Minimum 20 characters. Maximum 2,000 characters.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="organizerEmail" className={labelClass}>
                      Organizer email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={17} className={iconClass} />
                      <input
                        id="organizerEmail"
                        name="organizerEmail"
                        type="email"
                        required
                        defaultValue={event?.organizerEmail ?? ""}
                        placeholder="you@example.com"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="border-t border-[#EDF0EB] pt-6 dark:border-[#2B3C30]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-5 text-[#929E93] dark:text-gray-500">
                    By publishing, you agree to create a safe and welcoming
                    community experience.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#166534] px-7 py-3.5 text-sm font-bold text-white shadow-[0_5px_15px_rgba(22,101,52,0.18)] transition hover:bg-[#174B2B] focus:outline-none focus:ring-4 focus:ring-[#166534]/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle size={17} className="animate-spin" />
                        {isEditMode ? "Saving changes..." : "Publishing..."}
                      </>
                    ) : (
                      <>
                        {isEditMode ? "Save Changes" : "Publish event"}
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl bg-[#174B2B] p-6 text-white">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <HandHeart size={27} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-200">
                Your impact starts here
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-snug">
                Small actions.
                <br />
                Big changes.
              </h2>

              <p className="mt-3 text-sm leading-6 text-green-100/80">
                Every community event is an opportunity to connect people
                and make someone life better.
              </p>

              <div className="mt-7 flex items-center gap-2 border-t border-white/15 pt-5 text-sm font-semibold text-white">
                <HeartHandshake size={18} />
                Together We Grow.
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5EAE2] bg-white p-5 dark:border-[#2B3C30] dark:bg-[#18251C]">
              <h3 className="font-bold text-[#203725] dark:text-white">
                Before you publish
              </h3>

              <p className="mt-1 text-xs text-[#929E93] dark:text-gray-400">
                A few things to prepare.
              </p>

              <div className="mt-5 space-y-4">
                {[
                  "Choose a clear event title",
                  "Set a date and venue",
                  "Decide volunteer capacity",
                  "Add a relevant event image",
                  "Explain your event purpose",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-[#4B9860]"
                    />
                    <p className="text-sm leading-5 text-[#667568] dark:text-gray-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5EAE2] bg-[#EDF4E9] p-5 dark:border-[#34483A] dark:bg-[#18251C]">
              <div className="flex items-center gap-2 text-[#166534] dark:text-green-400">
                <Leaf size={19} />
                <h3 className="text-sm font-bold">A little reminder</h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-[#647766] dark:text-gray-400">
                Make your event welcoming and accessible. A clear purpose
                helps the right volunteers find you.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-9 flex items-center justify-center gap-2 text-sm text-[#8A978B] dark:text-gray-500">
          <HeartHandshake size={17} className="text-[#166534] dark:text-green-400" />
          Building stronger communities, one event at a time.
        </div>
      </div>
    </main>
  );
}
