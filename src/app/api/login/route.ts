import {NextRequest, NextResponse} from "next/server";
import { musicDb } from "../../../app/lib/db";
import { httpErrors } from "../../../app/lib/httpErrors";
import { checkUserCookie } from "../../lib/cookie";
import { comparePassword } from "../../../app/lib/hash";

export async function POST(req : NextRequest){
  try {
    const cookie = await checkUserCookie();
    if(cookie) {
      return httpErrors.conflict;
    }
     
    const loginInfo = await req.json();
    const storedPass = await musicDb.getUserPasswordByName(loginInfo.username);
    const success = await comparePassword(loginInfo.password, storedPass);
    if (success) {
      const userId = await musicDb.getUserInformationByName(loginInfo.username);

      const res = NextResponse.json({message : "Login successful"}, {status : 200});

      res.cookies.set("userId", userId.id.toString(), {
        httpOnly : true, //prevents javascript from accessing cookie. ex. document.cookie
        secure : false, //process.env.NODE_ENV === "production", //ensures cookie sent over http connecitons, only in production (search it up more)
        maxAge : 60 * 60 * 24, // cookie age
        path : "/" // available anywhere for website
      });

    return res;

    } else {
      return httpErrors.unauthorized;
    }
    } catch (err){
      return httpErrors.internalServerError;
    }

}
