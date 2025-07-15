const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2I2MWUyZWRjNTE1NDkxNWZjNDg3OTYzZmQyYTRkZSIsIm5iZiI6MTc1MTk2MDYzNS42ODgsInN1YiI6IjY4NmNjYzNiODFiNDY2NzUzNjU0MDMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ek09_wWpL8nKW41DPrA7jX3Kbo4Cv2JgnCGwAfWP4w'
    }
};
const params = new URLSearchParams(window.location.search); //Regarde les paramètre
const filmId = params.get('id'); //Regarde le paramètre id qu'on a fait passer dans l'url


fetch(`https://api.themoviedb.org/3/movie/${filmId}?language=fr-FR`, options) //Permet de récupérer la ressource json du film
    .then(response => response.json()) //Convertit en objet js
    .then(data => {
        film = data //Stock le json dans une variable js
        if (film.status_code == 34) {
        document.getElementById("introuvable").style.display = "block"
        document.getElementById("corp").style.display = "none"
        } else {
        console.log(data) //Affiche désormais dans la console le json
        i = +document.getElementById("description").textContent
        console.log(i)
        filmInfo(film)
    }})


function filmInfo(film) {
    document.getElementById(`titre`).textContent = film.title
    document.getElementById(`photo`).src = `https://image.tmdb.org/t/p/w500${film.poster_path}`
    note = Math.round(2 * film.vote_average) / 2
    if (note == 0) {
        note = "Pas encore noté"
    }
    document.getElementById(`note`).textContent = `${note}/10`
    let date = film.release_date
    let tab = date.split("-")
    date = tab.reverse().join("-")
    document.getElementById(`date`).textContent = date
    if (film.overview == "") {
        document.getElementById(`description`).textContent = "Pas de description"
    } else {
        document.getElementById(`description`).textContent = film.overview
    }
}