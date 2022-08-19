import { useState, useEffect } from "react";
import axios from "axios";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=30").then((response) => {
      const pokemonArray = response.data.results;
      for (let i = 0; i < pokemonArray.length; i++) {
        axios
          .get(pokemonArray[i].url)
          .then((result) => {
            let name = result.data.forms[0].name;
            let image = result.data.sprites.front_default;
            let pokeType = [];
            result.data.types.forEach((element) =>
              pokeType.push(" " + element.type.name + " ")
            );
            let pokeInfo = { name: name, types: pokeType, image_url: image };
            //console.log(`I am printing at ${i}`, pokeInfo);
            return pokeInfo;
          })
          .then((result) => setPokemon((pokemon) => [...pokemon, result]));
      }
    });
  }, []);

  const selectPokemon = (rowValue) => {
    console.log("Row Data", rowValue);
  };

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
