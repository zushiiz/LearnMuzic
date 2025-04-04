import { NextRequest } from "next";

export async function GET(req : NextRequest){
  
  const { searchParams } = new URL(req.url);
  const a = searchParams.get("tutorialPostId");
  console.log(a);

}