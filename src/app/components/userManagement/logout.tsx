"use client";
import Button from "../button";

function userLogout(){
  fetch("/api/logout");
  window.location.reload();
  console.log("user sucessfully logged out!");
}

export default function Logout(){
  return (
    <Button buttonFunc={userLogout} buttonText="Logout"/>
  );
}