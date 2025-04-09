import {NextRequest, NextResponse} from "next/server";
import { musicDb } from "../../../app/lib/db";
import { Profile, User } from "../../../app/lib/dbTypes";
import { httpErrors } from "../../lib/httpErrors";

export async function GET(req : NextRequest){
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId){
      return httpErrors.badRequest;
    }

    const profileInformation = await musicDb.getUserInformationById(Number(userId));
    const response : Profile = {
      username : profileInformation.username,

    }

    return NextResponse.json(response, {status : 200});

  } catch (err){
    return httpErrors.internalServerError;
  }

}