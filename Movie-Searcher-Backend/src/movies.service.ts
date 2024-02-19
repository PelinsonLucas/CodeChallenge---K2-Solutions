import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { movieListDTO, movieDTO } from './movie.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MoviesService {
  async getMovieList(searchQuery: string): Promise<movieListDTO> {
    const response = await axios.get(`http://www.omdbapi.com/?s=${searchQuery}&apikey=8cc427d4`);
    var movies = plainToInstance(movieListDTO, response.data.Search, { excludeExtraneousValues: true });
    return movies;
  }

  async getMovie(imdbID: string): Promise<movieDTO> {
    const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=8cc427d4`);
    var movies = plainToInstance(movieDTO, response.data, { excludeExtraneousValues: true });
    return movies;
  }
}
