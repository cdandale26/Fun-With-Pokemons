const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const pokemonSchema = require("./schemas/pokemon-schema");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getPokemonList = async () => {
  try {
    const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => response.json())
      .then((data) => data.results);

    const pokemonUrls = pokemon.map((poke) => poke.url);
    const result = await getPokemonFinal(pokemonUrls);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getPokemonFinal = async (pokemonUrl) => {
  let finalPoke = [];
  for (let i = 0; i < pokemonUrl.length; i++) {
    try {
      const pokeData = await fetch(pokemonUrl[i]).then((response) =>
        response.json()
      );
      const result = pokeInfo(pokeData);
      finalPoke.push(result);
    } catch (error) {
      console.log(error);
    }
  }
  return finalPoke;
};

const pokeInfo = (data) => {
  let name = data.forms[0].name;
  let image = data.sprites.front_default;
  let pokeType = [];
  data.types.forEach((element) => pokeType.push(" " + element.type.name + " "));
  let pokes = { name: name, types: pokeType, image_url: image };
  return pokes;
};

const mongoDbConnection = async () => {
  await connectDB().then((mongoose) => {
    try {
      console.log("Connected to MongoDb");
    } catch (error) {
      console.log(error);
    }
  });
};

mongoDbConnection();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const pokemons = await getPokemonList();
  res.status(200).json({ results: pokemons });
});

app.get("/favoritePokemons", (req, res) => {
  pokemonSchema.find({}).then((pokemons) => res.status(200).send(pokemons));
});

app.post("/", async (req, res) => {
  //console.log(req.body.data);
  let query = req.body.data.name;

  pokemonSchema.findOne({
    name: query,
    function(error, pokemon) {
      if (error) {
        console.log(error);
      }
      if (pokemon) {
        console.log("The pokemon is already saved in your favorites");
      }
    },
  });

  try {
    await new pokemonSchema(req.body.data).save(function (error, pokemon) {
      if (error) {
        console.log(error);
      }
      console.log("Added your pokemon to your favorites...");
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`server running on port: ${port}`));
