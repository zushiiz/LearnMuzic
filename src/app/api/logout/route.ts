import { NextResponse } from "next/server";

export async function POST(){
  try {
    const res = NextResponse.json({message : "Logging out"}, {status : 200});
    res.cookies.delete("userId");
    return res;    
  } catch (err){
    console.log(err);
  }

}