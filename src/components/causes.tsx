 
"use client";

import { motion } from "framer-motion";
import {
  Sprout,
  BookOpen,
  HandHeart,
  Utensils,
  ArrowUpRight,
} from "lucide-react";

const causes = [
  {
    icon: Sprout,
    title: "Environment",
    description: "Protect nature and build a greener future.",
    number: "01",
  },
  {
    icon: BookOpen,
    title: "Education",
    description: "Help every learner access opportunity.",
    number: "02",
  },
  {
    icon: HandHeart,
    title: "Community care",
    description: "Support neighbours when they need it.",
    number: "03",
  },
  {
    icon: Utensils,
    title: "Food support",
    description: "Share meals and reduce food insecurity.",
    number: "04",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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

export default function Causes() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Soft background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-green-500/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-emerald-500/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-4 flex items-center gap-3">
             
          </div>

          <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-[#174b2b] sm:text-4xl lg:text-[42px] dark:text-[#ece7d9]">
            Small actions.
            <span className="text-[#6a9b76] dark:text-[#8fbd9b]">
              {" "}Every kind of change.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Choose where you want to make a difference. Every contribution
            matters, and every helping hand creates a stronger community.
          </p>
        </motion.div>

        {/* Cause cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {causes.map((cause) => {
            const Icon = cause.icon;

            return (
              <motion.div
                key={cause.title}
                variants={cardVariants}
                whileHover={{
                  y: -9,
                  transition: { duration: 0.25 },
                }}
                className="group relative overflow-hidden rounded-2xl border border-[#e5ebe3] bg-card p-6 shadow-[0_5px_20px_-10px_rgba(20,38,27,0.12)] transition-colors duration-300 hover:border-[#9bc5a5] hover:shadow-[0_18px_40px_-15px_rgba(22,101,52,0.22)] dark:border-border dark:hover:border-[#3e8055]"
              >
                {/* Decorative corner accent */}
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#166534]/[0.04] transition-transform duration-500 group-hover:scale-[2] dark:bg-[#6fbf8b]/[0.06]" />

                <div className="relative flex items-center justify-between">
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf5ee] text-[#166534] transition-colors duration-300 group-hover:bg-[#166534] group-hover:text-white dark:bg-[#1b3826] dark:text-[#8fbd9b] dark:group-hover:bg-[#286b42] dark:group-hover:text-white"
                  >
                    <Icon size={23} strokeWidth={1.8} />
                  </motion.div>

                  <span className="text-xs font-bold tracking-wider text-[#a3b5a5] transition-colors group-hover:text-[#166534] dark:text-[#627d69] dark:group-hover:text-[#8fbd9b]">
                    {cause.number}
                  </span>
                </div>

                <h3 className="relative mt-7 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-[#166534] dark:group-hover:text-[#8fbd9b]">
                  {cause.title}
                </h3>

                <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
                  {cause.description}
                </p>

                {/* Animated bottom indicator */}
                <div className="relative mt-6 flex items-center justify-between">
                  <span className="h-[3px] w-9 rounded-full bg-[#166534]/30 transition-all duration-500 group-hover:w-16 group-hover:bg-[#166534] dark:bg-[#6fbf8b]/30 dark:group-hover:bg-[#8fbd9b]" />

                  <ArrowUpRight
                    size={18}
                    className="text-muted-foreground opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-[#166534] dark:group-hover:text-[#8fbd9b]"
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
