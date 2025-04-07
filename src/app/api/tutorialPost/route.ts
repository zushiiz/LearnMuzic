import {NextResponse} from "next/server";
import { musicDb } from "../../../app/lib/db";
import { httpErrors } from "../../lib/httpErrors";

export async function GET(){
  try {
    const informationIds = await musicDb.getAllTutorialPosts();
    const allTutorialPosts = await musicDb.getAllTutorialInformationByIds(informationIds);

    return NextResponse.json(allTutorialPosts, {status : 200});

  } catch (err) {
    return httpErrors.internalServerError;
  }
}
