import { google } from "googleapis";
import { env } from "@/lib/env.mjs";

const sheets = google.sheets("v4");

const jwtClient = new google.auth.JWT(
  env.GOOGLE_SA_CLIENT_EMAIL,
  undefined,
  env.GOOGLE_SA_PRIVATE_KEY,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

export async function GET() {
  await jwtClient.authorize();

  const data = await sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: env.SPREADSHEET_ID,
    range: "A1",
  });

  if (!data.data.values) {
    throw new Error("sheet has no data");
  }

  return new Response(data.data.values[0][0], {
    status: 200,
  });
}
