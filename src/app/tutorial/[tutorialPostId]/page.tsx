"use client";
import { useEffect, useState } from "react"
import { Tutorial, Song } from "../../lib/dbTypes"
import { httpErrors } from "../../lib/httpErrors";

interface TutorialPageProps {
  params : Promise<{
    tutorialPostId : string
  }>
}


export default function TutorialPage( {params} : TutorialPageProps ){
  const [tutorialData, setTutorialData] = useState<Tutorial[]>([]); 
  const [songData, setSongData] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  

  useEffect(() => {
    const fetchTutorial = async () => {
      
      try {
        const postId = (await params).tutorialPostId;
        const response = await fetch(`/api/tutorial?tutorialPostId=${postId}`);
      } catch (err) {
        return httpErrors.badRequest;
      }
      

    }
    fetchTutorial();
  }, []);

  return (
    <div>
      a
    </div>
  );

}