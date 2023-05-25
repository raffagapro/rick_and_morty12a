import styles from './Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite } from '../../redux/actions';
import { useState, useEffect } from 'react';

let {div, btn, imageStyle} = styles;

export default function Card({id, name, species, gender, image, onClose}) {
   //trajimos el dispatch
   const dispatch = useDispatch();
   //trajimos el estado global myFavorites
   const favorites = useSelector(state => state.myFavorites);
   //estado local
   const [isFav, setIsFav] = useState(false);

   useEffect(() => {
      favorites.forEach(fav => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [favorites]);

   let charac = {
      name: name,
      gender: gender,
      species: species,
      id: id,
      image: image,
    };

   const handleFavorite = () =>{
      if (isFav) {
         setIsFav(false);
         dispatch(deleteFavorite(id));
      }
      else{
         setIsFav(true);
         dispatch(addFavorite(charac));
      }
   };

   return (
      <div className={div}>
         <button onClick={onClose} className={btn}>X</button>
         {
            isFav ? (
               <button onClick={handleFavorite}>❤️</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
            )
         }
         <h2>{name}</h2>
         <h2>{species}</h2>
         <h2>{gender}</h2>
         <img className={imageStyle} src={image} alt={'aqui andamos chismeando'} />
      </div>
   );
}




//SOLO CUANDO SE TRABAJA CON CLASSES
// export function mapStateToProps(state) {
//    return {
//      myFavorites: state.myFavorites,
//    };
// }

// export function mapDispatchToProps(dispatch) {
//      return {
//        addFavorite: function (fav) {
//          dispatch(addFavorite(fav));
//        },
   
//        deleteFavorite: function (id) {
//          dispatch(deleteFavorite(id));
//        },
//      };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Card); //HACE UNA COPIA DEL COMPONENTE 
