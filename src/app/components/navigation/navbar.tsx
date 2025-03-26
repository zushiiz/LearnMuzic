"use client";
import {useEffect, useState} from "react";
import { User } from "../../lib/dbTypes";
import DisplayedUser from "./userDisplay";


export default function Navbar(){
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/userInfo");

        const data = await response.json();
        console.log("data", data);
        setUserInfo(data);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchUserInfo();
    console.log("navbar useeffect");


  }, []);

  return (
    <nav className="border-2">
      <DisplayedUser name={userInfo?.username} password={userInfo?.hashedPassword} mail={userInfo?.mail} date={userInfo?.creationDate}/>
    </nav>
  );
}