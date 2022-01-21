//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 500;  //time in ms, 0.5 second for example
var $input = $('#myInput');

//on keyup, start the countdown
$input.on('keyup', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
    clearTimeout(typingTimer);
});


function doneTyping() {

    document.getElementById("movieresults").innerHTML = '';

    fetch('https://api.themoviedb.org/3/search/multi?api_key=67b9d9fa2b8bbd0f0eed63c06a11359b&query=' + document.getElementById("myInput").value)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            for (i = 0; i < data.results.length; i++) {

                // console.log(data.results[i].id);
                // console.log(data.results[i].poster_path);
                // console.log(data.results[i].title);
                // console.log(data.results[i].original_language.toUpperCase());
                // console.log(data.results[i].vote_count);
                // console.log(data.results[i].vote_average);
                // console.log(data.results[i].release_date);


                if (data.results[i].poster_path == null) {
                    data.results[i].poster_path = 'https://samples-d4024.web.app/images/MoviePosterNA.jpg'

                } else {
                    data.results[i].poster_path = 'https://image.tmdb.org/t/p/original' + data.results[i].poster_path;
                }

                if (data.results[i].release_date == undefined) {
                    data.results[i].release_date = '';
                }

                if (data.results[i].vote_average == 0) {
                    data.results[i].vote_average = 'N/A';
                }

                if (data.results[i].adult == true) {
                    data.results[i].adult = 'A';
                } else {
                    data.results[i].adult = 'UA';
                }

                if (data.results[i].title == undefined) {
                    data.results[i].title = data.results[i].name;
                }

                document.getElementById("movieresults").innerHTML += '<div class="card mb-3 my-2 hover-item" onclick="moviemodal(this.id)" id="' + data.results[i].media_type + data.results[i].id + '" style="max-width: 540px; padding: 0px; background-color: #3F424C; border-color: #F11819; margin-right: 15px;"> <div class="row g-0"> <div class="col-md-4"> <img style="height: 100%; border-right-style: solid; border-right-color: #F11819; border-right-width: 1px;" src="' + data.results[i].poster_path + '" class="img-fluid rounded-start" alt="..."> </div> <div class="col-md-8"> <div class="card-body"> <h5 class="card-title" style="color: #EE3F3F;">' + data.results[i].title + '</h5> <hr> <h6 class="card-text" style="color: white;"> Language Code: ' + data.results[i].original_language.toUpperCase() + ' <hr> Voters: ' + data.results[i].vote_count.toLocaleString("en-US") + ' <hr> <i class="fas fa-star" style="color: #F11819;"></i> &nbsp' + data.results[i].vote_average + ' <hr> </h6> <p class="card-text"><small class="text-muted">' + data.results[i].release_date + '</small></p> </div> </div> </div> </div>'
            }

        })
        .catch(function (err) {

        });

}


