interface CardProps{
  songTitle : string,
  imagePath : string,
  songArtist : string,
  releaseYear : number,
  videoAuthor : string,
  instrument : string,
  difficulty : string,
}

export default function Card({ songTitle, imagePath, songArtist, releaseYear, videoAuthor, instrument, difficulty } : CardProps){
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