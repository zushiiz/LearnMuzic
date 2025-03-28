import { NextResponse } from "next/server";
export const httpErrors = {
  badRequest : NextResponse.json({ error : "Bad Request" }, { status : 400 }),
  unauthorized : NextResponse.json({ error : "Unauthorized "}, { status : 401}),
  notFound : NextResponse.json({ error : "Not Found" }, { status : 404 }),
  internalServerError : NextResponse.json({ error : "Internal Server Error"}, {status : 500})
  
};