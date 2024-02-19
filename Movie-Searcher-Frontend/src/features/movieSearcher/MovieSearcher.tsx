import React, { useState } from 'react'
import './MovieSearcher.scss'
import Movie from './movie/Movie'
import { changeMovieListAsync, selectMovieList, clearMovieList, changeMovieAsync, clearMovie } from './movie/movieSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { List, StandardListItem, Button, Input } from '@ui5/webcomponents-react'

const MovieSearcher = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const dispatch = useAppDispatch()
    const movieList = useAppSelector(selectMovieList);

    const getMovieListEnter = (e : any) => {
        if (e!==undefined) {
            if (e.key !== "Enter")
                return;
        }
        if (searchQuery) {
            dispatch(changeMovieListAsync(searchQuery));
        } else {
            clearList();
        }
    };
    const getMovieList = () => {
        if (searchQuery) {
            dispatch(changeMovieListAsync(searchQuery));
        } else {
            clearList();
        }
    };

    const clearList = () => {
        dispatch(clearMovieList());
    };

    const clearSelectedMovie = () => {
        dispatch(clearMovie());
    };

    const selectMovie = (imdbID : string, movieName : string) => {
        setSearchQuery(movieName);
        clearList();
        dispatch(changeMovieAsync(imdbID));
        console.log(imdbID);
    };

    const resetSearch = () => {
        setSearchQuery("");
        clearList();
        clearSelectedMovie();
    };

  return (
    <div className='movieSearcher'>
        <div className='movieSearcher-Header'>
            <h2>Movie Search</h2>
            <p>Type a movie name to search for it.</p>
            <div className="searchBar">
                <Input className='input' onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={e => getMovieListEnter(e)} value={searchQuery} type="Text" placeholder="Search for a movie" />
                <Button className='button' onClick={getMovieList}>Search</Button>
                <Button className='button' onClick={resetSearch}>Reset</Button>
            </div>
            {
                movieList !== undefined && movieList.length > 0 ? 
                <List className='movieSearcher-List'
                growing="None"
                mode="None"
                onItemClick={(e) => selectMovie(e.detail.item.accessKey as string, e.detail.item.innerText as string)}
                separators="All"
                >
                {
                    movieList!==undefined ? 
                    movieList.map((movie: any) => {
                        return <StandardListItem key={movie.imdbID} accessKey={movie.imdbID}>{movie.Title}</StandardListItem>
                    })
                    : <p style={{display: "none"}}/>
                }
            </List> : <p/>
            }
        </div>
        <div className='movieSearcher-Body'>
            <div className='movieSearcher-Result'>
                <Movie/>
            </div>
        </div>
    </div>
  )
}

export default MovieSearcher