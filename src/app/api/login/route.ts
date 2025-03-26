import {NextRequest, NextResponse} from "next/server";
import { MusicDb } from "../../../app/lib/db";
import { errors } from "../../../app/lib/Errors";
import { comparePassword } from "../../../app/lib/hash";

export async function POST(request : NextRequest){
  try {
    const musicDb = new MusicDb();
    await musicDb.connect(); 
    const loginInfo = await request.json();
    const storedPass = await musicDb.getUserPasswordByName(loginInfo.username);
    const success = await comparePassword(loginInfo.password, storedPass);
    if (success) {
      const userId = await musicDb.getUserInformationByName(loginInfo.username);

      const res = NextResponse.json({message : "Login successful!"}, {status : 201});

      res.cookies.set("userId", userId[0].id.toString(), {
        httpOnly : true, //prevents javascript from accessing cookie. ex. document.cookie
        secure : false, //process.env.NODE_ENV === "production", //ensures cookie sent over http connecitons, only in production (search it up more)
        maxAge : 60 * 60 * 24, // cookie age
        path : "/" // available anywhere for website
      })

    return res;

    } else {
      return NextResponse.json({message : "Wrong password or username"}, {status : 400})
    }
    } catch (err){
      return NextResponse.json({error : errors.result_empty}, {status : 500});
    }

}
