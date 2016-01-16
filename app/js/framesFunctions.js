//Variables Globales
var eRed = false;
var eBlue = false;
var nRed = '00:00:00';
var nBlue = '00:00:00';
var pressTimer;
var countTimer;

function resetFrames(){
    eRed = false;
    eBlue = false;
    nRed = '00:00:00';
    nBlue = '00:00:00';
    for (var i = 1; i <= 12; i++) {
        document.getElementById('img'+i).src = 'assets/generic-thumbnail.png';
        document.getElementById("time" + i).innerHTML = '00:00:00';
    };
    document.getElementById("spanTime").innerHTML = '00:00:00 / 00:00:00';
    $('#progressbarVideo').css('width', 0 + '%').attr('aria-valuenow', 0);
}

function loadFrame(frame, pos) {
    document.getElementById('img' + pos).src = 'thumbnails/'+_idVideo+'/img' + (frame) + '.jpg';
    cleanBorders();
    findAndSetBorder(nBlue, nRed);
    //if (eRed && eBlue) completeThumbnails(nBlue, nRed);
}

function loadTimes(time) {
    var timeSplit = time.split(":");
    var min = parseInt(timeSplit[0]);
    var seg = parseInt(timeSplit[1]);
    var ms = parseInt(timeSplit[2]);

    if (getNumberOfFrame(time)>=15) {

        document.getElementById("time" + 6).innerHTML = time;
        loadFrame(getNumberOfFrame(time), 6);

        var a = min;
        var b = seg;
        var c = ms;
        for (var i = 5; i >= 1; i--) {
            if (c <= 0 || (c - 25) < 0) {
                c = 75;
                if (b <= 0) {
                    b = 59;
                    if (a <= 0) {
                        a = 59;
                    } else {
                        a -= 1;
                    }
                } else {
                    b -= 1;
                }
            } else {
                c -= 25;
            }
            var newTime = (a < 10 ? '0' + a : a) + ':' + (b < 10 ? '0' + b : b) + ':' + (c < 10 ? '0' + c : c);
            document.getElementById("time" + i).innerHTML = newTime;
            loadFrame(getNumberOfFrame(newTime), i);
        }

        var a = min;
        var b = seg;
        var c = ms;
        for (var i = 7; i <= 12; i++) {
            if (c >= 75 || (c + 25) >= 100) {
                c = 0;
                if (b >= 59) {
                    b = 0;
                    if (a >= 59) {
                        a = 0;
                    } else {
                        a += 1;
                    }
                } else {
                    b += 1;
                }
            } else {
                c += 25;
            }
            var newTime = (a < 10 ? '0' + a : a) + ':' + (b < 10 ? '0' + b : b) + ':' + (c < 10 ? '0' + c : c);
            document.getElementById("time" + i).innerHTML = newTime;
            loadFrame(getNumberOfFrame(newTime), i);
        }
    }
}//Fin loadTimes

function nextFrame() {
    if (jwplayer().getState() === "PAUSED") {
        var currentStringTime = document.getElementById("time6").innerHTML;

        var timeSplit = currentStringTime.split(":");
        var min = parseInt(timeSplit[0]);
        var seg = parseInt(timeSplit[1]);
        var ms = parseInt(timeSplit[2]);
        if (ms >= 75) {
            ms = 0;
            if (seg >= 59) {
                seg = 0;
                if (min >= 59) {
                    min = 0;
                } else {
                    min += 1;
                }
            } else {
                seg += 1;
            }
        } else {
            ms += 25;
        }
        loadTimes((min < 10 ? '0' + min : min) + ':' + (seg < 10 ? '0' + seg : seg) + ':' + (ms < 10 ? '0' + ms : ms));
    }
}

function prevFrame() {
    if (jwplayer().getState() === "PAUSED") {
        var currentStringTime = document.getElementById("time6").innerHTML;

        var timeSplit = currentStringTime.split(":");
        var min = parseInt(timeSplit[0]);
        var seg = parseInt(timeSplit[1]);
        var ms = parseInt(timeSplit[2]);
        if (ms <= 0) {
            ms = 75;
            if (seg <= 0) {
                seg = 59;
                if (min <= 0) {
                    min = 59;
                } else {
                    min -= 1;
                }
            } else {
                seg -= 1;
            }
        } else {
            ms -= 25;
        }
        loadTimes((min < 10 ? '0' + min : min) + ':' + (seg < 10 ? '0' + seg : seg) + ':' + (ms < 10 ? '0' + ms : ms));
    }
}

function setFunctionThumbnail(thumbnail) {
    var numId = thumbnail.id.substring(thumbnail.id.lastIndexOf('g') + 1, thumbnail.id.length);
    if (document.getElementById("time"+numId).innerHTML !== '00:00:00') {
        var dataSwitch = $('#annotationSwitch').bootstrapSwitch('status');
        if (dataSwitch) {
            if (isAnnotable){
                setAnnotation(thumbnail);
            }else{
                notAnnotableAlert();
            }
        } else {
            setTimeVideoPlayer(thumbnail);
        }
    }
}

function notAnnotableAlert(){
    bootbox.alert("The annotation process has been done!");
    setTimeout(function(){bootbox.hideAll();},2000);
}

function setTimeVideoPlayer(thumbnail) {
    var numId = thumbnail.id.substring(thumbnail.id.lastIndexOf('g') + 1, thumbnail.id.length);
    var timeSplit = document.getElementById("time" + numId).innerHTML.split(":");
    var min = parseInt(timeSplit[0]);
    var seg = parseInt(timeSplit[1]);
    var ms = parseInt(timeSplit[2]);

    var playerTime = min * 60 + seg + '.' + ms;

    if (jwplayer().getState() === "PAUSED"
            && (document.getElementById("spanTime").innerHTML.substring(0, 8) !== document.getElementById("time" + numId).innerHTML)) {
        var duration = jwplayer().getDuration();
        pauseOnSeek = true;
        jwplayer().seek(playerTime);
        updateProgressBar();
        document.getElementById("spanTime").innerHTML = toStringTime(playerTime + "") + " / " + toStringTime(duration + "");
    }
}

$("#buttonNext").mouseup(function () {
    clearTimeout(pressTimer);
    clearInterval(countTimer);
    // Clear timeout
    return false;
}).mousedown(function () {
    // Set timeout
    pressTimer = window.setTimeout(function () {
        countTimer = window.setInterval(function () {
            nextFrame();
        }, 200);
    }, 200);
    return false;
});

$("#buttonPrev").mouseup(function () {
    clearTimeout(pressTimer);
    clearInterval(countTimer);
    // Clear timeout
    return false;
}).mousedown(function () {
    // Set timeout
    pressTimer = window.setTimeout(function () {
        countTimer = window.setInterval(function () {
            prevFrame();
        }, 200);
    }, 200);
    return false;
});