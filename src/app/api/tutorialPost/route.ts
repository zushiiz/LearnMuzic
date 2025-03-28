import {NextResponse} from "next/server";
import { musicDb } from "../../../app/lib/db";

export async function GET(){
  try {
    const tutorialPosts = await musicDb.getAllTutorialPosts();

    const inst = await musicDb.getTutorialById(1);
    console.log(inst);

    // Send the data as a JSON response
    return NextResponse.json(tutorialPosts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
