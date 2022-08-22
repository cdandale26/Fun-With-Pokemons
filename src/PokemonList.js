import { useState, useEffect } from "react";
import axios from "axios";
import "./PokemonList.css";

const fetchPokemons = async () => {
  try {
    const pokemon = await axios.get("http://localhost:3001/");
    const pokemonData = pokemon.data.results;
    return pokemonData;
  } catch (error) {
    console.log(error);
  }
};

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  //const [favoritePokemon, setFavoritePokemon] = useState({});

  const selectPokemon = (rowValue) => {
    let pokemon = rowValue;
    //console.log(pokemon);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: pokemon }),
    }).then((res) => console.log("Request sent...."));
  };

  useEffect(() => {
    fetchPokemons().then((result) => setPokemon(result));
  }, []);

  return (
    <>
      <h1>List of Pokemons with their powers</h1>
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
