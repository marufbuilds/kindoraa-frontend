"use client";

import { motion } from "framer-motion";
import {
  Search,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover an opportunity",
    description:
      "Explore local events that match your interests and the causes you care about.",
    icon: Search,
    detail: "Find your purpose",
  },
  {
    number: "02",
    title: "Show up together",
    description:
      "Join a team, meet your neighbours, and contribute your time and skills.",
    icon: Users,
    detail: "Make connections",
  },
  {
    number: "03",
    title: "See the difference",
    description:
      "Track your contribution and celebrate the positive change you helped create.",
    icon: TrendingUp,
    detail: "Create real impact",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-green-500/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-emerald-500/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#166534] dark:bg-[#6fbf8b]" />

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#166534] dark:text-[#6fbf8b]">
              A simple way to make an impact
            </p>
          </div>

          <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-[#174b2b] sm:text-4xl lg:text-[42px] dark:text-[#ece7d9]">
            Good things start with
            <span className="text-[#6a9b76] dark:text-[#8fbd9b]">
              {" "}showing up.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            From finding a cause to celebrating the change, Kindora makes
            community action easy.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-12 grid gap-5 md:grid-cols-3 lg:mt-14"
        >
           
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-10 hidden border-t border-dashed border-[#b7cdbb] md:block dark:border-[#365b41]" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                variants={cardVariants}
                whileHover={{
                  y: -9,
                  transition: { duration: 0.25 },
                }}
                className="group relative overflow-hidden rounded-2xl border border-[#e5ebe3] bg-card p-6 shadow-[0_5px_20px_-10px_rgba(20,38,27,0.12)] transition-all duration-300 hover:border-[#9bc5a5] hover:shadow-[0_18px_40px_-15px_rgba(22,101,52,0.22)] dark:border-border dark:hover:border-[#3e8055] sm:p-7"
              >
                {/* Decorative background */}
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#166534]/[0.035] transition-transform duration-700 group-hover:scale-[1.8] dark:bg-[#6fbf8b]/[0.05]" />

                {/* Number and icon */}
                <div className="relative flex items-center justify-between">
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf5ee] text-[#166534] transition-colors duration-300 group-hover:bg-[#166534] group-hover:text-white dark:bg-[#1b3826] dark:text-[#8fbd9b] dark:group-hover:bg-[#286b42] dark:group-hover:text-white"
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </motion.div>

                  <span className="text-sm font-extrabold tracking-wider text-[#a3b5a5] transition-colors duration-300 group-hover:text-[#166534] dark:text-[#627d69] dark:group-hover:text-[#8fbd9b]">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="relative mt-7 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-[#166534] dark:group-hover:text-[#8fbd9b]">
                  {step.title}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>

                {/* Bottom detail */}
                <div className="relative mt-7 flex items-center justify-between border-t border-[#edf1ec] pt-5 dark:border-border">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={15}
                      className="text-[#6a9b76] dark:text-[#8fbd9b]"
                    />
                    <span className="text-xs font-semibold text-muted-foreground">
                      {step.detail}
                    </span>
                  </div>

                  <ArrowRight
                    size={17}
                    className="text-[#166534] opacity-0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:text-[#8fbd9b]"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
