fetch(`https://api.themoviedb.org/3/movie/${filmId}/videos?language=fr-FR`, options) //Permet de récupérer la ressource json du film
    .then(response => response.json()) //Convertit en objet js
    .then(data => {
        trailerDispo = data.results.length
        if (trailerDispo > 0) {
            i = 0
            noFilm = false
            film = data
            console.log(film)
            if (film.results.length > 0) { //Avant de filtrer, on vérifie qu'il y a des trailers
                film = film.results.filter(video => video.type == "Trailer") //Filtre pour ne garder que les trailers
                console.log(film)
                filmTrier = []
                if (film.length > 0) { //Avant de trier, on vérifie qu'il y a des trailers
                    for (let f = 0; f < film.length; f++) { //Push en premier les VF
                        if (film[f].name.toUpperCase().includes("VF")) {
                            filmTrier.push(film[f])
                            console.log(filmTrier)
                        }
                    }
                    for (let v = 0; v < film.length; v++) { //Push en second les VOST
                        if (film[v].name.toUpperCase().includes("VOST")) {
                            filmTrier.push(film[v])
                            console.log(filmTrier)
                        }
                    }
                    filmTrier.push(film[0]) //Ajoute le premier trailer si pas de VF ou VOST
                    console.log(filmTrier)
                }
            }
            if (filmTrier.length < 1 || film.length < 1) {
                noFilm = true
                film = `https://www.youtube.com/embed/1` //Si pas de trailer, on met une vidéo par défaut
            } else {
                film = `https://www.youtube.com/embed/${filmTrier[0].key}`
            }
            console.log(film)
            console.log(`Nombre de trailer dispo: ${trailerDispo}`)

            document.getElementById("videoDesktop").src = film
            document.getElementById("videoMobile").src = film
            document.getElementById("youtubeLink").href = film
        }
        if (trailerDispo <= 0 || noFilm == true) {
            document.getElementById("videoDesktop").style = "display: none"
            document.getElementById("videoMobile").style = "display: none"
            document.getElementById("filmYoutube").style = "display: none"
        }
        else if (window.screen.width >= 1024) {
            document.getElementById("videoDesktop").style = "display: inline"
            document.getElementById("videoMobile").style = "display: none"
        } else {
            document.getElementById("videoDesktop").style = "display: none"
            document.getElementById("videoMobile").style = "display: inline"
        }

    })
