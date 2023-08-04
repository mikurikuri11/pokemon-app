import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      // 全てのポケモンのデータを取得する
      const response = await getAllPokemon(initialURL);

      // 各ポケモンの詳細なデータを取得する
      loadPokemon(response.results);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      setLoading(false);
    }
    fetchPokemon();
  }, []);

  const loadPokemon = async(data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  }

  // console.log(pokemonData);

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    await loadPokemon(data.results);
    setLoading(false);
  }

  const handlePrevPage = async () => {
    if(!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    setPrevUrl(data.previous);
    await loadPokemon(data.results);
    setLoading(false);
  }


  return (
    <>
      <Navbar />
      <div className="App">
        {loading ?
        (<h1>Loading...</h1>) :
        (<>
          <div className='pokemonCardContainer'>
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />
            })}
          </div>
          <div className='btn'>
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>)
        }
      </div>
    </>
  );
}

export default App;
