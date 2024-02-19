import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../app/createAppSlice"
import type { AppThunk } from "../../../app/store"
import { fetchMovieList, fetchMovie } from "./movieAPI"

export interface MovieSliceState {
    movieList: []
    movie: any | undefined
  }
  
  const initialState: MovieSliceState = {
    movieList: [],
    movie: undefined
  }
  
  export const MovieSlice = createAppSlice({
    name: "Movie",
    initialState,
    reducers: create => ({
        changeMovieListAsync: create.asyncThunk(
            async (searchString: string) => {
              const response = await fetchMovieList(searchString);
              return response.data
            },
            {
              fulfilled: (state, action) => {
                state.movieList = action.payload
              },
            },
          ),
          clearMovieList:  create.reducer( state => {
            state.movieList = [];
          }),
          changeMovieAsync: create.asyncThunk(
            async (imdbID: string) => {
              const response = await fetchMovie(imdbID);
              return response.data
            },
            {
              fulfilled: (state, action) => {
                state.movie = action.payload
              },
            },
          ),
          clearMovie:  create.reducer( state => {
            state.movie = undefined;
          }),
    }),
    selectors: {
      selectMovieList: e => e.movieList,
      selectMovie: e => e.movie,
    },
  })
  
  export const { changeMovieListAsync, changeMovieAsync, clearMovieList, clearMovie } = MovieSlice.actions
  
  export const { selectMovieList, selectMovie } = MovieSlice.selectors