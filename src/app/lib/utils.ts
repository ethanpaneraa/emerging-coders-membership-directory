import { env } from "~/env";

export function absoluteURL(path: string) {
  return new URL(path, env.NEXT_PUBLIC_APP_URL).href;
}
