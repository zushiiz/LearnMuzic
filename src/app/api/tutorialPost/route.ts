import {NextResponse} from "next/server";
import { musicDb } from "../../../app/lib/db";
import { httpErrors } from "../../lib/httpErrors";

export async function GET(){
  try {

    const informationIds = await musicDb.getAllTutorialPosts();

    // async function information(){
    //   for (let i = 0; i < informationIds.length; i++){
    //     const tutorialInfo = await musicDb.getTutorialById(informationIds[i].tutorialId);
    //     const songInfo = await musicDb.getSongById(informationIds[i].songId);

    //     console.log(tutorialInfo[0]);
    //     console.log(songInfo[0]);
    //  }
    // }
    // await information();

    // Send the data as a JSON response
    return NextResponse.json(informationIds, {status : 200});

  } catch (err) {
    console.error(err);
    console.log(err);
    return httpErrors.internalServerError;
  }
}
