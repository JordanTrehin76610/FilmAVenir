let limite = 19
let aFaitRecherche = false

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

        for (let i = 0; i <= limite; i++) {
            filmAVenir(i)
            filmInfo(i)
        }
    })

function filmAVenir(i) {
    document.getElementById("list").innerHTML += `
    <div class="col-lg-3 mb-5" style="display: inline" id="film${i}">
        <div class="row titre"><p id="titre${i}">Titre</p></div>
        <div class="row"><a href="pages/description.html?id=${film.results[i].id}"><img src="" alt="film de la semaine n°${i}" id="photo${i}" class="poster"></a></div>
        <div class="row">
            <div class="col"><p id="note${i}">Note</p></div>
            <div class="col"><p id="date${i}">Date</p></div>
        </div>
    </div>`
}

function filmInfo(i) {
    document.getElementById(`titre${i}`).textContent = film.results[i].title
    document.getElementById(`photo${i}`).src = `https://image.tmdb.org/t/p/w500${film.results[i].poster_path}`
    note = Math.round(2 * film.results[i].vote_average) / 2
    if (note == 0) {
        note = "Pas encore noté"
    }
    document.getElementById(`note${i}`).textContent = `${note}/10`

    // JE TRIE LES FILM SORTIE ET PAS SORTIE
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    let date = film.results[i].release_date
    if (date < today && aFaitRecherche == false) {
        document.getElementById(`film${i}`).style = "display: none"
    }
    let tab = date.split("-")
    date = tab.reverse().join("-")
    document.getElementById(`date${i}`).textContent = date

}

function filmRecherche() {

    aFaitRecherche = true
    recherche = document.getElementById("rechercheFilm").value

    fetch(`https://api.themoviedb.org/3/search/movie?query=${recherche}&include_adult=true&language=fr-FR&page=1`, options)
        .then(res => res.json())
        .then(data => {
            film = data //Stock le json dans une variable js
            console.log(data) //Affiche désormais dans la console le json

            document.getElementById("list").innerHTML = ""
            for (let i = 0; i < film.results.length; i++) {
                filmAVenir(i)
                if (film.results[i].backdrop_path == null || film.results[i].poster_path == null) {
                    document.getElementById(`film${i}`).style = "display: none"
                }
                filmInfo(i)
            }
        })
}
