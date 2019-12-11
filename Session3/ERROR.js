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

    var dropdowns = [];

    var titles = data.titles;
    for (var i = 0; i < titles.length; i++) {
        var div = createDiv(titles[i]);
        var dropdown = createSelect('')
        dropdown.title = titles[i];
        dropdown.option('not seen')
        dropdown.parent(div)
        dropdowns.push(dropdown);
        for (var star = 1; star < 6; star++) {
            dropdown.option(star)
        }
    }



    var button = createButton('submit')
    button.mousePressed(predictRatings);

    function predictRatings() {
        var newUser = {}
        for (var i = 0; i < dropdowns.length; i++) {
            var title = dropdowns[i].title;
            var rating = dropdowns[i].value();
            if (rating == 'not seen') {
                rating = null;
            }
            newUser[title] = rating;
        }
        findNearestNeighbors(newUser);
    }


    function findNearestNeighbors(user) {

        for (var i = 0; i < resultDivs.length; i++) {
            resultDivs[i].remove();
        }
        resultDivs = []

        resultP = createP('');
        var similarityScores = []

        for (var i = 0; data.users.length > i; i++) {
            var other = data.users[i];
            var similarity = euclideanDistance(user, other);
            similarityScores[other.name] = similarity;
        }
        data.users.sort(comparaSimilarity)

        function comparaSimilarity(a, b) {
            var score1 = similarityScores[a.name];
            var score2 = similarityScores[b.name];
            return score2 - score1;
        }

        for (var i = 0; i < data.titles.length; i++) {
            var title = data.titles[i];
            if (user[user] == null) {
                var k=5;
                var sum = 0;
                var weightedSum=0;
                var similaritySum = 0;
                for (var a=0; a<k; a++){
                    //var name = data.users[a].name
                    //var sim = similarityScores[name]
                    var ratings = data.users[a];
                    var rating = ratings[title];
                    // if(rating != null){
                    //     weightedSum += rating * similarity;
                    //     similaritySum += sim;
                    // }
                    sum += rating;
                }
                //var stars = nf(weightedSum / similaritySum, 1, 2);
                var teste = nf(sum/k,1,2)
                var div = createDiv(title + ": "+teste);
                resultDivs.push(div);
                div.parent(resultP);
            }
        }



    }

}

function euclideanDistance(ratings1, ratings2) {

    var titles = data.titles;

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

