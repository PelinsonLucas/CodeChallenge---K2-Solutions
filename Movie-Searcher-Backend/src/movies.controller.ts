import { Controller, Get, Param, Search } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('/Movies')
export class MoviesController {
  constructor(private readonly MoviesService: MoviesService) {}

  @Get('/search/:searchQuery')
  async findAll(@Param('searchQuery') searchQuery: string): Promise<string> {
    var movieList =  await this.MoviesService.getMovieList(searchQuery);
    return JSON.stringify(movieList);
  }
  @Get(':imdbID')
  async findByID(@Param('imdbID') imdbID: string): Promise<string> {
    var movie =  await this.MoviesService.getMovie(imdbID);
    return JSON.stringify(movie);
  }
}
