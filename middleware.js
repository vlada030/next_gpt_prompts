import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.url.includes("/api/")) {
    console.log("Middleware");
    console.log({ url: request.url });
    console.log({origin: request.headers.origin})
  }

  return NextResponse.next();
}
