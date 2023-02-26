import type { DetailedHTMLProps, VideoHTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';

interface BackgroundVideoProps
  extends DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {
  placeholder: string;
}

export default function BackgroundVideo({
  playsInline,
  autoPlay,
  loop,
  muted,
  className,
  placeholder,
  src,
  ...props
}: BackgroundVideoProps) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const video = useRef<HTMLVideoElement | null>(null);

  // the video has to explicitly loaded first
  // for the onLoadedData event to be fired
  useEffect(() => {
    video.current?.load();
  }, []);

  return (
    <>
      <video
        ref={video}
        playsInline={playsInline}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        className={className}
        onLoadedData={() => {
          setHasLoaded(true);
        }}
        {...props}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div
        className={`${className} ${placeholder} ${
          hasLoaded ? 'opacity-0' : 'opacity-100'
        } transition-opacity`}
      />
    </>
  );
}
