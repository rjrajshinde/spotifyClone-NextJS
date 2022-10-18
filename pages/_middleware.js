//* This is next-auth build in Middleware that usually use to check whether the user is valid or not by using the information about user like token and all. And it user is not valid it sends to login page or where you want to redirect it's all your call

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const secret = process.env.JWT_SECRET;
  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;
  //? Token will exist if the user still logged in

  //? allow the requests if the following conditions are true
  //* 1. if the token is exists
  //* 2. its a request for next-auth session and provide fetching
  if (pathname.includes("/api/auth") || token) {
    //todo this means if the above conditions are satisfied then just go or continue its same like req.next() in node
    return NextResponse.next();
  }

  //! if the token is not exist then redirect it to the login page and requesting the protecting route
  if (!token && pathname !== "/login") {
    // return NextResponse.redirect("/login");
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
