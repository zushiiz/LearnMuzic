import { NextRequest, NextResponse } from "next/server";
import { musicDb } from "../../lib/db";
import { httpErrors } from "../../lib/httpErrors";

export async function GET(req : NextRequest){
  
  const { searchParams } = new URL(req.url);
  const tutorialPostId = searchParams.get("tutorialPostId");
  if (!tutorialPostId) {
    return httpErrors.badRequest;
  }
  const tutorialPost = await musicDb.getTutorialPostIdsById(parseInt(tutorialPostId)); 

  const response = {
    songInfo : await musicDb.getSongById(tutorialPost.songId),
    tutorialInfo : await musicDb.getTutorialById(tutorialPost.tutorialId)
  };

  return NextResponse.json(response, {status : 200});

}