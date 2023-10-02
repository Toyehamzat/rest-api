import { NextResponse } from "next/server";
import { Limitier } from "../config/limiter";
export async function GET(request: Request) {
  const Reamaining = await Limitier.removeTokens(1);
  console.log("Reamaining: ", Reamaining);

  if (Reamaining < 0) {
    return new NextResponse(null, {
      status: 429,
      statusText: "Too many request",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "text/plain",
      },
    });
  }
  return new Response("hello, Next js");
}
