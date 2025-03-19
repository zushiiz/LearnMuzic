declare global {
  interface Window {
    YT: {
      Player: any;  // We can use 'any' here since the YouTube API doesn't have type definitions
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export {};