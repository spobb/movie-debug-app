import storageService from "./storage.service";
import { type Movie } from "../types/movie.type";

export function addFavorite(movie: Movie) {
    const favorites = storageService.get<Movie[]>('favorites') ?? [];
    // worked with just IDs but not with the Movie object, probably because of the way the includes function is implemented
    if (favorites.includes(movie)) return;
    favorites.push(movie);

    storageService.set<Movie[]>('favorites', favorites);
}