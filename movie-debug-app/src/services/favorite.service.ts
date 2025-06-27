import storageService from "./storage.service";
import { type Movie } from "../types/movie.type";

export function addFavorite(movie: Movie) {
    const favorites = storageService.get<Movie[]>('favorites') ?? [];
    if (favorites.includes(movie)) return;
    favorites.push(movie);

    storageService.set<Movie[]>('favorites', favorites);
}