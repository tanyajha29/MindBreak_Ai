import { useState } from "react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"dark" | "system">("dark");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [emailNotif, setEmailNotif] = useState(true);
  const [appNotif, setAppNotif] = useState(true);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10">
        {/* PAGE HEADER */}
        <h1 className="text-2xl font-semibold text-white">
          Settings
        </h1>

        {/* PROFILE */}
        <Section title="Profile">
          <Input label="Full Name" placeholder="Your name" />
          <Input label="Email" placeholder="you@email.com" disabled />
        </Section>

        {/* PREFERENCES */}
        <Section title="Preferences">
          <div>
            <p className="text-sm text-gray-400 mb-2">Theme</p>
            <div className="flex gap-3">
              <OptionButton
                label="Dark"
                active={theme === "dark"}
                onClick={() => setTheme("dark")}
              />
              <OptionButton
                label="System"
                active={theme === "system"}
                onClick={() => setTheme("system")}
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-2">
              Default Task Priority
            </p>
            <div className="flex gap-3">
              {(["Low", "Medium", "High"] as const).map((p) => (
                <OptionButton
                  key={p}
                  label={p}
                  active={priority === p}
                  onClick={() => setPriority(p)}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* NOTIFICATIONS */}
        <Section title="Notifications">
          <Toggle
            label="Email notifications"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
          />
          <Toggle
            label="In-app notifications"
            checked={appNotif}
            onChange={() => setAppNotif(!appNotif)}
          />
        </Section>

        {/* ACCOUNT */}
        <Section title="Account">
          <button className="w-full py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition">
            Log out
          </button>

          <button className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition">
            Delete account
          </button>
        </Section>
      </div>
    </DashboardLayout>
  );
}

/* ---------------- UI HELPERS ---------------- */

import { motion } from "framer-motion";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        boxShadow: "0 0 30px rgba(168,85,247,0.15)",
      }}
      className="bg-[#12141d] rounded-2xl p-6 border border-white/10 space-y-5"
    >
      <h2 className="text-lg font-semibold text-white">
        {title}
      </h2>
      {children}
    </motion.div>
  );
}


function Input({
  label,
  placeholder,
  disabled = false,
}: {
  label: string;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-2">
        {label}
      </p>
      <input
        disabled={disabled}
        placeholder={placeholder}
        className={
          "w-full rounded-xl px-4 py-3 text-sm focus:outline-none bg-[#1a1d26] " +
          (disabled
            ? "text-gray-500 border border-white/5"
            : "text-white border border-white/10 focus:ring-2 focus:ring-purple-500")
        }
      />
    </div>
  );
}


function OptionButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={
        "px-4 py-2 rounded-lg text-sm border transition-all " +
        (active
          ? "bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
          : "border-white/10 text-gray-400 hover:bg-white/5")
      }
    >
      {label}
    </motion.button>
  );
}


function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white">{label}</span>

      <button
        onClick={onChange}
        className={
          "w-12 h-6 rounded-full p-1 transition " +
          (checked ? "bg-purple-500" : "bg-gray-600")
        }
      >
        <div
          className={
            "w-4 h-4 bg-white rounded-full transition " +
            (checked ? "translate-x-6" : "")
          }
        />
      </button>
    </div>
  );
}
