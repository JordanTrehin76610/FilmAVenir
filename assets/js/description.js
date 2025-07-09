const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2I2MWUyZWRjNTE1NDkxNWZjNDg3OTYzZmQyYTRkZSIsIm5iZiI6MTc1MTk2MDYzNS42ODgsInN1YiI6IjY4NmNjYzNiODFiNDY2NzUzNjU0MDMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ek09_wWpL8nKW41DPrA7jX3Kbo4Cv2JgnCGwAfWP4w'
    }
};


fetch('https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&region=FR&page=1', options) //Permet de récupérer les ressources json
    .then(response => response.json()) //Convertit en objet js
    .then(data => {
        film = data //Stock le json dans une variable js
        console.log(data) //Affiche désormais dans la console le json
        i = +document.getElementById("description").textContent
        console.log(i)
        filmInfo(i)
    })

function filmInfo(i) {
    document.getElementById(`titre`).textContent = film.results[i].title
    document.getElementById(`photo`).src = `https://image.tmdb.org/t/p/w500${film.results[i].poster_path}`
    note = Math.round(film.results[i].vote_average)
    if (note == 0) {
        note = "Pas encore noté"
    }
    document.getElementById(`note`).textContent = `${note}/10`
    let date = film.results[i].release_date
    let tab = date.split("-")
    date = tab.reverse().join("-")
    document.getElementById(`date`).textContent = date
    document.getElementById(`description`).textContent = film.results[i].overview
}