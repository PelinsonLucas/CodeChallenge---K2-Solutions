import React, { useEffect, useState } from 'react';
import './Movie.scss';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectMovie } from './movieSlice';

const Movie = () => {
    const movie = useAppSelector(selectMovie);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        if (movie===undefined) return;
        var favoriteList = localStorage.getItem('favorites');
        if(favoriteList!==null && favoriteList.length !== 0){
            var favoriteArray = JSON.parse(favoriteList);
            if (favoriteArray.includes(movie.imdbID)){
                setFavorite(true);
                return;
            }
        }
        setFavorite(false);
    }, [movie]);

    const favoriteMovie = () => {
        if (movie===undefined) return;
        var favoriteList = localStorage.getItem('favorites');
        var favoriteArray = [];
        if(favoriteList!==null && favoriteList.length !== 0){
            favoriteArray = JSON.parse(favoriteList);
            if (favoriteArray.includes(movie.imdbID)){
                favoriteArray = favoriteArray.filter((e: any) => {return (e !== movie.imdbID)});
                localStorage.removeItem('favorites');
                localStorage.setItem('favorites', JSON.stringify(favoriteArray));
                setFavorite(false);
                return;
            }
        }
        favoriteArray.push(movie.imdbID);
        localStorage.setItem('favorites', JSON.stringify(favoriteArray));
        setFavorite(true);
    };

  if (movie !== undefined) {
    return (
    <div className='movieContent'>
        <div className='movieContent-Info'>
            <h3>{movie.Title}</h3>
            <p>{movie.Plot}</p>
            <div className="movieContent-Actors">
                <h4>Actors</h4>
                <p>{movie.Actors}</p>
            </div>
            <div className="movieContent-Review">
                <h4>Review</h4> 
                <p style={{backgroundImage: `linear-gradient(90deg, #ff643d 
                    ${movie.imdbRating * 10}%, #bbbac0 ${movie.imdbRating * 10}%)`, 
                    backgroundClip: "text", 
                    width: "fit-content",
                    height: "fit-content",
                    color: "transparent",
                    fontSize: "2em"}} >★★★★★</p>
            </div>
            <div className={`movieContent-Favorite ${favorite===true ? "fav" : ""}`}>
                <button onClick={favoriteMovie}>Favorite🤍</button>
            </div>
        </div>
        <div className='movieContent-Poster'>
            <img src={movie.Poster} alt='Movie Poster'/>
        </div>
    </div>
    )}

    return (
        <div className='noMovieContent'>
            <h3>No Movie Selected</h3>
            <p>Select a movie from the list to see its details.</p>
        </div>
    )
}

export default Movie