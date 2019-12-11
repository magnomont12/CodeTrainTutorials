var data;

function preload(){
    data = loadJSON('movies.json')
}

function setup() {
    noCanvas();
    console.log(data)
}

