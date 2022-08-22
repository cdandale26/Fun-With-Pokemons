import React, { useState, useEffect } from "react";
import { Card, Image } from "semantic-ui-react";
import axios from "axios";
import "./PokemonList.css";

import { useNavigate } from "react-router-dom";

const CardStyle = {
  border: "0.2rem solid #03506f",
  borderRadius: "2rem",
  padding: "1.5rem",
  margin: " 1rem auto",
  width: "15rem",
  height: "12rem",
  fontSize: "1rem",
};

const fetchPokemons = async (url) => {
  try {
    const pokemon = await axios.get(url);
    const pokemonData = pokemon.data;
    return pokemonData;
  } catch (error) {
    console.log(error);
  }
};

const FavoritePokemons = () => {
  const navigate = useNavigate();
  const [favPokemons, setFavPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons("http://localhost:3001/favoritePokemons").then((result) =>
      setFavPokemons(result)
    );
  }, []);

  return (
    <>
      <h1>List of your all time favorite Pokemons</h1>
      <button id="favButton" onClick={() => navigate("/")}>
        Go back to the Home Page!
      </button>

      {favPokemons.map((poke, id) => {
        return (
          <Card key={id} style={CardStyle}>
            <Image src={poke.image_url} wrapped ui={false} />
            <Card.Content>
              <Card.Header>
                Hi. My name is <b>{poke.name} </b>:D
              </Card.Header>
              <Card.Description>
                I have crazy superpowers like
                <span style={{ color: "hotpink", textDecoration: "italic" }}>
                  {poke.types}
                </span>{" "}
                and many more!!{" "}
              </Card.Description>
            </Card.Content>
          </Card>
        );
      })}
    </>
  );
};

export default FavoritePokemons;
