import { NextResponse } from 'next/server';

export function middleware(req) {
  const sessionData = req.cookies.get('sessionData'); // Replace with your actual session key

  // Redirect to login if session data is missing or invalid
  if (!sessionData) {
    const url = req.nextUrl.clone();
    url.pathname = '/login'; // Redirect to login page
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
  matcher: ['/cardinfo'], // Adjust the path as per your route
};
