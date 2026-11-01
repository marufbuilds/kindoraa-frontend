 
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Mail,
  CalendarPlus,
  CalendarDays,
  Users,
  LogOut,
  ChevronRight,
  HeartHandshake,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileDialog({
  open,
  onClose,
}: ProfileDialogProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Unable to log out.");
        return;
      }

      onClose();
      toast.success("Logged out successfully.");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong.");
    }
  };

  const actions = [
    {
      title: "Create Event",
      description: "Organize a new community event",
      href: "/events/create",
      icon: CalendarPlus,
      color:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      title: "Manage Events",
      description: "View and manage your events",
      href: "/events/manage",
      icon: CalendarDays,
      color:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-3xl border border-[#e8eee8] bg-[#fffefa] p-6 dark:border-white/10 dark:bg-[#18251c] sm:p-8">
        {/* Profile Header */}
        <DialogHeader className="items-center border-b border-[#e8eee8] pb-6 text-center dark:border-white/10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e5f1e5] text-3xl font-bold text-[#166534] dark:bg-[#263b2c] dark:text-[#a8d5b1]">
            {initial}
          </div>

          <DialogTitle className="mt-3 text-xl font-bold text-[#174b2b] dark:text-white">
            {user?.name || "Kindora Member"}
          </DialogTitle>

          <DialogDescription className="flex items-center justify-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Mail size={15} />
            {user?.email || "No email available"}
          </DialogDescription>

          <span className="mt-2 rounded-full bg-[#eaf5eb] px-3 py-1 text-xs font-semibold text-[#166534] dark:bg-[#263b2c] dark:text-[#a8d5b1]">
            Kindora Member
          </span>
        </DialogHeader>

        {/* Account Information */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-[#f5f7f2] p-3.5 dark:bg-[#223328]">
            <UserRound className="text-[#166534] dark:text-[#a8d5b1]" size={19} />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="text-sm font-semibold text-[#174b2b] dark:text-white">
                {user?.name || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#f5f7f2] p-3.5 dark:bg-[#223328]">
            <Mail className="text-[#166534] dark:text-[#a8d5b1]" size={19} />
            <div className="min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Email Address
              </p>
              <p className="break-all text-sm font-semibold text-[#174b2b] dark:text-white">
                {user?.email || "Not available"}
              </p>
            </div>
          </div>
        </div>

        {/* Activities */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            My Activities
          </h3>

          <div className="space-y-2">
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl border border-[#e8eee8] p-3.5 transition hover:border-[#b9d0b9] hover:bg-[#f5f8f3] dark:border-white/10 dark:hover:bg-[#223328]"
                >
                  <div className={`rounded-xl p-2.5 ${action.color}`}>
                    <Icon size={20} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#174b2b] dark:text-white">
                      {action.title}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-gray-400 transition group-hover:translate-x-1"
                  />
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() =>
                toast.info("Joined Events will be available soon!")
              }
              className="flex w-full items-center gap-3 rounded-xl border border-[#e8eee8] p-3.5 text-left transition hover:bg-[#f5f8f3] dark:border-white/10 dark:hover:bg-[#223328]"
            >
              <div className="rounded-xl bg-blue-100 p-2.5 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                <Users size={20} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold text-[#174b2b] dark:text-white">
                  Joined Events
                </p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  See the events you have joined
                </p>
              </div>

              <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                Soon
              </span>
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/30"
        >
          <LogOut size={17} />
          Log Out
        </button>

        <div className="flex items-center justify-center gap-2 pt-3 text-xs text-gray-400">
          <HeartHandshake size={15} />
          Together We Grow.
        </div>
      </DialogContent>
    </Dialog>
  );
}
