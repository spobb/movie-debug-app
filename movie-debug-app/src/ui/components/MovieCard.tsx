import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Link as MuiLink, Grid } from '@mui/material';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
};

export function MovieCard({ movie }: { movie: Movie }) {
    const imageUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;

    return (
        <Grid size={{ xs: 6, md: 4, lg: 3 }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    sx={{
                        height: 350,
                        objectFit: 'cover',
                    }}
                    image={imageUrl}
                    alt={movie.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ mb: 1 }}
                        // only throws error in vscode ?
                        noWrap='true'
                    >
                        <MuiLink component={Link} to={`/movie/${movie.id}`} color="inherit" underline="hover">
                            {movie.title}
                        </MuiLink>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Note: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}