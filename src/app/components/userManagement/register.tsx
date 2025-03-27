"use client";
import RegisterField from "./registerFields";
import Button from "../button";
import { errors } from "../../lib/Errors";

function getRegisterInputs(){
  const nameInput = document.getElementById("usernameField") as HTMLInputElement;
  const passwordInput = document.getElementById("passwordField") as HTMLInputElement;
  const mailInput = document.getElementById("mailField") as HTMLInputElement; 
  if (!nameInput || !passwordInput){
    throw new Error(errors.input_nan);
  }
  const newUser  = {
    username : nameInput.value,
    hashedPassword : passwordInput.value,
    mail : mailInput.value,
    date : new Date()
  }
  
  fetch("/api/register", 
  {method : "POST", 
  headers : {
    "Accept" : "application/json",
    "Content-Type" : "application/json"
  },
  body : JSON.stringify(newUser)
  })
  .then((value : Response) => {value.status}); // remove

}

export default function Register(){
  return (
    <article>
      <RegisterField idName="usernameField"/>
      <RegisterField idName="passwordField"/>
      <RegisterField idName="mailField"/>
      
      <Button buttonFunc={getRegisterInputs} buttonText={"Register"}/>
    </article>
  );
}