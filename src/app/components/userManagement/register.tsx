"use client";
import RegisterField from "./registerFields";
import Button from "../button";
import { errors } from "../../lib/Errors";

function getRegisterInputs(){
  console.log("click");
  const nameInput = document.getElementById("usernameField") as HTMLInputElement;
  const passwordInput = document.getElementById("passwordField") as HTMLInputElement;
  if (!nameInput || !passwordInput){
    throw new Error(errors.input_nan);
  }
  const newUser = {
    username : nameInput.value,
    password : passwordInput.value
  }
  console.log(newUser);

}


export default function Register(){
  return (
    <article>
      <RegisterField idName="usernameField"/>
      <RegisterField idName="passwordField"/>
      
      <Button buttonFunc={getRegisterInputs}/>
    </article>
  );
}