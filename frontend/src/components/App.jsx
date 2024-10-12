import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Nav from "./Nav";
import Content from "./Content";

function App() {
    const [tracks, setTracks] = useState([]); 
    const [genre, setGenre] = useState("all"); 
    const audioRef = useRef(null); 

    const handleGenreChange = (newGenre) => {
        if (audioRef.current) {
            audioRef.current.pause(); 
        }
        setGenre(newGenre); 
    };

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const url = genre === "all" ? "http://localhost:3001/" : `http://localhost:3001/genre/${genre}`;
                const response = await axios.get(url);
                setTracks(response.data); 
            } catch (error) {
                console.error("Error fetching tracks: ", error);
            }
        };

        fetchTracks(); 
    }, [genre]);

    return (
        <div className="app">
            <Nav onGenreChange={handleGenreChange} selectedGenre={genre} />
            <Content tracks={tracks} audioRef={audioRef} /> 
        </div>
    );
}

export default App;
