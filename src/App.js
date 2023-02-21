import "./App.css";
import Error from "./components/Error";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import PokemonInfo from "./components/PokemonInfo";
import Footer from "./components/Footer";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import { useState } from "react";
import Highscores from "./components/Highscores";
import languages from "./components/options.json";

function App() {
  const [lang, setLang] = useState("english");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(languages[0]);

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Home
              getRandom={getRandom}
              setLang={setLang}
              lang={lang}
              setOpen={setOpen}
              open={open}
              selectedValue2={selectedValue2}
              setSelectedValue2={setSelectedValue2}
            />
          }
          loader={async () => {
            const data = await fetch(
              `https://pokemonfight-82p0.onrender.com/pokemons`
            );
            if (data.status === 404) {
              throw new Response("Not Found", { status: 404 });
            }
            return data;
          }}
        />
        <Route
          path="/pokemon/:id"
          element={<Pokemon getRandom={getRandom} lang={lang} />}
          errorElement={<Error error={error} />}
          loader={async ({ params: { id } }) => {
            const data1 = await fetch(
              `https://pokemonfight-82p0.onrender.com/pokemons/${id}`
            )
              .then((data) => data.json())
              .catch((e) => setError(e));
            const data2 = await fetch(
              `https://pokemonfight-82p0.onrender.com/pokemons/rando`
            )
              .then((data) => data.json())
              .catch((e) => setError(e));
            if (data1.status === 404 || data2.status === 404) {
              throw new Response("Not Found", { status: 404 });
            }

            return [data1, data2];
          }}
        />
        <Route
          path="/pokemon/highscores"
          element={
            <Highscores
              setLang={setLang}
              lang={lang}
              setOpen={setOpen}
              open={open}
              selectedValue2={selectedValue2}
              setSelectedValue2={setSelectedValue2}
            />
          }
          errorElement={<Error error={error} />}
          loader={async ({ params: { id } }) => {
            const data = await fetch(
              `https://pokemonfight-82p0.onrender.com/pokemons/highscores`
            )
              .then((data) => data.json())
              .catch((e) => setError(e));

            if (data.status === 404) {
              throw new Response("Not Found", { status: 404 });
            }
            return data;
          }}
        />
        <Route path="*" element={<Error />} />
      </Route>
    )
  );

  return (
    <div className="app">
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
