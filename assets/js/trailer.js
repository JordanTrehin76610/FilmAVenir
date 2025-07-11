fetch(`https://api.themoviedb.org/3/movie/${filmId}/videos?language=fr-FR`, options) //Permet de récupérer la ressource json du film
    .then(response => response.json()) //Convertit en objet js
    .then(data => {
        trailerDispo = data.results.length
        if (trailerDispo > 0) {
            // i = Math.floor(Math.random() * data.results.length)
            // console.log(`trailer choisi: ${i}`)
            film = data
            console.log(film)
            film = data.results[0].key
        }
        console.log(`Nombre de trailer dispo: ${trailerDispo}`)
        document.getElementById("videoDesktop").src = `https://www.youtube.com/embed/${film}`
        document.getElementById("videoMobile").src = `https://www.youtube.com/embed/${film}`
        if (trailerDispo <= 0) {
            document.getElementById("videoDesktop").style = "display: none"
            document.getElementById("videoMobile").style = "display: none"
        }
        else if (window.screen.width >= 1024) {
            document.getElementById("videoDesktop").style = "display: inline"
            document.getElementById("videoMobile").style = "display: none"
        } else {
            document.getElementById("videoDesktop").style = "display: none"
            document.getElementById("videoMobile").style = "display: inline"
        }
    })