import styles from './SearchBar.module.css';
import { useState } from 'react';

let {div, input, btn} = styles;

export default function SearchBar({onSearch}) {
   const [id, setId] = useState('');

   const handleChange = e =>{
      setId(e.target.value);
   }
   return (
      <div className={div}>
         <input
            type='search'
            className={input}
            onChange={handleChange}
            value={id}
         />
         <button onClick={()=>{onSearch(id)}} className={btn}>Agregar</button>
      </div>
   );
}
