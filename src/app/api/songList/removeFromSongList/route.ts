import {NextRequest, NextResponse} from "next/server";
import { musicDb } from "../../../lib/db";
import { cookies } from "next/headers";
import { httpErrors } from "../../../lib/httpErrors";
import { checkUserCookie } from "../../../lib/cookie";

export async function POST(req : NextRequest){
  try {
    const postId = await req.json();
    const checkUser = await checkUserCookie();
    if (!checkUser) {
      return httpErrors.unauthorized;
    }
    const cookie = await cookies();
    const userId = cookie.get("userId")?.value;
    await musicDb.removeSongFromUserSongList(postId, Number(userId));
    return NextResponse.json({message : "Successfully removed"}, {status : 200});
      
    } catch (err){
      return httpErrors.internalServerError;
    }
}