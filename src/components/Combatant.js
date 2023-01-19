const Combatant = ({ pokemon, pic, stats, lang, type }) => {
  let keys = [];
  console.log(type);
  return (
    <div>
      {stats ? (
        <div className={`pokemonsDisplay ${pokemon.type[0]}`}>
          <div className={`${pokemon.type[1] + "Half"}`}>
            <h1>Names:</h1>
            {
              ((keys = Object.keys(pokemon.name)),
              keys.map((element, index) => (
                <p key={index}>
                  {element.charAt(0).toUpperCase() + element.slice(1)}:{" "}
                  {pokemon.name[element]}
                </p>
              )))
            }
            <img className="size" src={pic} alt={pokemon?.name.english} />
            <h2>Wins: {pokemon.win ? <>{pokemon.win}</> : 0}</h2>
            <h2>Base:</h2>
            {
              ((keys = Object.keys(pokemon.base)),
              keys.map((element, index) => (
                <p key={index}>
                  {element.charAt(0).toUpperCase() + element.slice(1)}:{" "}
                  {pokemon.base[element]}
                </p>
              )))
            }
            <div>
              <h2>Type:</h2>
              {pokemon?.type.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={`pokemonsDisplay ${pokemon.type[0]}`}>
          <div className={`${pokemon.type[1] + "Half"}`}>
            <h1>Name: {pokemon?.name[lang]}</h1>
            <img className="size" src={pic} alt={pokemon?.name.english} />
            <h2>Wins: {pokemon.win ? <>{pokemon.win}</> : 0}</h2>
            <h2>Attack: {pokemon?.base.Attack}</h2>
            <h2>HP: {pokemon?.base.HP}</h2>
            <h2>Defense: {pokemon?.base.Defense}</h2>
            <div>
              <h2>Type:</h2>
              {pokemon?.type.map((item, index) => (
                <h2 key={index}>{item}</h2>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Combatant;
