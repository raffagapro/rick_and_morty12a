let myFavorites = [

]

const postFav = (req, res) =>{
    myFavorites.push(req.body);
    res.status(200).json(myFavorites);
};

const deleteFav = (req, res) =>{
    myFavorites = myFavorites.filter(fav=> +req.params.id !== fav.id);
    res.status(200).json(myFavorites);
};

module.exports = {
    postFav,
    deleteFav
};