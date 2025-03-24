"use client";
import RegisterField from "./registerFields";
import Button from "../button";
import { errors } from "../../lib/Errors";

function getLoginInputs(){
  const nameInput = document.getElementById("usernameField") as HTMLInputElement;
  const passwordInput = document.getElementById("passwordField") as HTMLInputElement;

  if (!nameInput || !passwordInput){
    throw new Error(errors.input_nan);
  }
  const userLogin  = {
    username : nameInput.value,
    password : passwordInput.value,
  }

  console.log(userLogin);

  fetch("/api/login", 
  {method : "POST", 
  headers : {
    "Accept" : "application/json",
    "Content-Type" : "application/json"
  },
  body : JSON.stringify(userLogin)
  }).then((value : Response) => {value.status});


}

export default function loginInputs(){
  return (
    <article>
      <RegisterField idName="usernameField"/>
      <RegisterField idName="passwordField"/>
      
      <Button buttonFunc={getLoginInputs} buttonText={"Login"}/>
    </article>
  );
}