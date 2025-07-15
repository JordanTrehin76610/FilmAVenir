const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2I2MWUyZWRjNTE1NDkxNWZjNDg3OTYzZmQyYTRkZSIsIm5iZiI6MTc1MTk2MDYzNS42ODgsInN1YiI6IjY4NmNjYzNiODFiNDY2NzUzNjU0MDMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ek09_wWpL8nKW41DPrA7jX3Kbo4Cv2JgnCGwAfWP4w'
    }
};

const params = new URLSearchParams(window.location.search); //Regarde les paramètre
const actorId = params.get('person'); //Regarde le paramètre id qu'on a fait passer dans l'url

fetch(`https://api.themoviedb.org/3/person/${actorId}?language=fr-FR'`, options) //Permet de récupérer la ressource json du film
    .then(response => response.json()) //Convertit en objet js
    .then(data => {
        actor = data
        if (actor.status_code == 34) {
        document.getElementById("introuvable").style.display = "block"
        document.getElementById("corp").style.display = "none"
        } else {
        console.log(actor)
        acteurInfo()
        }
    })


function acteurInfo() {
    document.getElementById("nom").textContent = actor.name
    if (actor.profile_path == null) {
        document.getElementById("acteur").src = `../assets/img/inconnu.png`
    } else {
        document.getElementById("acteur").src = `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    }
    switch (actor.gender) {
        case 1:
            genre = "Femme"
            break;
        case 2:
            genre = "Homme"
            break;
        case 3:
            genre = "Non binaire"
            break;
        default:
            genre = "Non spécifié"
    }
    document.getElementById("genre").textContent = genre

    mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
    if (actor.birthday == null) {
        naissance = "Date de naissance inconnue"
    } else {
    naissance = actor.birthday.split("-")
    naissance = naissance.reverse()
    moisSelection = naissance[1]
    naissance[1] = mois[moisSelection - 1]
    naissance = naissance.join(" ")
    }
    document.getElementById("date").textContent = naissance

    document.getElementById("biographie").textContent = actor.biography
}