function moviemodal(movieid) {

    console.log(movieid);
    myArray = movieid.split(/([0-9]+)/);
    console.log(myArray[0]);
    document.getElementById("moviemodalbody").innerHTML = '';
    document.getElementById("exampleModalLabel").innerHTML = '';

    fetch('https://api.themoviedb.org/3/' + myArray[0] + '/' + myArray[1] + '?api_key=67b9d9fa2b8bbd0f0eed63c06a11359b')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // console.log(data.title);
            // console.log(data.backdrop_path);
            // for (i = 0; i < data.genres.length; i++) {
            //     console.log(data.genres[i].name);
            // }
            // console.log(data.vote_average);
            // console.log(data.revenue);
            // console.log(data.status);
            // console.log(data.release_date);
            // console.log(data.overview);

            if (myArray[0] == 'movie') {

                if (data.backdrop_path == null) {
                    data.backdrop_path = 'https://samples-d4024.web.app/images/MoviePosterNA2.jpg'

                } else {
                    data.backdrop_path = 'https://image.tmdb.org/t/p/original' + data.backdrop_path;
                }

                if (data.release_date == '') {
                    data.release_date = 'N/A';
                }
                if (data.vote_average == 0) {
                    data.vote_average = 'N/A';
                }
                if (data.revenue == 0) {
                    data.revenue = 'N/A';
                } else {
                    data.revenue = '$' + data.revenue.toLocaleString("en-US");
                }

                document.getElementById("exampleModalLabel").innerHTML += data.title;
                document.getElementById("moviemodalbody").innerHTML += '<div class="modal-body"> <div class="row"> <div class="col"> <div class="card" style="width: 100%; background-color: #17161B;"> <img src="' + data.backdrop_path + '" class="card-img-top" alt="..."> <div class="card-body"> <div style="font-size: 12px;" id="genres"> </div> <hr> <button onclick="Recommendations1(' + data.id + ',' + 1 + ')" type="button" class="btn btn-danger btn-sm"><i class="fas fa-plus-circle"></i> &nbspRecommend</button> <br><br> <div class="row"> <div class="col"> <p class="card-text" style="color: white;"> <i class="fas fa-star" style="color: #F11819;"></i> &nbsp' + data.vote_average + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> Revenue: &nbsp' + data.revenue + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> </p> </div> <div class="col"> <p class="card-text" style="color: white;"> Status: &nbsp' + data.status + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> Release: &nbsp' + data.release_date + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> </p> </div> </div> <br> <div class="row"> <p> ' + data.overview + ' </p> </div> </div> </div> </div> </div> </div>';
                for (i = 0; i < data.genres.length; i++)
                    document.getElementById("genres").innerHTML += '<span style="background-color: grey; padding: 4px; border-radius: 0.4vw; margin-right: 5px;">' + data.genres[i].name + '</span>';
            }

            if (myArray[0] == 'tv') {

                if (data.backdrop_path == null) {
                    data.backdrop_path = 'https://samples-d4024.web.app/images/MoviePosterNA2.jpg'

                } else {
                    data.backdrop_path = 'https://image.tmdb.org/t/p/original' + data.backdrop_path;
                }

                if (data.first_air_date == '') {
                    data.first_air_date = 'N/A';
                }
                if (data.vote_average == 0) {
                    data.vote_average = 'N/A';
                }
                if (data.vote_count == 0) {
                    data.vote_count = 'N/A';
                }

                document.getElementById("exampleModalLabel").innerHTML += data.name;
                document.getElementById("moviemodalbody").innerHTML += '<div class="modal-body"> <div class="row"> <div class="col"> <div class="card" style="width: 100%; background-color: #17161B;"> <img src="' + data.backdrop_path + '" class="card-img-top" alt="..."> <div class="card-body"> <div style="font-size: 12px;" id="genres"> </div> <hr> <button onclick="Recommendations1(' + data.id + ',' + 0 + ')" type="button" class="btn btn-danger btn-sm"><i class="fas fa-plus-circle"></i> &nbspRecommend</button> <br><br> <div class="row"> <div class="col"> <p class="card-text" style="color: white;"> <i class="fas fa-star" style="color: #F11819;"></i> &nbsp' + data.vote_average + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> Voters: &nbsp' + data.vote_count.toLocaleString("en-US") + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> </p> </div> <div class="col"> <p class="card-text" style="color: white;"> Status: &nbsp' + data.status + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> Release: &nbsp' + data.first_air_date + ' <hr style="background-color: #F11819; opacity: 100%; height: 0.1px;"> </p> </div> </div> <br> <div class="row"> <p> ' + data.overview + ' </p> </div> </div> </div> </div> </div> </div>';
                for (i = 0; i < data.genres.length; i++)
                    document.getElementById("genres").innerHTML += '<span style="background-color: grey; padding: 4px; border-radius: 0.4vw; margin-right: 5px;">' + data.genres[i].name + '</span>';
            }

            $('#exampleModal').modal('show');


        })
        .catch(function (err) {

        });
}


//firebase

var db = firebase.firestore();

db.collection("Recommendations").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});

function Recommendations1(id, mediatype) {

    if (mediatype == 1) {
        mediatype = 'movie';
    } else {
        mediatype = 'tv';
    }

    db.collection("Recommendations").add({
        id: id,
        mediaType: mediatype
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

}






