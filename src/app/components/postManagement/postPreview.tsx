import { Tutorial, TutorialCardInformation } from "../../lib/dbTypes"

export default function Card({ songTitle, imagePath, songArtist, releaseYear, videoAuthor, instrument, difficulty } : TutorialCardInformation){
  return (
  <ul className="border">
    <li>{songTitle}</li>
    <li>{imagePath}</li>
    <li>{songArtist}</li>
    <li>{releaseYear}</li>
    <li>{videoAuthor}</li>
    <li>{instrument}</li>
    <li>{difficulty}</li>
  </ul>
  );
}