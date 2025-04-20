"use client"
import Card from "../../components/postManagement/postPreview";
import { useEffect, useState } from "react";
import { TutorialCardInformation } from "../../lib/dbTypes";
import { httpErrors } from "../../lib/httpErrors";

interface FilteredPostsProps {
  params : Promise<{
    genreId : string
  }>
}

export default function filteredPosts( {params} : FilteredPostsProps ){

  const [tutorialPosts, setTutorialPosts] = useState<TutorialCardInformation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTutorialPosts = async () => {
      try {
        const genreId = (await params).genreId;
        const response = await fetch(`/api/filteredTutorialPost?genreId=${genreId}`);
        const data = await response.json();
        setTutorialPosts(data);
      } catch (err) {
        return httpErrors.internalServerError;
      }
    }
    fetchTutorialPosts();
  }, []);

  return (

    <div>
      
    </div>

  );
}