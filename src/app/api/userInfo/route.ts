import {NextRequest, NextResponse} from "next/server";
import { MusicDb } from "../../../app/lib/db";
import { User } from "../../../app/lib/dbTypes";

export async function GET(req : NextRequest){
  try {
    const musicDb = new MusicDb();
    await musicDb.connect();
    console.log(req.cookies.get("userId"));

    if (!req.cookies.get("userId")){
      const guest : User = {
        id : 0,
        username : "guest",
        hashedPassword : "pass",
        mail : "none",
        creationDate : "date"
      } 
      return NextResponse.json(guest);
    } 
    const userId = Number(req.cookies.get("userId")?.value);

    const userInformation = await musicDb.getUserInformationById(userId);

    console.log("fetching", userInformation[0]);

    return NextResponse.json(userInformation[0]);
    

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    // Optionally disconnect from the DB
    // await musicDb.disconnect();
  }
}
