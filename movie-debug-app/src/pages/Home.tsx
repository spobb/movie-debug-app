import { CircularProgress, Container, Grid, Typography, Alert, Box } from "@mui/material";
import { MovieCard } from "../ui/components/MovieCard";
import { type Movie } from "../types/movie.type";

import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";

import { BASE_URL, API_KEY } from "../config/vars.config";

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const searchTerm = searchParams.get('search');
                let response;
                if (searchTerm) {
                    response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
                } else {
                    response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
                }

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.status_message || `HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const results = data.results;
                setMovies(results);
            } catch (err) {
                setError('Erreur lors du chargement des films: ' + (err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchPopularMovies()
    }, [movies, searchParams]);

    if (loading) return <CircularProgress sx={{ mt: 4 }} />;
    if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Films Populaires
            </Typography>
            <Grid container spacing={4}>
                {Array.from(movies).map((movie, i) => (
                    <MovieCard key={i} movie={movie} />
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    (Placeholder: Pagination)
                </Typography>
            </Box>
        </Container>
    );
}