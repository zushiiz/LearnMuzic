import { NextRequest, NextResponse } from "next/server";
import { musicDb } from "../../../app/lib/db";
import { httpErrors } from "../../lib/httpErrors";

export async function GET(req : NextRequest){
  try {
    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get("profileId");

    if (!profileId){
      return httpErrors.badRequest;
    }
    const response = await musicDb.getUserSongListById(Number(profileId));
    return NextResponse.json(response, {status : 200});

  } catch (err){
    console.log(err);
    return httpErrors.internalServerError;
  }

}