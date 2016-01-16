var pauseOnSeek = false;
var changeThumbnails = true;
var isAnnotable = true;
var currentVideo = -1;
var speedInterval;
var undable = false;
var _idVideo = -1;

window.onload = function(){
	$("#firstCol").hide();
};

function setVideo(urlVideo,idVideo,annotable,lastTimeVideo){
	var id = urlVideo+";"+idVideo+";"+annotable+";"+lastTimeVideo
	_idVideo = idVideo;
	isAnnotable = annotable;
	undable = false;
	$("#message").hide();
	$("#firstCol").show();
	currentVideo = idVideo;
	resetFrames();
	unSetAnnotation();
	removeAnnotations();
	loadAnnotations();
	loadPatienteInfo();
	SetActiveVideo();

	jwplayer('player').setup({
		'file' : urlVideo,
		'image': "assets/generic-thumbnail.png",
		'width': "90%",
		'aspectratio': "16:9",
		'controls': 'false'
	});

	jwplayer().onTime(function (event) {
		if (pauseOnSeek) {
			pauseOnSeek = false;
			changeThumbnails = false;
			this.pause();
		} else {
			changeThumbnails = true;
			updateProgressBar();
		}

		if(((jwplayer().getPosition() + "").split('.')[0] % 5) === 0){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //acciones
            }
        }
        var adjustTime = (jwplayer().getPosition() + "").split('.')[0] + '.' + fiveDistance((jwplayer().getPosition() + "").split('.')[1]);
        var time = toStringTime(adjustTime);
        xmlhttp.open("GET", "../php/changeLastTime.php?curVideo="+currentVideo+"&newLastTime="+time, true);
        xmlhttp.send();
    }
});

	jwplayer().onIdle(function (event) {
		alert("idle");
	});

	jwplayer().onPause(function (event) {
		if (changeThumbnails) {
			var adjustTime = (jwplayer().getPosition() + "").split('.')[0] + '.' + fiveDistance((jwplayer().getPosition() + "").split('.')[1]);
			var time = toStringTime(adjustTime);
			loadTimes(time);

			var duration = jwplayer().getDuration();
			pauseOnSeek = true;
			jwplayer().seek(adjustTime);
			updateProgressBar();
			document.getElementById("spanTime").innerHTML = toStringTime(adjustTime + "") + " / " + toStringTime(duration + "");
		}
	});


					//Restore last time video
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() {
						if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
							var lasttime = xmlhttp.responseText;
							if(lasttime !== '00:00:00'){
								setLastTime(lasttime);
							}
				        }
			        }
			        xmlhttp.open("GET", "../php/getLastTimeVideo.php?idVideo="+currentVideo, true);
    				xmlhttp.send();
    				//Restore last time video
}

function fiveDistance(mili) {
	if (mili >= 0 && mili <= 1)
		return 0;
	if (mili >= 2 && mili <= 3)
		return 25;
	if (mili >= 4 && mili <= 6)
		return 5;
	if (mili >= 7 && mili <= 9)
		return 75;
	return 0;
}

function toStringTime(time) {
	var splitTime = time.split(".");
	var m = ((splitTime[0] / 60) + "").split(".")[0];
	var s = splitTime[0] % 60;
	var ms = splitTime[1] === undefined ? '00' : ((splitTime[1] < 10) ? (splitTime[1] + '0') : splitTime[1]);
	m = m < 10 ? '0' + m : m;
	s = s < 10 ? '0' + s : s;
	ms = ms.length < 2 ? ms + '0' : ms;
	return m + ":" + s + ":" + ms;
}

function getNumberOfFrame(time) {
	var timeSplit = time.split(":");
	var min = parseInt(timeSplit[0]);
	var seg = parseInt(timeSplit[1]);
	var ms = parseInt(timeSplit[2]);
	var numFrame = (min * 600) + (seg * 10) + (ms / 10);
	var nFrame = (numFrame + "").split('.');
	return nFrame[0];
}

function playFunction() {
	if (jwplayer().getState() === 'PLAYING') {
		$("#icon-play").show();
		$("#icon-pause").hide();
		jwplayer().play(false);
		jwplayer().pause(true);
	} else if (jwplayer().getState() === 'PAUSED') {
		$("#icon-play").hide();
		$("#icon-pause").show();
		jwplayer().play(true);
		jwplayer().pause(false);
	} else if (jwplayer().getState() === 'IDLE') {
		$("#icon-play").hide();
		$("#icon-pause").show();
		jwplayer().play(true);
		jwplayer().pause(false);
	}
}

function speedChange() {
	var speed = document.getElementById('speed').innerHTML;
	if (speed === '8x') {
		document.getElementById('speed').innerHTML = '2x';
	} else {
		var n = speed.substring(0, 1);
		document.getElementById('speed').innerHTML = (2 * n) + 'x';
	}
}

