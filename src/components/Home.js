import React, { useEffect, useState, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Pagination from "./Pagination";
import "../App.css";
import Dropdown from "./Dropdown";
import DropdownLang from "./DropdownLang";
import Pokecard from "./Pokecard";
import optionsImp from "./options.json";
import languagesImp from "./languages.json";

const Home = ({
  getRandom,
  setLang,
  lang,
  setOpen,
  selectedValue2,
  setSelectedValue2,
}) => {
  const [searchedPokemons, setSearchedPokemons] = useState([]);
  const [input, setInput] = useState("");
  const options = optionsImp;
  const languages = languagesImp;
  const [selectedValue, setSelectedValue] = useState(options[0].value);

  let pic = null;
  const pokemonsFetch = useLoaderData().pokemons;
  const [pokemons, setPokemons] = useState(pokemonsFetch);

  // const picURL = `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;

  const typeFilter = (selectedType) => {
    const result = pokemonsFetch.filter((element) =>
      Object.values(element.type).find((ele) => ele.includes(selectedType))
    );
    setPokemons(result);
    console.log(selectedType, result);
  };

  // useEffect(() => {
  //   if (selectedValue.value == "None") {
  //     typeFilter();
  //   }
  //   console.log("res2", pokemons);
  // }, [selectedValue]);

  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(18);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles =
    searchedPokemons.length > 0
      ? searchedPokemons.slice(indexOfFirstArticle, indexOfLastArticle)
      : pokemons.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const findPokemon = () => {
    if (input) {
      const result = input
        ? [
            pokemons.filter(
              (poke) =>
                poke.name[lang].toLowerCase().includes(input.toLowerCase()),
              // console.log(
              //   Object.values(poke.type).filter((ele) =>
              //     ele.toLowerCase().includes(input.toLowerCase())
              //   )
              // )

              // .toLowerCase()
              // .includes(input.toLowerCase())
              //  filter((element) =>
              //    element.toLowerCase().includes(input.toLowerCase())
              // ),
              pokemons.filter((poke) =>
                Object.values(poke.type).find((element) =>
                  element.toLowerCase().includes(input.toLowerCase())
                )
              )
            ),
          ]
        : // )
          [];
      setSearchedPokemons(result[0]);
      console.log(result);
    }
  };

  let rando = pokemonsFetch[getRandom(1, pokemonsFetch.length)]._id;

  useEffect(() => {
    findPokemon();
  }, [input]);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <h1 className="choose">Choose your Fighter!</h1>
      <div className="choose">
        <div className="wrapper">
          <div className="wrapper">
            <input
              className="search-input"
              type="text"
              size="18"
              placeholder="Search"
              onChange={changeHandler}
              value={input}
            />
            <img
              className={input != "" ? "clear-icon" : "clear-icon hidden"}
              onClick={() => (setInput(""), setSearchedPokemons([]))}
              src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjk3NiA1MS45NzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjk3NiA1MS45NzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8cGF0aCBkPSJNNDQuMzczLDcuNjAzYy0xMC4xMzctMTAuMTM3LTI2LjYzMi0xMC4xMzgtMzYuNzcsMGMtMTAuMTM4LDEwLjEzOC0xMC4xMzcsMjYuNjMyLDAsMzYuNzdzMjYuNjMyLDEwLjEzOCwzNi43NywwICAgQzU0LjUxLDM0LjIzNSw1NC41MSwxNy43NCw0NC4zNzMsNy42MDN6IE0zNi4yNDEsMzYuMjQxYy0wLjc4MSwwLjc4MS0yLjA0NywwLjc4MS0yLjgyOCwwbC03LjQyNS03LjQyNWwtNy43NzgsNy43NzggICBjLTAuNzgxLDAuNzgxLTIuMDQ3LDAuNzgxLTIuODI4LDBjLTAuNzgxLTAuNzgxLTAuNzgxLTIuMDQ3LDAtMi44MjhsNy43NzgtNy43NzhsLTcuNDI1LTcuNDI1Yy0wLjc4MS0wLjc4MS0wLjc4MS0yLjA0OCwwLTIuODI4ICAgYzAuNzgxLTAuNzgxLDIuMDQ3LTAuNzgxLDIuODI4LDBsNy40MjUsNy40MjVsNy4wNzEtNy4wNzFjMC43ODEtMC43ODEsMi4wNDctMC43ODEsMi44MjgsMGMwLjc4MSwwLjc4MSwwLjc4MSwyLjA0NywwLDIuODI4ICAgbC03LjA3MSw3LjA3MWw3LjQyNSw3LjQyNUMzNy4wMjIsMzQuMTk0LDM3LjAyMiwzNS40NiwzNi4yNDEsMzYuMjQxeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
            />
          </div>
          <Dropdown
            placeHolder="Type"
            options={options}
            setSelectedValue={setSelectedValue}
            selectedValue={selectedValue}
            typeFilter={typeFilter}
          />
          <DropdownLang
            placeHolder="Language"
            options2={languages}
            setLang={setLang}
            selectedValue2={selectedValue2}
            setSelectedValue2={setSelectedValue2}
            lang={lang}
          />
        </div>
        <div className="wrapper">
          <Link to={`/pokemon/${rando}`} style={{ textDecoration: "none" }}>
            <button className="pic">Random Pokemon</button>
          </Link>

          <Link to={`/pokemon/highscores`} style={{ textDecoration: "none" }}>
            <button className="pic">Highscores</button>
          </Link>
        </div>
      </div>

      <Pokecard
        lang={lang}
        pokemons={currentArticles}
        selectedValue={selectedValue}
      />

      {/* 
      {input !== "" ? (
        <Pokecard
          lang={lang}
          pokemons={searchedPokemons}
          selectedValue={selectedValue}
        />
      ) : (
        <Pokecard
          lang={lang}
          pokemons={currentArticles}
          selectedValue={selectedValue}
        />
      )} */}
      {/* </div>
      </div> */}
      <div className="pagination">
        <Pagination
          /*         nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} */
          articlesPerPage={articlesPerPage}
          totalArticles={
            searchedPokemons.length > 0
              ? searchedPokemons.length
              : pokemons.length
          }
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Home;
