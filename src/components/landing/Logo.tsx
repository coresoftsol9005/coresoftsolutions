export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="CoreSoft Solutions"
      >
        <rect width="40" height="40" rx="8" fill="url(#cs-grad)" />
        <path
          d="M11 20a9 9 0 0 1 16.5-5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="28" cy="26" r="3.5" fill="#E53935" />
        <defs>
          <linearGradient id="cs-grad" x1="0" y1="0" x2="40" y2="40">
            <stop stopColor="#1565C0" />
            <stop offset="1" stopColor="#0A3578" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-display text-lg font-extrabold tracking-tight">
        CoreSoft<span className="text-grad-red">.</span>
      </span>
    </div>
  );
}
