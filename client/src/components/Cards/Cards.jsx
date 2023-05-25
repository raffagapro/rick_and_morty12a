import Card from '../Card/Card';
import styles from './Cards.module.css';

let {div} = styles;

export default function Cards({characters, onClose}) {
   

   return <div className={div}>
      {
         characters.map(({id, name, species, gender, image}) => <Card 
            id={id}
            key={id}
            name={name}
            species={species}
            gender={gender}
            image={image}
            onClose={()=> onClose(id)}
         />)
      }
   </div>;
}