function forwardFunction() {
	if (jwplayer().getState() !== 'IDLE') {
		if ($("#icon-forward").is(":hidden")) {
			$("#icon-forward").show();
			$("#icon-pause-forward").hide();
			clearInterval(speedInterval);
			$("#icon-play").hide();
			$("#icon-pause").show();
		}else{
			$("#icon-forward").hide();
			$("#icon-pause-forward").show();
			$("#icon-play").show();
			$("#icon-pause").hide();

			var numSpeed = parseInt(document.getElementById("speed").innerHTML.substr(0, 1));
			var position = jwplayer().getPosition();
			var duration = jwplayer().getDuration();
			speedInterval = setInterval(function(){
				position += numSpeed;
				var adjustTime = (position+"").split('.')[0] + '.' + fiveDistance((position+"").split('.')[1]);
				jwplayer().seek(adjustTime);
				updateProgressBar();
				document.getElementById("spanTime").innerHTML = toStringTime(adjustTime + "") + " / " + toStringTime(duration + "");
			},500);
		}
	}
}

function backwardFunction() {
	if (jwplayer().getState() !== 'IDLE') {
		if ($("#icon-backward").is(":hidden")) {
			$("#icon-backward").show();
			$("#icon-pause-backward").hide();
			clearInterval(speedInterval);
			$("#icon-play").hide();
			$("#icon-pause").show();
		}else{
			$("#icon-backward").hide();
			$("#icon-pause-backward").show();
			$("#icon-play").show();
			$("#icon-pause").hide();

			var numSpeed = parseInt(document.getElementById("speed").innerHTML.substr(0, 1));
			var position = jwplayer().getPosition();
			var duration = jwplayer().getDuration();
			speedInterval = setInterval(function(){
				position -= numSpeed;
				var adjustTime = (position+"").split('.')[0] + '.' + fiveDistance((position+"").split('.')[1]);
				jwplayer().seek(adjustTime);
				updateProgressBar();
				document.getElementById("spanTime").innerHTML = toStringTime(adjustTime + "") + " / " + toStringTime(duration + "");
			},500);
		}
	}
}

function updateProgressBar() {
	var duration = jwplayer().getDuration();
	var currentTime = jwplayer().getPosition();
	var percentage = ((100 / duration) * currentTime);
	$('#progressbarVideo').css('width', percentage + '%').attr('aria-valuenow', percentage);
	document.getElementById("spanTime").innerHTML = toStringTime(currentTime + "") + " / " + toStringTime(duration + "");
}

$("#progressBarPpal").click(function (event) {
	var pBar = $("#progressBarPpal");
	var pLeft = pBar.offset().left;
	var pWidth = pBar.width();
	var posX = event.pageX;
	var percentage = ((posX - pLeft) * 100) / pWidth;
	var duration = jwplayer().getDuration();
	var playerTime = ((percentage * duration) / 100).toFixed(1);
	var adjustTime = (playerTime + "").split('.')[0] + '.' + fiveDistance((playerTime + "").split('.')[1]);
	playerTime = adjustTime;

	if (jwplayer().getState() === "PAUSED") {
		pauseOnSeek = true;
		jwplayer().seek(playerTime);
		var time = toStringTime(playerTime);
		loadTimes(time);
		document.getElementById("spanTime").innerHTML = toStringTime(playerTime + "") + " / " + toStringTime(duration + "");
		$('#progressbarVideo').css('width', percentage + '%').attr('aria-valuenow', percentage);
	} else if (jwplayer().getState() === "PLAYING") {
		jwplayer().seek(playerTime);
		document.getElementById("spanTime").innerHTML = toStringTime(playerTime + "") + " / " + toStringTime(duration + "");
		$('#progressbarVideo').css('width', percentage + '%').attr('aria-valuenow', percentage);
	}
});

function loadPatienteInfo(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var info = xmlhttp.responseText.split(";");
			document.getElementById("clinic-info").innerHTML = info[0];
			document.getElementById("exam-info").innerHTML = info[1];
			document.getElementById("age-info").innerHTML = info[2];
			document.getElementById("genre-info").innerHTML = info[3];
			document.getElementById("hospital-info").innerHTML = info[4];
		}
	}
	xmlhttp.open("GET", "../php/getPatientInformation.php?curVideo="+currentVideo , true);
	xmlhttp.send();
}

function setLastTime(lastTimeVideo){
	var timeSplit = lastTimeVideo.split(":");
	var min = parseInt(timeSplit[0]);
	var seg = parseInt(timeSplit[1]);
	var ms = parseInt(timeSplit[2]);
	var duration = jwplayer().getDuration();
	var playerTime = min * 60 + seg + '.' + ms;

	pauseOnSeek = true;
	jwplayer().seek(playerTime);   
	updateProgressBar();
	document.getElementById("spanTime").innerHTML = toStringTime(playerTime + "") + " / " + toStringTime(duration + "");
}

function SetActiveVideo(){
    var elements = document.getElementById("playlist").getElementsByTagName("li");
    for (var i = 0; i < elements.length; i++) {
    	if (elements[i].id.indexOf(currentVideo+"") === 0) {
    		elements[i].getElementsByTagName("a")[0].style.color = "WHITE";
        	elements[i].getElementsByTagName("a")[0].style.backgroundColor = "RED";
    	}else{
    		elements[i].getElementsByTagName("a")[0].style.color = "";
        	elements[i].getElementsByTagName("a")[0].style.backgroundColor = "";
    	}
    };
}