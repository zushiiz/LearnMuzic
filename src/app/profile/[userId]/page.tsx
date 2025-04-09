"use client";
import { useEffect, useState } from "react";
import { httpErrors } from "../../lib/httpErrors";
import { Profile } from "../../lib/dbTypes";

interface ProfilePageProps {
  params : Promise<{
    userId : string
  }>
}

export default function ProfilePage( {params} : ProfilePageProps ){
  const [profileData, setProfileData] = useState<Profile>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {

    const fetchProfile = async () => {

      try {
        const userId = (await params).userId;
        const response = await fetch(`/api/userProfile?userId=${userId}`);
        const data = await response.json();
        console.log(data);
        setProfileData(data);
      } catch (err) {
        return httpErrors.badRequest;
      } finally {
        setLoading(false);
      }

    }
    fetchProfile();
  }, []);

  return (
    <div>

      {profileData ? (
        <p>{profileData.username}</p>
      ) : (
        null
      ) 
    }

    </div>
  );
}