import { ADD_FAVORITE, DELETE_FAVORITE, FILTER, ORDER } from "../actions/types";
const initialState = {
    myFavorites: [
        {
            name: 'Morty Smith',
            species: 'Human',
            gender: 'Male',
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        }
    ],
    allCharacters: []
}

const rootReducer = (state = initialState, actions) =>{
    const { type, payload } = actions;

    switch (type) {
        case ADD_FAVORITE:
            return {
                ...state,
                allCharacters: payload,
                myFavorites : payload
            }

        case DELETE_FAVORITE:
            return{
                ...state,
                myFavorites: payload
            };

        case FILTER:
            return{
                ...state,
                myFavorites: state.allCharacters.filter(chr=>chr.gender === payload)
            };

        case ORDER:
            let sorted = state.allCharacters.sort((a,b)=>{
                if (a.id > b.id) return payload === "Ascendente" ? 1 : -1;
                if (a.id < b.id) return payload === "Descendente" ? -1 : 1;
                else return 0
            })

            return{
                ...state,
                myFavorites: sorted
            };

        default:
            return {...state};
    }
}

export default rootReducer;