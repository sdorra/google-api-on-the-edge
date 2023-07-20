import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringifyError(err: unknown) {
  if (typeof err === "string") {
    return err;
  } else if (err instanceof Error) {
    return err.message;
  }
  return JSON.stringify(err);
}

export function formatDuration(ms: number) {
  if (ms < 1000) {
    return `${ms.toFixed(2)}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}
