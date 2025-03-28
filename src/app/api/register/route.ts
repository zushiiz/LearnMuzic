import {NextRequest, NextResponse} from "next/server";
import { musicDb } from "../../../app/lib/db";
import { errors } from "../../../app/lib/Errors";
import { User } from "../../../app/lib/dbTypes";
import { hashPassword } from "../../../app/lib/hash";

export async function POST(request : NextRequest){
  try {
    const newUserInfo = await request.json();
    const hashedPassword = await hashPassword(newUserInfo.hashedPassword);
    const creationDate = newUserInfo.date.split("T");

    const sendNewUser : User = {
      id : 0,
      username : newUserInfo.username,
      hashedPassword : hashedPassword,
      mail : newUserInfo.mail,
      creationDate : creationDate[0]
    }

    await musicDb.newRegisteredUser(sendNewUser);

    return NextResponse.json({message : "Successfully registered!"}, {status : 201});
      
    } catch (err){
      return NextResponse.json({error : errors.result_empty}, {status : 500});
    }

}
