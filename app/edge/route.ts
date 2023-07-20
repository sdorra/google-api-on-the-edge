import { SignJWT, importPKCS8 } from "jose";
import { env } from "@/lib/env.mjs";

export const runtime = "edge";
export const revalidate = 0;

const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${env.SPREADSHEET_ID}/values/A2`;

const payload = {
  iss: env.GOOGLE_SA_CLIENT_EMAIL,
  scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
  aud: "https://www.googleapis.com/oauth2/v4/token",
  exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
  iat: Math.floor(Date.now() / 1000),
};

export async function GET() {
  const privateKey = await importPKCS8(env.GOOGLE_SA_PRIVATE_KEY, "RS256");

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setIssuer(env.GOOGLE_SA_CLIENT_EMAIL)
    .setAudience("https://www.googleapis.com/oauth2/v4/token")
    .setExpirationTime("1h")
    .sign(privateKey);

  // Form data for the token request
  const form = {
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: token,
  };

  // Make the token request
  const tokenResponse = await fetch(
    "https://www.googleapis.com/oauth2/v4/token",
    {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    }
  );

  const tokenData = await tokenResponse.json();
  // Use the access token to make the API request
  const apiResponse = await fetch(apiUrl, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const data = await apiResponse.json();

  return new Response(data.values[0][0], {
    status: 200,
  });
}
