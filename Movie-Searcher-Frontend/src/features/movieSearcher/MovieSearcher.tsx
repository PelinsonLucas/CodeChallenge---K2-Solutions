import React, { useState, useEffect } from 'react'
import './MovieSearcher.scss'
import Movie from './movie/Movie'
import { changeMovieListAsync, selectMovieList, clearMovieList, changeMovieAsync, clearMovie } from './movie/movieSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { List, StandardListItem, Button, Input } from '@ui5/webcomponents-react'

const MovieSearcher = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const dispatch = useAppDispatch()
    const movieList = useAppSelector(selectMovieList);

    useEffect(() => {
        document.addEventListener("click", (e) => {
            if ((e.target as any).className !== "movieSearcher-List" && document.getElementsByClassName("movieSearcher-List")[0] !== undefined) {
                clearList();
            }
        });
    }, []);

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
                <List className='movieSearcher-List' growing="None" separators="All" mode="None" 
                onItemClick={(e) => selectMovie(e.detail.item.accessKey as string, e.detail.item.innerText as string)}>
                    {
                        movieList.map((movie: any) => {
                            return <StandardListItem key={movie.imdbID} accessKey={movie.imdbID}>{movie.Title}</StandardListItem>
                        })
                    }
                </List> : <p style={{display: "none"}}/>
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