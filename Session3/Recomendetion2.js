var data;
var resultP;
var users;
var resultDivs = []

function preload() {
    data = loadJSON('movies.json')
}

function setup() {
    noCanvas();
    users = {};
    var dropdown1 = createSelect('')
    for (var i = 0; i < data.users.length; i++) {
        var name = data.users[i].name;
        dropdown1.option(name);
        users[name] = data.users[i];
    }

    var button = createButton('submit')
    button.mousePressed(findNearestNeighbors);

    
    function findNearestNeighbors(){

        for(var i=0; i<resultDivs.length;i++){
            resultDivs[i].remove();
        }
        resultDivs = []

        resultP = createP('');

        var name = dropdown1.value();
        var similarityScores = []

        for(var i=0; data.users.length>i; i++){
            var other = data.users[i].name;
            if(other != name){
                var similarity = euclideanDistance(name, other);
                similarityScores[other] = similarity;
            }
            else{
                similarityScores[other] = -1;
            }
        }
        data.users.sort(comparaSimilarity)

        function comparaSimilarity(a, b){
            var score1= similarityScores[a.name];
            var score2 = similarityScores[b.name];
            return score2 - score1;
        }
        console.log(data.users)

        var k=5;
        for (var i=0; i<k; i++){
            var name = data.users[i].name;
            var div = createDiv(name + ': ' + similarityScores[name])
            resultDivs.push(div);
            resultP.parent(div);
        }

    }

}

function euclideanDistance(name1, name2) {

    var ratings1 = users[name1];
    var ratings2 = users[name2];

    var titles = Object.keys(ratings1);
    var i = titles.indexOf('name');
    titles.splice(i, 1);
    var j = - titles.indexOf('timestamp');
    titles.splice(j, 1);

    var sumSquares = 0;
    for (var i = 0; i < titles.length; i++) {
        var title = titles[i]
        var rating1 = ratings1[title]
        var rating2 = ratings2[title]
        if (rating1 != null && rating2 != null) {
            var diff = rating1 - rating2
            sumSquares += diff * diff
        }
    }
    var d = sqrt(sumSquares);
    var similarity = 1 / (d + 1);

    return similarity
}

