function normalButton(){
    if (isAnnotable){
        if(annotationEditMode && eBlue && eRed && currentVideo!==-1){
            bootbox.confirm("Are you sure you want to edit this annotation?", function(result) {            
                if (result && eBlue && eRed && currentVideo!==-1) {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            annotationEditMode = false;
                            unSetAnnotation();
                            removeAnnotations();
                            loadAnnotations();
                            annotationAlert(true);
                        }
                    }
                    xmlhttp.open("GET", "../php/editAnnotation.php?starttime="+nBlue+"&endtime="+nRed+"&curVideo="+currentVideo+"&diagnosis=1&idannotation="+curAnnotation , true);
                    xmlhttp.send();
                }
            });
        } else{
            if(eBlue && eRed && currentVideo!==-1){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        unSetAnnotation();
                        removeAnnotations();
                        loadAnnotations();
                        annotationAlert(false);
                    }
                }
                xmlhttp.open("GET", "../php/annotation.php?blue="+nBlue+"&red="+nRed+"&diagnosis=1&curVideo="+currentVideo , true);
                xmlhttp.send();
            }
        }
    }else{
        notAnnotableAlert();
    }
}

function polypButton(){
    if(isAnnotable){
        if(annotationEditMode && eBlue && eRed && currentVideo!==-1){
            bootbox.confirm("Are you sure you want to edit this annotation?", function(result) {            
                if (result && eBlue && eRed && currentVideo!==-1) {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            annotationEditMode = false;
                            unSetAnnotation();
                            removeAnnotations();
                            loadAnnotations();
                            annotationAlert(true);
                        }
                    }
                    xmlhttp.open("GET", "../php/editAnnotation.php?starttime="+nBlue+"&endtime="+nRed+"&curVideo="+currentVideo+"&diagnosis=2&idannotation="+curAnnotation , true);
                    xmlhttp.send();
                }
            });
        } else{
            if(eBlue && eRed && currentVideo!==-1){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        unSetAnnotation();
                        removeAnnotations();
                        loadAnnotations();
                        annotationAlert(false);
                    }
                }
                xmlhttp.open("GET", "../php/annotation.php?blue="+nBlue+"&red="+nRed+"&diagnosis=2&curVideo="+currentVideo , true);
                xmlhttp.send();
            }
        }
    }else{
        notAnnotableAlert();
    }
}

function cancerButton(){
    if (isAnnotable) {
        if(annotationEditMode && eBlue && eRed && currentVideo!==-1){
            bootbox.confirm("Are you sure you want to edit this annotation?", function(result) {            
                if (result && eBlue && eRed && currentVideo!==-1) {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            annotationEditMode = false;
                            unSetAnnotation();
                            removeAnnotations();
                            loadAnnotations();
                            annotationAlert(true);
                        }
                    }
                    xmlhttp.open("GET", "../php/editAnnotation.php?starttime="+nBlue+"&endtime="+nRed+"&curVideo="+currentVideo+"&diagnosis=3&idannotation="+curAnnotation , true);
                    xmlhttp.send();
                }
            });
        } else{
            if(eBlue && eRed && currentVideo!==-1){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        unSetAnnotation();
                        removeAnnotations();
                        loadAnnotations();
                        annotationAlert(false);
                    }
                }
                xmlhttp.open("GET", "../php/annotation.php?blue="+nBlue+"&red="+nRed+"&diagnosis=3&curVideo="+currentVideo , true);
                xmlhttp.send();
            }
        }
    }else{
        notAnnotableAlert();
    }
}

function discardButton(){
    if (isAnnotable) {
        if(annotationEditMode && eBlue && eRed && currentVideo!==-1){
            bootbox.confirm("Are you sure you want to edit this annotation?", function(result) {            
                if (result && eBlue && eRed && currentVideo!==-1) {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            annotationEditMode = false;
                            unSetAnnotation();
                            removeAnnotations();
                            loadAnnotations();
                            annotationAlert(true);
                        }
                    }
                    xmlhttp.open("GET", "../php/editAnnotation.php?starttime="+nBlue+"&endtime="+nRed+"&curVideo="+currentVideo+"&diagnosis=4&idannotation="+curAnnotation , true);
                    xmlhttp.send();
                }
            });
        } else{
            if(eBlue && eRed && currentVideo!==-1){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        unSetAnnotation();
                        removeAnnotations();
                        loadAnnotations();
                        annotationAlert(false);
                    }
                }
                xmlhttp.open("GET", "../php/annotation.php?blue="+nBlue+"&red="+nRed+"&diagnosis=4&curVideo="+currentVideo , true);
                xmlhttp.send();
            }
        }   
    }else{
        notAnnotableAlert();
    }
}

