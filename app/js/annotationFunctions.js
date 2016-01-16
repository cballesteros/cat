var annotationEditMode = false;
var curAnnotation = -1;

function setAnnotation(thumbnail) {
    var numId = thumbnail.id.substring(thumbnail.id.lastIndexOf('g') + 1, thumbnail.id.length);
        
    if (document.getElementById('ann' + numId).style.borderColor === 'blue' && eBlue) {//Quito el azul
        document.getElementById('ann' + numId).style.border = "";
        eBlue = false;
        nBlue = '00:00:00';
        unSetDiamondBlue();
        //unCompleteThumbnails();
    } else if (!eBlue &&
            (eRed ? (getNumberOfFrame(document.getElementById('time' + numId).innerHTML) < getNumberOfFrame(nRed)) : true)) {//Pongo el azul
        document.getElementById('ann' + numId).style.border = "3px solid blue";
        eBlue = true;
        nBlue = document.getElementById('time' + numId).innerHTML;
        setDiamondBlue(thumbnail);
        //if (eRed) completeThumbnails(nBlue, nRed);
    } else if (!eRed &&
            (eBlue ? (getNumberOfFrame(document.getElementById('time' + numId).innerHTML) > getNumberOfFrame(nBlue)) : true)) {//Pongo el rojo
        document.getElementById('ann' + numId).style.border = "3px solid red";
        eRed = true;
        nRed = document.getElementById('time' + numId).innerHTML;
        setDiamondRed(thumbnail);
        //completeThumbnails(nBlue, nRed);
    } else if (document.getElementById('ann' + numId).style.borderColor === 'red') {//Quito el rojo
        document.getElementById('ann' + numId).style.border = "";
        eRed = false;
        nRed = '00:00:00';
        unSetDiamondRed();
        //unCompleteThumbnails();
    }
}

function unSetAnnotation(){
    eBlue = false;
    nBlue = '00:00:00';
    unSetDiamondBlue();
    eRed = false;
    nRed = '00:00:00';
    unSetDiamondRed();
    cleanBorders();
}

function cleanBorders() {
    for (var i = 1, max = 12; i <= max; i++) {
        document.getElementById('ann' + i).style.border = "";
    }
}

function findAndSetBorder(blue, red) {
    for (var i = 1, max = 12; i <= max; i++) {
        if (document.getElementById('time' + i).innerHTML === blue)
            document.getElementById('ann' + i).style.border = "3px solid blue";
        else if (document.getElementById('time' + i).innerHTML === red)
            document.getElementById('ann' + i).style.border = "3px solid red";
    }
}

function setDiamondBlue(thumbnail) {
    var numId = thumbnail.id.substring(thumbnail.id.lastIndexOf('g') + 1, thumbnail.id.length);
    var timeSplit = document.getElementById("time" + numId).innerHTML.split(":");
    var min = parseInt(timeSplit[0]);
    var seg = parseInt(timeSplit[1]);
    var ms = parseInt(timeSplit[2]);
    var currentTime = min * 60 + seg + '.' + ms;
    var duration = jwplayer().getDuration();
    var percentage = (currentTime * 100) / duration;
    document.getElementById('diamondBlue').style.visibility = 'visible';
    document.getElementById('diamondBlue').style.left = (percentage) + '%';
}

function unSetDiamondBlue() {
    document.getElementById('diamondBlue').style.visibility = 'hidden';
    document.getElementById('diamondBlue').style.left = (0) + '%';
}

function setDiamondRed(thumbnail) {
    var numId = thumbnail.id.substring(thumbnail.id.lastIndexOf('g') + 1, thumbnail.id.length);
    var timeSplit = document.getElementById("time" + numId).innerHTML.split(":");
    var min = parseInt(timeSplit[0]);
    var seg = parseInt(timeSplit[1]);
    var ms = parseInt(timeSplit[2]);
    var currentTime = min * 60 + seg + '.' + ms;
    var duration = jwplayer().getDuration();

    var percentage = (currentTime * 100) / duration;
    document.getElementById('diamondRed').style.visibility = 'visible';
    document.getElementById('diamondRed').style.left = (percentage) + '%';
}

function setDiamondRedAnnotation(time) {
    var timeSplit = time.split(":");
    var min = parseInt(timeSplit[0]);
    var seg = parseInt(timeSplit[1]);
    var ms = parseInt(timeSplit[2]);
    var currentTime = min * 60 + seg + '.' + ms;
    var duration = jwplayer().getDuration();

    var percentage = (currentTime * 100) / duration;
    document.getElementById('diamondRed').style.visibility = 'visible';
    document.getElementById('diamondRed').style.left = (percentage) + '%';
}

function setDiamondBlueAnnotation(time) {
    var timeSplit = time.split(":");
    var min = parseInt(timeSplit[0]);
    var seg = parseInt(timeSplit[1]);
    var ms = parseInt(timeSplit[2]);
    var currentTime = min * 60 + seg + '.' + ms;
    var duration = jwplayer().getDuration();
    var percentage = (currentTime * 100) / duration;
    document.getElementById('diamondBlue').style.visibility = 'visible';
    document.getElementById('diamondBlue').style.left = (percentage) + '%';
}

function unSetDiamondRed() {
    document.getElementById('diamondRed').style.visibility = 'hidden';
    document.getElementById('diamondRed').style.left = (0) + '%';
}