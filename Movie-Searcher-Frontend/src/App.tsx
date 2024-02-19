import "./App.scss"
import logo from "./popcorn.svg"
import MovieSearcher from "./features/movieSearcher/MovieSearcher"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo"/>
        <h1>Movie Searcher</h1>
      </header>
      <div className="App-body">
        <MovieSearcher />
      </div>
      <div className="App-footer">
      </div>
    </div>
  )
}

export default App
