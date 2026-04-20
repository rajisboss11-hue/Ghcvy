import { motion } from "motion/react";

export function ProgressBar({ duration, isDark }: { duration: number, isDark?: boolean }) {
  return (
    <div className="absolute bottom-0 left-0 h-2 w-full bg-black/40 z-50">
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className={`h-full ${isDark ? 'bg-orange-500' : 'bg-yellow-400'} shadow-[0_0_10px_rgba(250,204,21,0.5)]`}
      />
    </div>
  );
}
