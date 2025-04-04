import Link from "next/link"
import { Tutorial, TutorialCardInformation } from "../../lib/dbTypes"

export default function Card({ id, songTitle, imagePath, songArtist, releaseYear, videoAuthor, instrument, difficulty } : TutorialCardInformation){
  return (
    <Link href={`/tutorial/${id}`}>
      <ul className="border">
        <li>{songTitle}</li>
        <li>{imagePath}</li>
        <li>{songArtist}</li>
        <li>{releaseYear}</li>
        <li>{videoAuthor}</li>
        <li>{instrument}</li>
        <li>{difficulty}</li>
      </ul>
    </Link>

  );
}