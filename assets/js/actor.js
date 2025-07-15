fetch(`https://api.themoviedb.org/3/movie/${filmId}/credits?language=fr-FR`, options) //Permet de récupérer la ressource json du film
    .then(response => response.json()) //Convertit en objet js
    .then(data => {
        actor = data.cast
        actor.sort((a, b) => b.popularity - a.popularity) //Trie par rapport à la popularité >
        document.getElementById("acteur").innerHTML = ""
        for (let i = 0; i < 5; i++) {
            rajoutActor(i)
            actorInfo(i)
        }
    })

function rajoutActor(i) {
    document.getElementById("acteur").innerHTML += `<div class="col-lg mt-5">
                    <div class="row">
                        <p id="name${i}">Nom de l'acteur</p>
                    </div>
                    <div class="row">
                       <a href="person.html?actor=${actor[i].id}"> <img src="" alt="photo de l'acteur" id="profil${i}" class="profil"></a>
                    </div>
                    <div class="row">
                        <p id="perso${i}">Nom du personnage</p>
                    </div>
                </div>`
}


function actorInfo(i) {
    document.getElementById(`name${i}`).textContent = `Acteur: ${actor[i].name}`
    if (actor[i].profile_path == null) {
        document.getElementById(`profil${i}`).src = `../assets/img/inconnu.png`
    } else {
        document.getElementById(`profil${i}`).src = `https://image.tmdb.org/t/p/w500${actor[i].profile_path}`
    }
    if (actor[i].character == "") {
        document.getElementById(`perso${i}`).textContent = "Rôle inconnu"
    } else {
        document.getElementById(`perso${i}`).textContent = `Rôle: ${actor[i].character}`
    }
}