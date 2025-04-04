import {NextResponse} from "next/server";
import { musicDb } from "../../../app/lib/db";
import { httpErrors } from "../../lib/httpErrors";

export async function GET(){
  try {

    console.log("get rn");
    const informationIds = await musicDb.getAllTutorialPosts();
    console.log("ids", informationIds);
    const allTutorialPosts = await musicDb.getAllTutorialInformationByIds(informationIds);
    console.log("allTutorials", allTutorialPosts);
    
    return NextResponse.json(allTutorialPosts, {status : 200});

  } catch (err) {
    console.error(err);
    console.log(err);
    return httpErrors.internalServerError;
  }
}
