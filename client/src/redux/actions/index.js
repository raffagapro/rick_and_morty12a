import { ADD_FAVORITE, DELETE_FAVORITE, FILTER, ORDER } from "./types";
import axios from "axios";

export const addFavorite = char =>{
    const endpoint = 'http://localhost:3001/rickandmorty/fav';
    return async (dispatch) => {
        let response = await axios.post(endpoint, char);
        return dispatch({
            type: ADD_FAVORITE,
            payload: response.data,
        });
    };
};
//accion async
export const deleteFavorite = id =>{
    const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
    return async (dispatch) => {
        let response = await axios.delete(endpoint);
        return dispatch({
            type: DELETE_FAVORITE,
            payload: response.data,
        });
    };
};
//accion sync
export const filterCards = gender =>{
    return{
        type: FILTER,
        payload: gender
    }
}

export const orderCards = order =>{
    return{
        type: ORDER,
        payload: order
    }
}