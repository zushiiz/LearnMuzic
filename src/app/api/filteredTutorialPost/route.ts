import { NextRequest, NextResponse } from "next/server";
import { httpErrors } from "../../lib/httpErrors";
import { musicDb } from "../../lib/db";

export async function GET(req : NextRequest){
  try {
    const { searchParams } = new URL(req.url);
    const genreId = searchParams.get("genreId");

    if (!genreId){
      return httpErrors.badRequest;
    }
    const informationIds = await musicDb.getTutorialPostsByGenre(Number(genreId));
    const allTutorialPosts = await musicDb.getAllTutorialInformationByIds(informationIds);
    return NextResponse.json(allTutorialPosts, {status : 200});

  } catch (err) {
    return httpErrors.internalServerError;
  }
}