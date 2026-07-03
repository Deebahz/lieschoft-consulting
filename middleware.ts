import { NextRequest, NextResponse } from "next/server";

const adminUser = process.env.ADMIN_USER;
const adminPass = process.env.ADMIN_PASS;

function unauthorizedResponse() {
  const response = new NextResponse("Authentication required", {
    status: 401,
  });
  response.headers.set("WWW-Authenticate", 'Basic realm="Admin Area"');
  return response;
}

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (!adminUser || !adminPass) {
    return new NextResponse("Admin credentials are not configured.", {
      status: 500,
    });
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const encoded = authHeader.split(" ")[1];
  let decoded = "";

  try {
    decoded = atob(encoded);
  } catch {
    return unauthorizedResponse();
  }

  const [username, password] = decoded.split(":");
  if (username !== adminUser || password !== adminPass) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
