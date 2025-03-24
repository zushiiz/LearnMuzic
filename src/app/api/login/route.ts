import {NextRequest, NextResponse} from "next/server";
import { MusicDb } from "../../../app/lib/db";
import { errors } from "../../../app/lib/Errors";
import { User } from "../../../app/lib/dbTypes";
import { comparePassword } from "../../../app/lib/hash";

export async function POST(request : NextRequest){
  try {
    const musicDb = new MusicDb();
    await musicDb.connect(); 
    const loginInfo = await request.json();

    console.log("in api");

    const storedPass = await musicDb.getUserPasswordByName(loginInfo.username);
    const success = await comparePassword(loginInfo.password, storedPass);
    if (success) {
      const userId = await musicDb.getUserInformationByName(loginInfo.username);
      console.log(userId);
      return NextResponse.json({message : "Login successful!"}, {status : 201});

    } else {
      return NextResponse.json({message : "Wrong password or username"}, {status : 400})
    }
    } catch (err){
      return NextResponse.json({error : errors.result_empty}, {status : 500});
    }

}
