import { useEffect, useState } from 'react';
import style from './style.module.css';
import { Link } from 'react-router-dom'; // 👈 You can wrap the card into this

// Possible features:
// - Add more details like stats, base_experience, abilities, etc
// - Make it look like an actual Card
function PokemonCard({ name }) {
  const [artwork, setArtwork] = useState('');
  const [pokemonFirstType, setPokemonFirstType] = useState('');
  const [pokemonSecondType, setPokemonSecondType] = useState('');

  const fetchPokemons = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    // You can handle `null` value of response, like adding a default artwork
    setArtwork(response.sprites.other['official-artwork'].front_default);
    setPokemonFirstType(response.types[0].type.name);

    if (response.types.length > 1) {
      setPokemonSecondType(response.types[1].type.name);
    }
  };

  useEffect(() => {
    // You can just pass the type ID, and let the `fetchPokemons` make the url
    fetchPokemons(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }, [name]);

  // You can replace the div into Link and link it into a detail view
  return (
    <Link to={`/pokemon/${name}`} className={style.container}>
      <img src={artwork} alt="art-work" className={style.image} />
      <div className={style.name}>{name}</div>
      <span
        className={
          style.typesContainer +
          (pokemonFirstType ? ` ${style[pokemonFirstType]}` : '')
        }
      >
        {pokemonFirstType}
      </span>
      <span
        className={
          style.typesContainer +
          (pokemonSecondType ? ` ${style[pokemonSecondType]}` : '')
        }
      >
        {pokemonSecondType}
      </span>
    </Link>
  );
}

export default PokemonCard;
