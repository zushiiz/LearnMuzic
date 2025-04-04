import VideoPlayer from "../videoEmbedPlayer";

interface TutorialProps {
  videoEmbed : string,
  author : string,
  instrument : string,
  difficulty : string | null
}

export default function tutorialDisplay({ videoEmbed, author, instrument, difficulty } : TutorialProps ){
  return (
    <div>

      <ul>
        <li>{author}</li>
        <li>{instrument}</li>
        <li>{difficulty}</li>
      </ul>

      <VideoPlayer videoEmbedId={videoEmbed}/>

    </div>
  );
}