import {NextRequest, NextResponse} from "next/server";
import { musicDb } from "../../../app/lib/db";
import { User } from "../../../app/lib/dbTypes";

export async function GET(req : NextRequest){
  try {
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

    return NextResponse.json(userInformation[0], {status : 200});
    

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
