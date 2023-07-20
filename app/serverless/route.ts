import { google } from "googleapis";
import { env } from "@/lib/env.mjs";
import { stringifyError } from "@/lib/utils";

export const revalidate = 0;

const sheets = google.sheets("v4");

const jwtClient = new google.auth.JWT(
  env.GOOGLE_SA_CLIENT_EMAIL,
  undefined,
  env.GOOGLE_SA_PRIVATE_KEY,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

export async function GET() {
  try {
    await jwtClient.authorize();

    const data = await sheets.spreadsheets.values.get({
      auth: jwtClient,
      spreadsheetId: env.SPREADSHEET_ID,
      range: "A1",
    });

    if (!data.data.values) {
      return new Response("Sheet has no data", {
        status: 400,
      });
    }

    return new Response(data.data.values[0][0], {
      status: 200,
    });
  } catch (e) {
    return new Response(stringifyError(e), {
      status: 500,
    });
  }
}
