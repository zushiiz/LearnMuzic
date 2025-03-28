import {NextRequest, NextResponse} from "next/server";
import { musicDb } from "../../../app/lib/db";
import { User } from "../../../app/lib/dbTypes";
import { httpErrors } from "../../lib/httpErrors";

export async function GET(req : NextRequest){
  try {
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
    
    return NextResponse.json(userInformation[0], {status : 200});
    
  } catch (err) {
    return httpErrors.internalServerError;
  }
}
