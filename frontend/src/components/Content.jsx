import React, { useState, useEffect } from "react";
import Player from "./Player";
import Lyrics from "./Lyrics";
import axios from "axios";

function Content(props) {
    const [songIndex, setSongIndex] = useState(0); 
    const [lyrics, setLyrics] = useState("Loading lyrics...");
    const [isPlaying, setIsPlaying] = useState(false); 
    const [hasAudio, setHasAudio] = useState(false); 

    useEffect(() => {
        setSongIndex(0); 
        setIsPlaying(false); 
    }, [props.tracks]);

    useEffect(() => {
        if (props.tracks && props.tracks.length > 0 && props.audioRef.current) {
            const selectedSong = props.tracks[songIndex];

            if (selectedSong) {
                if (props.audioRef.current) {
                    props.audioRef.current.pause();
                    props.audioRef.current.currentTime = 0; 
                }

                if (selectedSong.trackCover) {
                    document.body.style.backgroundImage = `url(${selectedSong.trackCover})`;
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundPosition = 'center';
                }
                const fetchLyrics = async () => {
                    try {
                        const response = await axios.get(
                            `https://api.lyrics.ovh/v1/${encodeURIComponent(
                                selectedSong.artist
                            )}/${encodeURIComponent(selectedSong.name)}`
                        );
                        setLyrics(response.data.lyrics);
                    } catch (error) {
                        console.error("Error fetching lyrics:", error);
                        setLyrics("Lyrics not found");
                    }
                };
                fetchLyrics();

                if (selectedSong.audio) {
                    props.audioRef.current.src = selectedSong.audio;
                    setHasAudio(true);

                    props.audioRef.current.oncanplay = () => {
                        if (isPlaying) {
                            props.audioRef.current.play().catch((error) => {
                                console.error("Error playing audio:", error);
                            });
                        }
                    };
                } else {
                    console.warn("No valid audio.");
                    props.audioRef.current.src = ""; 
                    setHasAudio(false);
                }
            }
        }
    }, [props.tracks, songIndex, isPlaying, props.audioRef]);

    const handlePlay = () => {
        if (props.audioRef.current && hasAudio) {
            props.audioRef.current.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
            setIsPlaying(true);
        } else {
            console.warn("No valid audio to play");
        }
    };

    const handlePause = () => {
        if (props.audioRef.current) {
            props.audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleNext = () => {
        if (props.audioRef.current) {
            props.audioRef.current.pause();
            props.audioRef.current.currentTime = 0; 
        }
        setSongIndex((prevIndex) => (prevIndex + 1) % props.tracks.length);
    };

    const handlePrevious = () => {
        if (props.audioRef.current) {
            props.audioRef.current.pause();
            props.audioRef.current.currentTime = 0; 
        }
        setSongIndex((prevIndex) => (prevIndex - 1 + props.tracks.length) % props.tracks.length);
    };

    if (!props.tracks || props.tracks.length === 0) {
        return <div>Loading...</div>;
    }

    const currentSong = props.tracks[songIndex];

    return (
        <div className="content">
            <Lyrics lyrics={lyrics} />
            <Player
                song={currentSong}
                onPlay={handlePlay}
                onPause={handlePause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isPlaying={isPlaying}
                hasAudio={hasAudio} 
                audioRef={props.audioRef}
            />
        </div>
    );
}

export default Content;
