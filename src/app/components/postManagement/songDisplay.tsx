interface SongProps {
  imagePath : string,
  title : string,
  artistId : number,
  genre : string,
  releaseYear : number
}

export default function songDisplay({ imagePath, title, artistId, genre, releaseYear } : SongProps ){
  return (
    <div>

      <ul>
        <li>{imagePath}</li>
        <li>{title}</li>
        <li>{artistId}</li>
        <li>{genre}</li>
        <li>{releaseYear}</li>
      </ul>

    </div>
  );
}