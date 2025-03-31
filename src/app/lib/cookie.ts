import { cookies } from "next/headers";

export async function checkUserCookie():Promise<boolean>{
  const checkCookie = await cookies();
  if (checkCookie.get("userId")) {
    return true;
  }
  else {
    return false;
  }
}