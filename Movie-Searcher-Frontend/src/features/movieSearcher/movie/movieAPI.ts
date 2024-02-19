import axios from "axios"

export const fetchMovieList = (searchString : string) => {
    var htmlSearchString = encodeURIComponent(searchString.trim());
    return axios.get(`http://localhost:3000/Movies/search/${htmlSearchString}`, 
    {headers: {
        'Access-Control-Allow-Origin': '*'
    }});
  }

export const fetchMovie = (imdbID : string) => {
    var htmlSearchString = encodeURIComponent(imdbID);
    return axios.get(`http://localhost:3000/Movies/${htmlSearchString}`, 
    {headers: {
        'Access-Control-Allow-Origin': '*'
    }});
  }
  