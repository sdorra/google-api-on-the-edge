import fetchCell from "@/lib/fetchCell";

export const revalidate = false;

export const fetchCache = "force-cache";

export async function GET() {
  const data = await fetchCell("A3", "isr");

  return new Response(data, {
    status: 200,
  });
}
