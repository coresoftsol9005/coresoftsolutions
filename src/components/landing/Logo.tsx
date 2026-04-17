import logoDark from "@/assets/coresoft-logo-dark.svg";
import logoLight from "@/assets/coresoft-logo-light.svg";

type LogoProps = {
  className?: string;
  variant?: "dark" | "light";
};

/**
 * CoreSoft Solutions wordmark + signal-node icon.
 * - `dark` (default): for dark backgrounds (the site's navy theme).
 * - `light`: for light backgrounds (e.g. printed materials, light surfaces).
 */
export function Logo({ className = "", variant = "dark" }: LogoProps) {
  const src = variant === "dark" ? logoDark : logoLight;
  return (
    <img
      src={src}
      alt="CoreSoft Solutions"
      className={`h-9 w-auto ${className}`}
    />
  );
}
