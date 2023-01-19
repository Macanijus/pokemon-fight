import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import Combatant from "./Combatant";
import "../App.css";
import typeImport from "./type.json";

const Pokemon = ({ getRandom, lang }) => {
  const [fightar, setFightar] = useState([]);
  const [stats, setStats] = useState(false);
  const pokemon1 = useLoaderData()[0].pokemon1;
  const pokemon2 = useLoaderData()[1].pokemon2[0];
  const [refresh, setRefresh] = useState(false);
  const picUrl = `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;
  const type = typeImport;

  const updatePoke = (id) => {
    axios
      .put(`http://localhost:9000/pokemons/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log("Not working because: ", err));
  };

  const fight = () => {
    setFightar([]);
    let hpone = pokemon1.base.HP;
    let hptwo = pokemon2.base.HP;
    let multi1 = 1;
    let multi2 = 1;
    // if (
    //   type[pokemon2.type[0]].weaknesses.contains(
    //     pokemon1.type.map((element) => element)
    //   )
    // ) {
    //   multi1 = 2;
    // }
    // console.log("x");
    // const arr1 = ["q", "a"];
    // const arr2 = ["c"];
    // const arr3 = {
    //   c: ["x", "h", "k", "x"],
    //   d: ["x", "y", "z"],
    // };
    // arr1.some(r=> arr2.includes(r))
    // console.log(
    //   arr1.find(
    //     (element1) => arr2.find((element2) => arr3[element2].includes(element1))
    // arr2.map((element2) => arr3[element2].includes(element1))
    //   )
    // );

    // console.log("y", type[pokemon1.type.some((element) => type[pokemon2.type].weaknesses.include(element)].weaknesses);

    // console.log(
    //   "#2type ",
    //   [pokemon2.type[0]],
    //   " #1map ",
    //   pokemon1.type.map((element) => element)
    // );
    // console.log(
    //   "hhallo ",
    //   type[pokemon2.type[0]].weaknesses.contains(
    //     pokemon1.type.map((element) => element)
    //   )
    // );

    let count = 0;
    while (hpone > 0 && hptwo > 0) {
      if (getRandom(1, 2) == 1) {
        const dmg = Math.abs(
          Math.floor(
            // pokemon1.type.name
            pokemon1.base.Attack * (getRandom(1, 10) / 10 + 1) -
              pokemon2.base.Defense
          )
        );
        hptwo -= dmg;
        setFightar((element) => [
          ...element,
          [
            pokemon1.type,
            `${pokemon1.name[lang]} ${String.fromCharCode(9876)} ${
              pokemon2.name[lang]
            } for ${dmg} dmg`,
          ],
        ]);
      } else {
        const dmg = Math.abs(
          Math.floor(
            pokemon2.base.Attack * (getRandom(1, 10) / 10 + 1) -
              pokemon1.base.Defense
          )
        );
        hpone -= dmg;
        setFightar((element) => [
          ...element,
          [
            pokemon2.type,
            `${pokemon2.name[lang]} ${String.fromCharCode(9876)} ${
              pokemon1.name[lang]
            } for ${dmg} dmg`,
          ],
        ]);
      }
      count++;
    }
    if (hpone < hptwo) {
      setFightar((element) => [
        ...element,
        [
          pokemon2.type,
          `${pokemon2.name[lang]} wins the fight in ${count} rounds!`,
        ],
      ]);
      if (isNaN(pokemon2.win)) {
        pokemon2.win = 1;
      } else {
        pokemon2.win += 1;
      }
      updatePoke(pokemon2._id);
    } else {
      setFightar((element) => [
        ...element,
        [
          pokemon1.type,
          `${pokemon1.name[lang]} wins the fight in ${count} rounds!`,
        ],
      ]);
      if (isNaN(pokemon1.win)) {
        pokemon1.win = 1;
      } else {
        pokemon1.win += 1;
        updatePoke(pokemon1._id);
      }
    }
    console.log(fightar);
  };

  const statsHandler = (e) => {
    e.preventDefault();
    setStats((prev) => !prev);
  };

  return (
    <div className="fightBack">
      <div className="fightdiv">
        <h1 className="fight">FIGHT</h1>

        <div className="versus">
          <Combatant
            pokemon={pokemon1}
            stats={stats}
            pic={picUrl + pokemon1.id + ".png"}
            lang={lang}
            type={pokemon1.type}
          />
          <div className="versustwo">
            <h2>VERSUS </h2>
            <button className="pic" onClick={() => fight()}>
              Fight!
            </button>
            <div className="distanceDiv" />
            {fightar.map((element, index) =>
              index !== fightar.length - 1 ? (
                <>
                  <div key={index} className={`${element[0][0]} divWin`}>
                    <div className={`${element[0][1] + "Half"} divWin`}>
                      <b>
                        <p>{element[1]}</p>
                      </b>
                    </div>
                  </div>
                  <div className="distanceDiv" />
                </>
              ) : (
                <h2 key={index} className={`${element[0][0]} divWin`}>
                  <div className={`${element[0][1] + "Half"} divWin`}>
                    {element[1]}
                  </div>
                </h2>
              )
            )}
          </div>
          <Combatant
            pokemon={pokemon2}
            stats={stats}
            pic={picUrl + pokemon2.id + ".png"}
            lang={lang}
            type={pokemon2.type}
          />
        </div>

        <div>
          {/* <Link > */}
          <button onClick={(e) => statsHandler(e)} className="pic">
            Stats
          </button>
          {/* </Link> */}
          {/* <Link to={`/pokemon/${id}/type`}>
            <button className="pic">Type</button>
          </Link>
          <Link to={`/pokemon/${id}/base`}>
            <button className="pic">Base</button>
          </Link> */}
          <Link to={`/`}>
            <button className="pic">Back to all Pokemons</button>
          </Link>
          <Link to={`/pokemon/${pokemon1._id}`}>
            <button
              /* onClick={() => setRefresh((prev) => !prev)} */ className="pic"
            >
              Get other opponent
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;

{
  /* <div key={index} className="fightline">
                  <b>
                    <p className={`${element[0].toLowerCase()}Color`}>
                      {element[2]}
                    </p>
                    {String.fromCharCode(9876)}
                    <p className={`${element[1].toLowerCase()}Color`}>
                      {element[3]}
                    </p>
                    <p>{element[4]}</p>
                  </b>
                </div> */
}
