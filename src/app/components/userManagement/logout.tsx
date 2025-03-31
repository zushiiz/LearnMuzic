"use client";
import Button from "../button";

async function userLogout(){
  try {
    const response = await fetch("/api/logout", {method : "POST"});
    if (response.ok) {
      window.location.reload();
      console.log("user sucessfully logged out!");
    } else {
      console.error("Log out error");
    }
  } catch(err) {
    console.error("Error while logging out", err);
  }
}

export default function Logout(){
  return (
    <Button buttonFunc={userLogout} buttonText="Logout"/>
  );
}