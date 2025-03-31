"use client";
import RegisterField from "./registerFields";
import Button from "../button";
import { errors } from "../../lib/Errors";
import { useRouter } from "next/navigation";


export default function loginInputs(){
  const router = useRouter();

  async function getLoginInputs(){
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
  
    try {
      const response = await fetch(
        "/api/login", 
        {method : "POST", 
        headers : {
          "Accept" : "application/json",
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(userLogin)
        });
  
        if (response.ok) {
          router.push("/");
          window.location.reload();
        } else {
          console.error("Login failed", await response.json());
        }
  
    } catch(err) {
      console.error("Error during login", err);
    }
  }

  return (
    <article>
      <RegisterField idName="usernameField"/>
      <RegisterField idName="passwordField"/>

      <Button buttonFunc={getLoginInputs} buttonText={"Login"}/>

    </article>
  );
}