import fetchCell from "@/lib/fetchCell";

export const runtime = "edge";
export const revalidate = 0;

export async function GET() {
  const data = await fetchCell("A2");

  return new Response(data, {
    status: 200,
  });
}