function annotationAlert(modify){
    if(modify)
        bootbox.alert("The annotation has been changed successfully!");
    else{
        bootbox.alert("The annotation has been added successfully!");
        undable = true;
        if (document.getElementById("span-video-"+currentVideo).className === "glyphicon glyphicon-time") {
            change2Suspend();
        }
    }
    setTimeout(function(){bootbox.hideAll();},2000);    
}

function loadAnnotations(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var ids = xmlhttp.responseText.split("_")[0].split(";");
            var diagnosis_ids = xmlhttp.responseText.split("_")[1].split(";");
            var listAnnotations = document.getElementById("annotationList");

            for (var i = 0; i < ids.length-1; i++) {
                var newLI = document.createElement("LI"); 
                var newA = document.createElement("A");
                var idAnnotation = ids[i];

                newA.innerHTML = "Ann-"+(i+1);
                newA.id = "ann_"+ids[i];
                newA.setAttribute("title",(diagnosis_ids[i] == '2' ? "Polyp Annotation" : (diagnosis_ids[i] == '3' ? "Cancer Annotation" : (diagnosis_ids[i] == '4' ? "Discard Annotation" : "Normal Annotation"))));
                newA.style.color = (diagnosis_ids[i] == "2" ? 'rgb(218, 165, 32)' : (diagnosis_ids[i] == "3" ? 'rgb(165, 42, 42)' : (diagnosis_ids[i] == "4" ? 'rgb(100, 149, 237)' : "")));
                newA.onclick = function(){//function for each <li> annotation
                    if(jwplayer().getState() === 'PAUSED'){
                        if(this.style.color === "white"){
                            var titulo = this.title.split(" ")[0]; 
                            $('#'+this.id).css("color",titulo == "Polyp" ? 'rgb(218, 165, 32)' : (titulo == "Cancer" ? 'rgb(165, 42, 42)' : (titulo == "Discard" ? 'rgb(100, 149, 237)' : "")));
                            $('#'+this.id).css("background-color","");                            
                            unSetAnnotation();
                            annotationEditMode = false;
                        }else{
                            if(annotationEditMode){
                                unSetActiveAnnotation();
                            }
                            $('#'+this.id).css("background-color","red");
                            $('#'+this.id).css("color","white");
                            unSetAnnotation();
                            var xmlhttp = new XMLHttpRequest();
                            var idAnn = this.id.split("_")[1];
                            curAnnotation = idAnn;
                            xmlhttp.onreadystatechange = function() {
                                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                    annotationEditMode = true;
                                    var times = xmlhttp.responseText.split("-");
                                    nBlue = times[0]; eBlue = true;
                                    nRed = times[1]; eRed = true;
                                    setDiamondBlueAnnotation(nBlue);
                                    setDiamondRedAnnotation(nRed);
                                    findAndSetBorder(times[0], times[1]);
                                }
                            }
                            xmlhttp.open("GET", "../php/getInfoAnnotation.php?idAnnotation="+idAnn, true);
                            xmlhttp.send();
                        }
                    }//Fin if is PAUSED
                };//Fin Onclick

                newLI.setAttribute("class","pointer-item");
                newLI.appendChild(newA);
                listAnnotations.appendChild(newLI);

            }//Fin del for
        }//Fin del if
    }
    xmlhttp.open("GET", "../php/getAnnotations.php?curVideo="+currentVideo , true);
    xmlhttp.send();
}

function removeAnnotations(){
    var element = document.getElementById("annotationList");
    while (element.firstChild)
      element.removeChild(element.firstChild);
}

function unSetActiveAnnotation(){
    var elements = document.getElementById("annotationList").childNodes;
    for (var i = 0; i < elements.length; i++) {
        elements[i].childNodes[0].style.color = "";
        elements[i].childNodes[0].style.backgroundColor = "";
    };
}