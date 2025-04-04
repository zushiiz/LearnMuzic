"use client";
import Card from "../postManagement/postPreview";
import {useEffect, useState} from "react";
import { TutorialCardInformation } from "../../lib/dbTypes";

export default function Post(){

  const [tutorialPosts, setTutorialPosts] = useState<TutorialCardInformation[]>([]); //Holds the fetched data, it is set to a array holding TutoriaPost Interface
  const [loading, setLoading] = useState<boolean>(true); // Keeps track when data is loaded or not
  const [error, setError] = useState<string | null>(null); // Holds error message incase fetch fails

  useEffect(() => { // Makes sure this runs before UI loades to prevent asynchronized loading
    const fetchTutorialPosts = async () => {
      try {
        const response = await fetch("/api/tutorialPost");
        if (!response.ok) {
          throw new Error("Failed to fetch tutorial posts");
        }
        const data : TutorialCardInformation[] = await response.json();
        setTutorialPosts(data);
      } catch (err : any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTutorialPosts();
  }, []);

  return(
    <div>

      {tutorialPosts.map((info) => (
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