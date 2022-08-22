import { useState, useEffect } from "react";
import axios from "axios";
import "./PokemonList.css";
import { useNavigate } from "react-router-dom";

//function to get pokemons from the listed url
const fetchPokemons = async (url) => {
  try {
    const pokemon = await axios.get(url);
    const pokemonData = pokemon.data.results;
    return pokemonData;
  } catch (error) {
    console.log(error);
  }
};

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const navigate = useNavigate();

  const selectPokemon = (rowValue) => {
    let pokemon = rowValue;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: pokemon }),
    }).then((res) => console.logl("Request sent...."));
  };

  useEffect(() => {
    fetchPokemons("http://localhost:3001/").then((result) =>
      setPokemon(result)
    );
  }, []);

  return (
    <>
      <h1>Welcome to the world of Pokemon!!</h1>
      <h3>List of all the pokemons with their powers</h3>
      <button id="favButton" onClick={() => navigate("/favoritePokemons")}>
        Checkout your favorite Pokemons
      </button>
      <div className="app-container">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Image</td>
              <td>Types</td>
              <td>Pokemon to DB</td>
            </tr>
          </thead>
          <tbody>
            {pokemon.map((poke, id) => (
              <tr key={id}>
                <td>{poke.name}</td>
                <td>
                  <img src={poke.image_url} alt="pokemons" />
                </td>
                <td>[{poke.types}]</td>

                <td>
                  <button onClick={() => selectPokemon(poke)}>
                    Add me to your Favorites!!
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PokemonList;
