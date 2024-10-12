import React from "react";

function Lyrics(props){
    return (
        <div className="lyrics-container">
            <p className="song-lyrics">
                {props.lyrics}
            </p>
        </div>
    );
}

export default Lyrics;