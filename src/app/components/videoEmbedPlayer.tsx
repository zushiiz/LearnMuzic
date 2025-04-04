interface VideoProps{
  videoEmbedId? : string,
}

export default function VideoPlayer({videoEmbedId} : VideoProps){
  return(
    <iframe 
      width="560" 
      height="315" 
      src={`https://www.youtube.com/embed/${videoEmbedId}`}
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerPolicy="strict-origin-when-cross-origin" 
      allowFullScreen>
    </iframe>
  );
}