

const album=document.querySelector('#album');
const inputName=document.querySelector('#inputName');
const submitBtn=document.querySelector('#submitBtn');

function createAlbum(name,rating,genre,time,country){
    const div=document.createElement('div');

    div.innerHTML=` <div class="card shadow-sm">
            <img class="bd-placeholder-img card-img-top" width="100%" height="225" 
            src="" 
            aria-label="Placeholder: Thumbnail" 
            preserveAspectRatio="xMidYMid slice" focusable="false">
            <div class="card-body">
            <span style="font-size:25px">${name}</span> <span>${      rating}</span>
                <p class="card-text">${genre}</p>
                <p class="card-text">${country}</p>
                <div class="d-flex justify-content-between align-items-center">
                
                <small class="text-muted">${time}</small>
                </div>
            </div>
            </div>`;
    div.setAttribute('class','col')
    album.append(div);
}
// window.onload=function(){
//     for(let i=0;i<10;i++){
//         createAlbum();
//     }
// }

//search by name
submitBtn.addEventListener('click',clearAlbum);
submitBtn.addEventListener('click',searchByName);

function clearAlbum(){
    album.textContent='';
}

function searchByName(){
    let str=inputName.value;
    console.log(str);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'imdb-scraper.p.rapidapi.com',
            'X-RapidAPI-Key': 'c40c092a88msh77cfe20cb780d37p1c8bbfjsn398ca07f1340'
        }
    };
    
    fetch(`https://imdb-scraper.p.rapidapi.com/search/title/${str}/true`, options)
        .then(response => response.json())
        .then(function(response){
            for(let i=0;i<response.list.length;i++){
                let currId=response.list[i].titleId;
                //use ID to search movie's detail
                fetch(`https://imdb-scraper.p.rapidapi.com/title/${currId}`, options)
                .then(response => response.json())
                .then(function(response) {
                    //use obj's information to creat album
                    if(response.title&&response.rating&&response.genres&&response.duration.includes('h')&&response.countryOfOrigin){
                        createAlbum(response.title,response.rating,response.genres,response.duration,response.countryOfOrigin);
                    }

                    return console.log(response)
                })
                .catch(err => console.error(err));             

            }

            return console.log(response.list[0]);;
            
        })
        .catch(err => console.error(err));

}


// fetch("json/ratings.json")
// .then(response=>{
//     return response.json();
// })
// .then(function(data){
//     console.log('ratings:');
    
//     console.log(ratingFilter(data));
// });


// function ratingFilter(arr){
//    return  arr.filter(function(obj){
//         return obj.averageRating>9.5&&obj.numVotes>50000;
//     });
  
// }



// fetch("json/name.json")
// .then(response=>{
//     return response.json();
// })
// .then(function(data){
//     ratings=data;
//     console.log('names:');
    
//     console.log(nameFilter(data));
// });

// function nameFilter(arr){
//    return  arr
  
// }

// const axios = require("axios");


// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'imdb-scraper.p.rapidapi.com',
// 		'X-RapidAPI-Key': 'c40c092a88msh77cfe20cb780d37p1c8bbfjsn398ca07f1340'
// 	}
// };

// fetch('https://imdb-scraper.p.rapidapi.com/cast/nm0000375', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

let m={title: 'Titanic', year: '1943', duration: '1h 25m', rating: '6.2', id: 'tt0036443'}
if(m.duration.includes('h')){
    console.log(true);
}
else{
    console.log(false);
}
