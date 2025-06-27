import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CircularProgress, Container, Alert, Box, Typography, Link as MuiLink, CardMedia, Button } from "@mui/material";

import { addFavorite } from "../services/favorite.service";
import storageService from "../services/storage.service";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    tagline: string;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
};

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFavorited, setIsFavorited] = useState<boolean>(false);

    const handleClick = () => {
        addFavorite(movie!);
        setIsFavorited(true);
    }

    useEffect(() => {
        if (!id) {
            setError("ID du film manquant.");
            setLoading(false);
            return;
        }

        const fetchMovie = async () => {
            try {
                const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.status_message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setMovie(data);
            } catch (err) {
                setError('Erreur lors du chargement des détails du film: ' + (err as Error).message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        // brute forced it
        const getFavorited = () => {
            const favorites = storageService.get<Movie[]>('favorites');

        }

        getFavorited();
        fetchMovie();
    }, [id]);

    if (loading) return <CircularProgress sx={{ mt: 4 }} />;
    if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
    if (!movie) return <Alert severity="info" sx={{ mt: 4 }}>Film non trouvé.</Alert>;

    return (
        <Container sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0, objectFit: 'cover' }}
                    image={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                />
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {movie.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {movie.tagline}
                    </Typography>
                    <Typography variant="body1" component='p'>
                        {movie.overview}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Date de sortie : {movie.release_date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Note moyenne : {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} ({movie.vote_count} votes)
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={handleClick}
                        disabled={isFavorited}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {isFavorited ? 'Favori' : 'Ajouter aux Favoris'}
                        </Typography>
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mt: 4 }}>
                <MuiLink component={Link} to="/" color="primary" underline="hover">
                    Retour à l'accueil
                </MuiLink>
            </Box>
        </Container >
    );
}