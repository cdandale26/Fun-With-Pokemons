import "./App.css";
import FavoritePokemons from "./FavoritePokemons";
import PokemonList from "./PokemonList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="favoritePokemons" element={<FavoritePokemons />} />
      </Routes>
    </Router>
  );
}

export default App;
