import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-red-brand" />
            <span className="eyebrow">{eyebrow}</span>
            <span className="h-px w-8 bg-red-brand" />
          </div>
          <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
            {title}
          </h2>
          {intro && (
            <p className="mx-auto mt-6 max-w-2xl text-base text-text-mid md:text-lg">
              {intro}
            </p>
          )}
        </div>
        <div className="mt-16 md:mt-20">{children}</div>
      </div>
    </section>
  );
}
