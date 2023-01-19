import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import DropdownLang from "./DropdownLang";
import languages from "./languages.json";

const Highscores = ({
  lang,
  setLang,
  open,
  setOpen,
  selectedValue2,
  setSelectedValue2,
  options2,
}) => {
  const scores = useLoaderData().pokemons;
  const picURL = `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;
  const options = languages;

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  return (
    <div className="flex-two">
      <div className="fightdiv">
        <h1 className="choose">Highscores</h1>
        <div className="wrapper">
          <Link to={`/`}>
            <button className="pic">Back to all Pokemons</button>
          </Link>
          <DropdownLang
            placeHolder="Language"
            options2={options}
            setLang={setLang}
            selectedValue2={selectedValue2}
            setSelectedValue2={setSelectedValue2}
            lang={lang}
          />
        </div>
        <div className="distanceDiv" />

        <ul className="uL">
          {scores?.map((pokemon, index) => (
            <li key={index}>
              <Link
                className={`pokemonsDisplayHigh sizeHigh ${pokemon.type[0]} toHover`}
                key={index}
                to={`/pokemon/${pokemon._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className={`${pokemon.type[1] + "Half"}`}>
                  <h3 className="highScoreh3 toHover">
                    {index + 1}.
                    <img
                      className="size2"
                      src={picURL + pokemon.id + ".png"}
                      alt={pokemon?.name[lang]}
                    />
                    {pokemon.name[lang]} has {pokemon.win ? pokemon.win : 0}{" "}
                    wins!
                  </h3>
                </div>
              </Link>
              <div className="distanceDiv" />
            </li>
          ))}
        </ul>
        <Link to={`/`}>
          <button className="pic">Back to all Pokemons</button>
        </Link>
      </div>
    </div>
  );
};

export default Highscores;
