"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
} from "lucide-react";

export  function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => {
      setDuration(video.duration);
    };
    const handleEnded = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);

    // Improved loading state management
    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handlePlaying = () => {
      setIsLoading(false);
    };

    // Add timeout fallback to ensure loading state is cleared
    const loadingTimeout = setTimeout(() => {
      if (video.readyState >= 3) {
        // HAVE_FUTURE_DATA or higher
        setIsLoading(false);
      }
    }, 3000); // 3 second fallback

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    return () => {
      clearTimeout(loadingTimeout);
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      // Check if video is ready before playing
      if (video.readyState >= 3) {
        video.play();
        setIsPlaying(true);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        video
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      }
    }
  };

  const handleVideoWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only toggle play if the click is not on controls
    const controlsElement = controlsRef.current;
    if (controlsElement && controlsElement.contains(e.target as Node)) {
      return; // Don't toggle play if clicking on controls
    }
    togglePlay();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent event bubbling
    e.preventDefault();
    e.stopPropagation();

    const video = videoRef.current;
    const progressBar = progressRef.current;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleControlsClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent all clicks within controls from bubbling up
    e.preventDefault();
    e.stopPropagation();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = Number.parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const restart = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      video.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="video">
      {/* Video Element */}
      <div
        className="video-wrapper group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={handleVideoWrapperClick}
      >
        <video
          ref={videoRef}
          className="video-element"
          poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-elfOQ7NO4tVLZMhYXV3JcBXIK9gWzd.png"
          preload="metadata"
          playsInline
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          <source
            src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}

        {/* Center Play Button (when paused) */}
        {!isPlaying && !isLoading && (
          <div className="play-button-overlay">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="play-button-main group"
            >
              <Play className="play-button-icon" fill="currentColor" />
              <div className="play-button-glow group-hover:play-button-glow-hover"></div>
            </button>
          </div>
        )}

        {/* Video Controls */}
        <div
          ref={controlsRef}
          className={`controls-overlay ${
            showControls || !isPlaying ? "visible" : "hidden"
          }`}
          onClick={handleControlsClick}
        >
          {/* Progress Bar */}
          <div
            ref={progressRef}
            className="progress-bar group"
            onClick={handleProgressClick}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
          >
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="progress-thumb group-hover:visible"></div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="controls-container">
            <div className="controls-left">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="controls-button"
              >
                {isPlaying ? (
                  <Pause className="controls-icon" />
                ) : (
                  <Play className="controls-icon" />
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  restart();
                }}
                className="controls-button"
              >
                <RotateCcw className="controls-icon-small" />
              </button>

              <div className="volume-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="controls-button"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="controls-icon-small" />
                  ) : (
                    <Volume2 className="controls-icon-small" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="volume-slider"
                />
              </div>

              <div className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="controls-button"
            >
              <Maximize className="controls-icon-small" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
