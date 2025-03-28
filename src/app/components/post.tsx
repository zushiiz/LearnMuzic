"use client";

import {useEffect, useState} from "react";
import { TutorialPost } from "../lib/dbTypes";
import Logout from "./userManagement/logout";

export default function Post(){

  const [tutorialPosts, setTutorialPosts] = useState<TutorialPost[]>([]); //Holds the fetched data, it is set to a array holding TutoriaPost Interface
  const [loading, setLoading] = useState<boolean>(true); // Keeps track when data is loaded or not
  const [error, setError] = useState<string | null>(null); // Holds error message incase fetch fails

  useEffect(() => { // Makes sure this runs before UI loades to prevent asynchronized loading
    const fetchTutorialPosts = async () => {
      try {
        const response = await fetch('/api/tutorialPost');
        if (!response.ok) {
          throw new Error('Failed to fetch tutorial posts');
        }
        const data: TutorialPost[] = await response.json();
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
      <ul>
        {tutorialPosts.map((post) => (
          <li key={post.tutorialPostId}>
            Song ID: {post.songId}, Tutorial ID: {post.tutorialId}
          </li>
        ))}

        <Logout/>
      </ul>
    </div>
  );

}