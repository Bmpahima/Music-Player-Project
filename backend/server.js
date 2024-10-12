import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3001;

const getSpotifyAccessToken = async () => {
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            'grant_type=client_credentials',
            {
                headers: {
                    'Authorization': `Basic ${Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
    }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req, res) => {
    const token = await getSpotifyAccessToken();
    if (!token) return res.status(500).send('Error: No access token provided.');

    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                q: 'genre:', 
                type: 'track',
                limit: 15, 
            },
        });

        const data = response.data.tracks ? response.data.tracks.items : [];

        const trackData = data.map(t => ({
            id: t.id,
            name: t.name,
            trackCover: t.album.images[0]?.url || '',
            artist: t.artists.map(artist => artist.name).join(', '),
            duration: t.duration_ms,
            audio: t.preview_url || '',
        }));
        
        res.json(trackData);
    } catch (error) {
        console.error('Error fetching tracks:', error);
        res.status(500).send('Error fetching tracks');
    }
});

app.get('/genre/:genre', async (req, res) => {
    const genre = req.params.genre || 'pop'; 
    const token = await getSpotifyAccessToken();

    if (!token) return res.status(500).send('Error: No access token provided.');

    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                q: `genre:${genre}`, 
                type: 'track',
                limit: 15, 
            },
        });

        const tracks = response.data.tracks.items;
        const trackData = tracks.map(t => ({
            id: t.id,
            name: t.name,
            trackCover: t.album.images[0]?.url || '',
            artist: t.artists.map(artist => artist.name).join(', '),
            duration: t.duration_ms,
            audio: t.preview_url,
        }));
        res.json(trackData);
    } catch (error) {
        console.error('Error fetching tracks:', error);
        res.status(500).send('Error fetching tracks');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
