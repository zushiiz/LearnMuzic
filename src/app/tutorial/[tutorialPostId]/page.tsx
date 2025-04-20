"use client";
import { useEffect, useState } from "react"
import { Tutorial, Song } from "../../lib/dbTypes"
import { httpErrors } from "../../lib/httpErrors";
import SongDisplay from "../../components/postManagement/songDisplay";
import TutorialDisplay from "../../components/postManagement/tutorialDisplay";
import Button from "../../components/button";

interface TutorialPageProps {
  params : Promise<{
    tutorialPostId : string
  }>
}

function getId(id : string, apiRoute : string){
  fetch(`/api/songList/${apiRoute}`,
  {method : "POST",
  headers : {
      "Accept" : "application/json",
      "Content-Type" : "application/json"
  },
  body : JSON.stringify(id)
  })
}

export default function TutorialPage( {params} : TutorialPageProps ){
  const [tutorialData, setTutorialData] = useState<Tutorial>(); 
  const [songData, setSongData] = useState<Song>();
  const [postId, setPostId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTutorial = async () => {

      try {
        const postId = (await params).tutorialPostId;
        const response = await fetch(`/api/tutorial?tutorialPostId=${postId}`);
        const data  = await response.json();

        setPostId(postId);
        setSongData(data.songInfo);
        setTutorialData(data.tutorialInfo);
      
      } catch (err) {
        return httpErrors.badRequest;
      } finally {
        setLoading(false);
      }
      
    }
    fetchTutorial();
  }, []);

  return (
    <section>
      {songData ? (
        <SongDisplay
        imagePath={songData.imagePath}
        title={songData.title}
        artistId={songData.artistId}
        genre={songData.genre}
        releaseYear={songData.releaseYear}
        />
      ) : (
        null
      )
      }
      {tutorialData ? (
        <TutorialDisplay
        videoEmbed={tutorialData?.videoEmbed}
        author={tutorialData?.author}
        instrument={tutorialData?.instrument}
        difficulty={tutorialData?.difficulty}
        />

      ) : (
        null
      )
    }
    
    <Button buttonFunc={() => {
      if (postId) {
        getId(postId, "addToSongList");
      }
    }} buttonText="Add"/>

    <Button buttonFunc={() => {
      if (postId) {
        getId(postId, "removeFromSongList");
      }
    }} buttonText="Remove"/>

    </section>
  );

}