import React from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Button from '@mui/material/Button';
import PauseIcon from '@mui/icons-material/Pause';

function Song(props) {

    function convertMillisecondsToSeconds(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    const buttonStyle = {
        borderRadius: '50%',
        width: 60,
        height: 60,
        padding: 0,
        minWidth: 0,
        color: "black"
    };

    return (
        <div className="song-details">
            <h1 className="song-title" style={{ fontSize: props.name.length > 30 ? "32px" : "45px" }}>{props.name}</h1>
            <h3 className="singer">{props.artist}</h3>
            <div className="song-duration">
                <div className="song-time">
                    <p className="start-time">00:00</p>
                    <p className="end-time">{convertMillisecondsToSeconds(props.duration)}</p>
                </div>
                <div className="song-timeline">
                    <div className="song-line"></div>
                    <div className="song-current"></div>
                </div>
            </div>
            <div className="play-song">
                <Button className="prev-song" sx={buttonStyle} onClick={props.onPrevious} children={<SkipPreviousIcon style={{ fontSize: '45px' }} />} />
                <Button
                    className="play-pause"
                    sx={{ ...buttonStyle, width: 100, height: 100 }}
                    onClick={props.isPlaying ? props.onPause : props.onPlay} 
                    disabled={!props.hasAudio} 
                    children={props.isPlaying ? <PauseIcon style={{ fontSize: '90px' }} /> : <PlayArrowIcon style={{ fontSize: '90px' }} />}
                />
                <Button className="next-song" sx={buttonStyle} onClick={props.onNext} children={<SkipNextIcon style={{ fontSize: '45px' }} />} />
            </div>

            <audio ref={props.audioRef} />
            {!props.hasAudio && <p>No audio available for this track.</p>} 
        </div>
    );
}

export default Song;
