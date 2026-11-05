
"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function SubscribeToLocalCauseAlert() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Demo only: connect this to your backend later.
    alert("Thank you for subscribing to local cause alerts!");
    setEmail("");
  };

  return (
    <section className="bg-green-50 dark:bg-green-950/30 py-12 px-4 rounded-2xl">
      <div className="max-w-xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
            <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Subscribe to Local Cause Alerts
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Get updates about volunteering opportunities and community events
          happening near you.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
