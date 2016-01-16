function finishFunction(){
	bootbox.confirm("Are you sure you want to finish this annotation process?", function(result) {            
		if (result) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					isAnnotable = true;
					$("#message").show();
					$("#firstCol").hide();
					currentVideo = -1;
					resetFrames();
					unSetAnnotation();
					removeAnnotations();
					removeVideos();
					loadVideos();
				}
			}
			xmlhttp.open("GET", "../php/changeState.php?curVideo="+currentVideo+"&newState=3", true);
			xmlhttp.send();
		}
	});	
}

function change2Suspend(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("span-video-"+currentVideo).className = "glyphicon glyphicon-pause";
		}
	}
	xmlhttp.open("GET", "../php/changeState.php?curVideo="+currentVideo+"&newState=1", true);
	xmlhttp.send();
}

function undoFunction () {
	if(undable){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				removeAnnotations();
				loadAnnotations();
				undable = false;
				bootbox.alert("The last annotation has been deleted successfully!");
				setTimeout(function(){bootbox.hideAll();},2000);
			}
		}
		xmlhttp.open("GET", "../php/deleteLastAnnotation.php", true);
		xmlhttp.send();	
	}
}

function loadVideos(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var listVideos = document.getElementById("playlist");
			var allInfos = xmlhttp.responseText.split("_");
			for (var i = 0; i < allInfos.length-1; i++) {
				var infoVideo = allInfos[i].split(";");
				var newLI = document.createElement("li"); 
				var newA = document.createElement("a");
				var newSpan = document.createElement("span");
				var idStateVideo = infoVideo[1];
				var link = infoVideo[2];

				newSpan.id = "span-video-"+infoVideo[0];
				newLI.id = allInfos[i];
				newLI.title = (idStateVideo == 1 ? 'Annotation process is in progress' : (idStateVideo == 2 ? 'Annotation process has not been done' : 'Annotation process is done'));
				newLI.setAttribute("class","pointer-item");
				newSpan.setAttribute("class",(idStateVideo == 1 ? "glyphicon glyphicon-pause" : (idStateVideo == 2 ? "glyphicon glyphicon-time" : "glyphicon glyphicon-ok-sign")));
				newA.innerHTML = "Video "+(i+1);

				newLI.onclick = function(){
					isAnnotable = (this.id.split(";")[1] == 3 ? false : true);
					undable = false;
					$("#message").hide();
					$("#firstCol").show();
					currentVideo = this.id.split(";")[0];
					resetFrames();
					unSetAnnotation();
					removeAnnotations();
					loadAnnotations();
					loadPatienteInfo();
					SetActiveVideo();

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

    				jwplayer('player').setup({
    					'file' : this.id.split(";")[2],
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
    					updateProgressBar();
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
                }//Fin Onclick

                newA.appendChild(newSpan);
                newLI.appendChild(newA);
                listVideos.appendChild(newLI);
            }
        }
    }
    xmlhttp.open("GET", "../php/getVideos.php", true);
    xmlhttp.send();
}

function removeVideos(){
	var element = document.getElementById("playlist");
	while (element.firstChild)
		element.removeChild(element.firstChild);
}