import { Link } from 'react-router-dom';
import style from './style.module.css';

function HomePage() {
  return (
    <div className="container">
      <h1 className={style.navBarHeader}>Pokedex</h1>
      <Link to={`/navbar`}>Types</Link>
    </div>
  );
}

export default HomePage;
