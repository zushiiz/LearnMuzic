import bcrypt from "bcrypt";
import { errors } from "./Errors";

const salt = 10;

export async function hashPassword(input : string): Promise<string> {
  if (!input) {
    throw new Error(errors.result_empty);
  }
  return await bcrypt.hash(input, salt);
}

