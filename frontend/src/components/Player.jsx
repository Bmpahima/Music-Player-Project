import React from "react";
import Img from "./Img";
import Song from "./Song";

function Player(props) {
    return (
        <div className="player">
            <Img src={props.song.trackCover} />
            <Song
                name={props.song.name}
                artist={props.song.artist}
                duration={props.song.duration}
                onPlay={props.onPlay}
                onPause={props.onPause}
                onNext={props.onNext}
                onPrevious={props.onPrevious}
                isPlaying={props.isPlaying}
                hasAudio={props.hasAudio} 
                audioRef={props.audioRef}
            />
        </div>
    );
}

export default Player;
