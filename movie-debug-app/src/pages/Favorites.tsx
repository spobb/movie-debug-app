import { Container, Typography, Box, Link as MuiLink, Grid } from "@mui/material";
import { MovieCard } from "../ui/components/MovieCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { type Movie } from "../types/movie.type";
import storageService from "../services/storage.service";

export default function Favorites() {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        setFavorites(storageService.get<Movie[]>('favorites') ?? []);
    }, [])

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Mes Films Favoris
            </Typography>
            <Grid container spacing={4}>
                {Array.from(favorites).map((movie, i) => (
                    <MovieCard key={i} movie={movie} />
                ))}
            </Grid>
            <Box sx={{ mt: 4 }}>
                <MuiLink component={Link} to="/" color="primary" underline="hover">
                    Retour à l'accueil
                </MuiLink>
            </Box>
        </Container>
    );
}
