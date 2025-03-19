interface VideoProps{
  videoEmbedId? : string,
}

export default function VideoPlayer({videoEmbedId} : VideoProps){
  return(
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=CYHkd68n9T4n0N-q"
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen>
    </iframe>
  );
}