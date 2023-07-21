import { env } from "@/lib/env.mjs";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (token !== env.ON_UPDATE_TOKEN) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  revalidateTag("isr");
  revalidatePath("/isr");

  return new Response("OK", {
    status: 200,
  });
}
