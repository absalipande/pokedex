import * as React from 'react';
import { useContext, useState } from 'react';
import PokemonContext from '@/contexts/PokemonContext';
import style from './style.module.css';
import PokemonCard from '../PokemonCard';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

function MyPokemons() {
  const { state } = useContext(PokemonContext);
  const { capturedPokemons } = state;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [clickedPokemonIndex, setClickedPokemonIndex] = useState();


  const goBack = () => {
    // We go back 1 step
    //       👇
    navigate(-1);
  };

  const { dispatch } = useContext(PokemonContext);

  const removePokemonHandler = (event) => {
    event.preventDefault();
    const id = event.target.id;
    const index = id.replace('releasebtn-', '');

    dispatch({
      type: 'REMOVE_POKEMON',
      payload: { index },
    });
    setOpen(false);
  };

  const handleClickOpen = (event) => {
    const id = event.target.id;
    const index = id.replace('release-', '');
    setClickedPokemonIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button type="button" className={style.goBackButton} onClick={goBack}>
        ← BACK
      </button>
      <div className={style.container}>
        {capturedPokemons.map((pokemon, index) => (
          <>
            <PokemonCard key={`${pokemon}-${index}`} name={pokemon} />
            <Button
              variant="outlined"
              onClick={handleClickOpen}
              type="button"
              className={style.button}
              id={`release-${index}`}
              key={`release-${index}`}
            >
              Release Pokemon
            </Button>
          </>
        ))}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want to release this Pokemon?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Pokemon you release won't ever come back! Do you still want to
            continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={removePokemonHandler}
            id={`releasebtn-${clickedPokemonIndex}`}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyPokemons;
