function checkAnswer() {
    var userInput = document.getElementById("userInput").value;
    var abbrevationID = parseInt(document.getElementById("abbrevationID").value);
    console.log(abbrevationID);

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/getAbbrevation/" + abbrevationID, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState==4 && xhr.status==200) {
            var abbrevations = JSON.parse(xhr.responseText);
            // if(xhr.responseText=="-1") {
            //     // No more items in list
            //     console.log("Finished.");
            //     showResult(abbrevationID);
            // }

            if(abbrevations[abbrevationID][1]==userInput) {
                console.log("User guessed correct");
                document.getElementById("points").innerHTML = "Correct answers: " + abbrevationID;
                document.getElementById("userInput").value = "";
                abbrevationID += 1;
                if(abbrevationID>=6) {
                    console.log("Finished");
                    document.getElementById("wholePage").innerHTML = "<h3 style='text-align: center'>" + 
                    "Thank you for playing! Your score: " + abbrevationID + "</h3>";
                } else {
                    document.getElementById("abbrevationID").value = abbrevationID;
                    var currAbb = document.getElementById("currentAbbrevation");
                    currAbb.innerHTML = abbrevations[abbrevationID][0]
                }
            }
        }
    };

    xhr.send(null);
}

function showResult(points) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/result/" + points, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState==4 && xhr.status==200) {
        }
    }
    xhr.send(null);
}

window.onload = function showAbbrevation() {
    var abbrevationID = document.getElementById("abbrevationID").value;

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/getAbbrevation/" + abbrevationID, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState==4 && xhr.status==200) {
            var abbrevations = JSON.parse(xhr.responseText);
            var currAbb = document.getElementById("currentAbbrevation");
            currAbb.innerHTML = abbrevations[abbrevationID][0]
            
        }
    };

    xhr.send(null);
}


