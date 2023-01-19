import React from "react";
import { Link } from "react-router-dom";

const Pokecard = ({ pokemons, lang, selectedValue }) => {
  const picURL = `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;

  return (
    <div className="flex">
      <div className="pokedex">
        {pokemons?.map((pokemon, index) => (
          <Link
            key={index}
            to={`/pokemon/${pokemon._id}`}
            style={{ textDecoration: "none" }}
            className={`toHover ${pokemon.type[0]} pokemonsDisplay2 cardPad`}
          >
            <div className={`${pokemon.type[1] + "half"} `}>
              <h1 className="">
                {pokemon.name[lang]}
                <img
                  className="size"
                  src={picURL + pokemon.id + ".png"}
                  alt={pokemon?.name.english}
                />
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Pokecard;
