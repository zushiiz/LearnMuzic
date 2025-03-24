import bcrypt from "bcrypt";
import { errors } from "./Errors";

const salt = 10;

export async function hashPassword(input : string): Promise<string> {
  if (!input) {
    throw new Error(errors.input_nan);
  }
  return await bcrypt.hash(input, salt);
}

export async function comparePassword(userInput : string, storedPass : string): Promise<boolean>{
  if(!userInput || !storedPass) {
    throw new Error(errors.input_nan);
  }
  try {
    const match = await bcrypt.compare(userInput, storedPass)
    if (match) {
      console.log("compare success!");
      return true;
    } else {
      console.log("password not match");
      return false;
    }
  } catch {
    throw new Error(errors.result_empty);
  }
}