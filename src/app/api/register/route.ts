import {NextResponse} from "next/server";
import { MusicDb } from "../../../app/lib/db";

export async function POST(){
  try {
    const musicDb = new MusicDb();
    await musicDb.connect(); // Ensures db is connected

    const tutorialPosts = await musicDb.getAllTutorialPosts();

    const inst = await musicDb.getTutorialById(1);
    console.log(inst);
    
    return NextResponse.json(tutorialPosts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {

  }
}
