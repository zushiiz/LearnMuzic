"use client";
import { useEffect, useState } from "react";
import { httpErrors } from "../../lib/httpErrors";
import { Profile, TutorialCardInformation } from "../../lib/dbTypes";
import Card from "../../components/postManagement/postPreview";

interface ProfilePageProps {
  params : Promise<{
    userId : string
  }>
}

export default function ProfilePage( {params} : ProfilePageProps ){
  const [profileData, setProfileData] = useState<Profile>();
  const [userListData, setUserListData] = useState<TutorialCardInformation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {

    const fetchProfile = async () => {

      try {
        const userId = (await params).userId;
        const response = await fetch(`/api/userProfile?userId=${userId}`);
        const songList = await fetch(`/api/songList/userSongList?profileId=${userId}`);
        const data = await response.json();
        const songListData = await songList.json();
        console.log("song list", songListData);
        setUserListData(songListData);
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

    {userListData.map((info) => (
      <Card 
        key={info.id}
        id={info.id}
        songTitle={info.songTitle} 
        imagePath={info.imagePath} 
        songArtist={info.songArtist} 
        releaseYear={info.releaseYear} 
        videoAuthor={info.videoAuthor} 
        instrument={info.instrument} 
        difficulty={info.difficulty}/>
    ))}

    </div>
  );
}