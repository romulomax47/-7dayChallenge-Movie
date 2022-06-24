
import api  from "./api/apiKey.js";
// const api = "6cd00a49def010b0f8ddd573fd8ac97b"
const movieConteiner = document.querySelector(".movies");
const input = document.querySelector('input');
const button = document.querySelector(".searchIcon")
const checkboxInput = document.querySelector('input[type="checkbox"]')
const marcaCoracao = document.getElementById("cor")
// console.log(marcaCoracao);

// marcaCoracao.addEventListener('click', favoriteButtonPressed)    
checkboxInput.addEventListener('change', checkBoxStatus)
button.addEventListener('click', buscarMovie)

input.addEventListener('keyup', function(event){
    console.log(event.key)
    
    if(event.KeyCode == 13){ 
        buscarMovie();
        return
    }
})

function checkBoxStatus(){
    const isCheck = checkboxInput.checked;
    if(isCheck == true){
        clearAllMovie();
        const movies = getFavoriteMovie() || []
        movies.forEach(movie => renderMovie());
    }else if (isCheck == false){
        clearAllMovie()
        getPopularMovies()
    }
}

async function buscarMovie(){
    const inputValue = input.value;
    if(inputValue !=  '') {
        clearAllMovie()
        const movies = await buscarMovieByName(inputValue) 
        console.log(movies)
        movies.forEach( movie => renderMovie(movie))   
    }
}

function clearAllMovie(){
    movieConteiner.innerHTML = "";
}
async function buscarMovieByName(title){
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${title}&language=en-US&page=1`
    const fetchresponse =  await fetch(url);
    const {results} = await fetchresponse.json();
    return results;
}



async function getPopularMovies(){
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api}&language=en-US&page=1`
    const fetchresponse = await fetch(url);
    const  {results} = await fetchresponse.json();
    // console.log(results);
    return results;
}
function favoriteButtonPressed(event, movie) {
    const favoriteState = {
      favorited: '/icon/coração.svg',
      notFavorited: '/icon/corac-vazio.svg'
    }

    if(event.target.src.include(favoriteState.notFavorited)){
        // faforitado
        event.target.src = favoriteState.favorited;
        saveToLocalStorege(movie);
    }else{
        // desvaforitado 
        event.target.src = favoriteState.notFavorited;
        removeFromLocalStorage(movie.id)
        
    }   
}

 function getFavoriteMovie (){
    return JSON.parse(localStorage.getItem('favoritarMovie'));
 }


function saveToLocalStorege (movie){
    const  movies = getFavoriteMovie() || movies.push(movie);
    const movieJson = JSON.stringify(movie)
    localStorage.getItem("favoritarMovie", movieJson)
}
function checkMoviefavorita(id){
    const movies = getFavoriteMovie() || []
    return movies.find(movie => movie.id == id)
}
function removeFromLocalStorage (){
     const movies = getFavoritarMovie() || [];
     const findmovies = movies.find(movie => movie.id == id);
     const newMovies = movies.filter(movies => movies.id != findmovies);
     localStorage.setItem('favoriteMovie0', JSOM.stringify(newMovies));
}



 window.onload = async function() {
    const movies = await getPopularMovies()
    movies.forEach(movies => renderMovie(movies))
  }    



function renderMovie(movie){

    const {title, poster_path, vote_average, release_date, overview} = movie;
    const isFavorited = false;

    const year = new Date(release_date).getFullYear()
    const image = `https://image.tmdb.org/t/p/w500${poster_path}`

    const movieElement = document.createElement("div");
    movieElement.classList.add('movie')
    movieConteiner.appendChild(movieElement)


    const element1 = document.createElement('div')
    element1.classList.add('movieInfor')
    movieElement.appendChild(element1)

    const movieImgConteiner = document.createElement('div')
    movieImgConteiner.classList.add('movieImg')
    const img = document.createElement('img')
    img.classList.add('movieImg')
    img.src = image;
    img.alt = `${title} Poster`
    movieImgConteiner.appendChild(img);
    element1.appendChild(movieImgConteiner)
    
    const movieInfor = document.createElement('div');
    movieInfor.classList.add("movieText")
    const movieTitulo = document.createElement('h4')
    movieTitulo.classList.add('titulo-filme')
    movieTitulo.textContent = `${title} ${year}`;
    movieInfor.appendChild(movieTitulo)
    element1.appendChild(movieInfor)

    const informacoes = document.createElement('div');
    informacoes.classList.add('informacoes')
    movieInfor.appendChild(informacoes)

    const movieRating = document.createElement('div')
    movieRating.classList.add('star')
    const ratingStar = document.createElement('img')
    ratingStar.src = '/icon/star-icon.svg';
    ratingStar.alt = 'star-icon';
    const ratingSpan = document.createElement('span')
    ratingSpan.textContent = vote_average
    movieRating.appendChild(ratingStar)
    movieRating.appendChild(ratingSpan)
    informacoes.appendChild(movieRating)

    const movieIsFavorited = document.createElement('div')
    movieIsFavorited.classList.add('rating')
    const isFavoritedImg = document.createElement('img')
    isFavoritedImg.src = isFavorited ? '/icon/coração.svg' : '/icon/corac-vazio.svg'
    isFavoritedImg.alt = 'icon-coraçao';
    const  isFavoritedSpan = document.createElement('span')
    isFavoritedSpan.textContent = 'Favorito'
    isFavoritedSpan.classList.add('rating')
    movieIsFavorited.appendChild(isFavoritedImg)
    movieIsFavorited.appendChild(isFavoritedSpan)
    informacoes.appendChild(movieIsFavorited)



    const  movieDescrition = document.createElement('div')
    movieDescrition.classList.add('movie-descricao')

    const descricaoTexto = document.createElement('p')
    descricaoTexto.textContent = overview;
    descricaoTexto.classList.add('movie-descriçao')
    movieDescrition.appendChild(descricaoTexto)
    movieElement.appendChild(movieDescrition)
    

    

}
