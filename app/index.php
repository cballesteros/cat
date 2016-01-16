<?php
session_start();
ob_start();
include_once('../php/config.php');
if(!isset($_SESSION["idPerson"])){
    header("Location: /index.html");
}
$id = $_SESSION["idPerson"];
$query_videos = "SELECT * FROM allocation, video WHERE idperson='".$id."' AND allocation.idvideo = video.idvideo";
$result_videos = $mysqli->query($query_videos);
$processing = 0;
$pending = 0;
$processed = 0;
?>
<!DOCTYPE html>
<html>
<head>
    <title>CAT - <?php echo $_SESSION["namePerson"]; ?></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/general-style.css" rel="stylesheet">
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" >
    <link href="css/menu-bar-rigth.css" rel="stylesheet">
    <link href="css/bootstrap-switch.css" rel="stylesheet">
</head>
<body>
    <div id="wrapper" class="active">
        <div id="sidebar-wrapper">
            <ul id="sidebar_menu" class="sidebar-nav">
                <li class="sidebar-brand"><a id="menu-toggle" href="#">CAT<span id="main_icon" class="glyphicon glyphicon-home"></span></a></li>
            </ul>
            <ul class="sidebar-nav" id="sidebar">     
                <li class="pointer-item"><a id="videos">Videos<span class="sub_icon fa fa-list fa-lg"></span></a></li>
                <li>
                    <div id="playlist" style="display: none; text-align: center;">
                        <ul id ="videosList" class="sidebar-nav">
                            <?php
                            while ($row = $result_videos->fetch_assoc()) {
                                $idLI = $row["idvideo"]."';'".$row["idstatevideo"]."';'".$row["link"]."';'".$row["lastTime"];
                                $argument = $row["link"]."','".$row["idvideo"]."','".($row["idstatevideo"] == 3 ? false : true)."','".$row["lastTime"];
                                $videoOnClick = "setVideo('".$argument."')";
                                $class_li_video = " class=pointer-item";
                                $icon_video = " <span id=span-video-".$row["idvideo"]." class= ".($row["idstatevideo"] == 1 ? "'glyphicon glyphicon-pause'" : ($row["idstatevideo"] == 2 ? "'glyphicon glyphicon-time'" : "'glyphicon glyphicon-ok-sign'"))."></span>";
                                $title_video = " title= '".($row["idstatevideo"] == 1 ? 'Annotation process is in progress' : ($row["idstatevideo"] == 2 ? 'Annotation process has not been done' : 'Annotation process is done'))."' ";
                                echo "<li id=".$idLI." ".$title_video.$class_li_video." onclick=".$videoOnClick."><a>Video ".$row["idvideo"].$icon_video."</a></li>";
                                switch ($row["idstatevideo"]) {
                                    case 1:
                                    $processing++;
                                    break;
                                    case 2:
                                    $pending++;
                                    break;
                                    case 3:
                                    $processed++;
                                    break;                                    
                                    default:
                                    break;
                                }
                            }?>
                        </ul>                            
                    </div>
                </li>
                <li class="pointer-item"><a id="annotations">Annotations<span class="sub_icon fa fa-bookmark fa-lg"></span></a></li>
                <li>
                    <div id="annotations-labels" style="display: none; text-align: center;">
                        <ul id="annotationList" class="sidebar-nav">
                            <!--<li><a>A1</a></li>-->
                        </ul>                            
                    </div>
                </li>
                <li class="pointer-item"><a id="doctor">Physician<span class="sub_icon fa fa-user-md fa-lg"></span></a></li>
                <li>
                    <div id="info-doctor" style="display: none; text-align: center; ">
                        <p id="doctor-name" style="font: bold italic large Palatino, serif; color: wheat;"><?php echo $_SESSION["namePerson"] ?></p>
                        <ul class="sidebar-nav">
                            <li><a><?php echo $pending?>    Pending <span class="glyphicon glyphicon-time"></span></a></li>
                            <li><a><?php echo $processing?> Suspend <span class="glyphicon glyphicon-pause"></span></a></li>
                            <li><a><?php echo $processed?>  Finished <span class="glyphicon glyphicon-ok-sign"></span></a></li>
                        </ul> 
                    </div>
                </li>
                <li class="pointer-item"><a id="patient">Patient<span class="sub_icon fa fa-user fa-lg"></span></a></li>
                <li>
                    <div id="info-patient" style="display: none; text-align: center;">
                        <ul class="sidebar-nav">
                            <li><a>Clinic History</a><span id="clinic-info" style="color: whitesmoke;"></span></li>
                            <li><a>Exam Reason</a><span id="exam-info" style="color: whitesmoke;"></span></li>
                            <li><a>Age</a><span id="age-info" style="color: whitesmoke;"><small>Years Old</small></span></li>
                            <li><a>Genre</a><span id="genre-info" style="color: whitesmoke;"></span></li>
                            <li><a id="hospital-info"></a></li>
                        </ul> 
                    </div>
                </li>
            </ul>
        </div>

        <!-- Page content -->
        <div id="page-content-wrapper">
            <!-- Keep all page content within the page-content inset div! -->
            <div class="page-content-inset">
                <div class="row">
                    <div id="nav-bar-top-left" class="col-xs-8 col-xs-offset-5 col-md-offset-9">
                        <a href="../php/closeSesion.php"><span id="span-nav-bar-top-left" class="fa fa-sign-out fa-xs"> Log out</span></a>
                        <span> | </span>
                        <a href=""><span id="span-nav-bar-top-left" class="fa fa-info-circle fa-xs"> Help</span></a>
                        <span> | </span>
                        <a href=""><span id="span-nav-bar-top-left" class="fa fa-exclamation-circle fa-xs"> Report a problem</span></a>
                    </div>
                    <div id="message" class="col-xs-3 col-xs-offset-4">
                        <div class="well">Please select a video</div>
                    </div>
                    <div id="firstCol" class="col-md-12">
                        <div id="content" class="container">
                            <div id="editor_div">
                                <div id="player">Loading the player...</div>
                                <div id="controls" class="well">
                                    <div id="playButton" class="btn-group btn-group-xs" role="group" aria-label="...">
                                        <button type="button" class="btn btn-default" onclick="playFunction()">
                                            <span id="icon-play" class="glyphicon glyphicon-play" aria-hidden="true"></span>
                                            <span id="icon-pause" class="glyphicon glyphicon-pause" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                    <div id="speedButtons" class="btn-group btn-group-xs" role="group" aria-label="...">
                                        <button type="button" class="btn btn-default" onclick="backwardFunction()">
                                            <span id="icon-backward" class="glyphicon glyphicon-backward" aria-hidden="true"></span>
                                            <span id="icon-pause-backward" class="glyphicon glyphicon-pause" aria-hidden="true"></span>
                                        </button>
                                        <button id="speed" type="button" class="btn btn-default" onclick="speedChange()">2x</button>
                                        <button type="button" class="btn btn-default" onclick="forwardFunction()">
                                            <span id="icon-forward" class="glyphicon glyphicon-forward" aria-hidden="true"></span>
                                            <span id="icon-pause-forward" class="glyphicon glyphicon-pause" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                    <div class="btn-group btn-group-lg">
                                        <span id="spanTime" class="label label-default">00:00:00 / 00:00:00</span>
                                        <!--<span class="fa fa-refresh fa-lg fa-spin" style="color: white;"></span>-->
                                    </div>
                                    <div id="annotationButtons" class="btn-group btn-group-xs" role="group" aria-label="...">
                                        <button type="button" class="btn btn-default" onclick="normalButton()">
                                            <span>Normal</span>
                                        </button>
                                        <button type="button" class="btn btn-default" onclick="polypButton()">
                                            <span>Polyp</span>
                                        </button>
                                        <button type="button" class="btn btn-default" onclick="cancerButton()">
                                            <span>Cancer</span>
                                        </button>
                                        <button type="button" class="btn btn-default" onclick="discardButton()">
                                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Discard
                                        </button>
                                    </div>

                                    <div id="controlSesionButtons" class="btn-group btn-group-xs" role="group" aria-label="...">
                                        <button type="button" class="btn btn-default" onclick="undoFunction()">
                                            <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span> Undo
                                        </button>
                                        <button type="button" class="btn btn-default" onclick="finishFunction()">
                                            <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Finish
                                        </button>
                                    </div>

                                    <div id="controlFramesButtons" class="btn-group btn-group-xs" role="group" aria-label="...">
                                        <button id="buttonPrev" type="button" class="btn btn-default" onclick="prevFrame()">
                                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                        </button>
                                        <button id="buttonNext" type="button" class="btn btn-default" onclick="nextFrame()">
                                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                        </button>
                                    </div>

                                    <div id="annotationSwitch" class="make-switch switch-mini"
                                    data-text-label="<i class='glyphicon glyphicon-bookmark'></i>"
                                    data-on-label="<i class='glyphicon glyphicon-ok'></i>"
                                    data-off-label="<i class='glyphicon glyphicon-remove'></i>">
                                    <input type="checkbox" checked>
                                </div>
                            </div><!-- Fin editor buttons-->
                        </div>

                        <div id="frames_div" class="container">
                            <div id="times1" class="row labelTime well">
                                <div id="time1" class="col-xs-1">00:00:00</div>
                                <div id="time2" class="col-xs-1">00:00:00</div>
                                <div id="time3" class="col-xs-1">00:00:00</div>
                                <div id="time4" class="col-xs-1">00:00:00</div>
                                <div id="time5" class="col-xs-1">00:00:00</div>
                                <div id="time6" class="col-xs-1">00:00:00</div>
                                <div id="time7" class="col-xs-1">00:00:00</div>
                                <div id="time8" class="col-xs-1">00:00:00</div>
                                <div id="time9" class="col-xs-1">00:00:00</div>
                                <div id="time10" class="col-xs-1">00:00:00</div>
                                <div id="time11" class="col-xs-1">00:00:00</div>
                                <div id="time12" class="col-xs-1">00:00:00</div>
                            </div>
                            <div class="row">
                                <div class="col-xs-1"><a id="ann1" href="#" class="thumbnail"><img id="img1" src="assets/generic-thumbnail.png" alt="thumbnail" onclick="setFunctionThumbnail(this)"></a></div>
                                <div class="col-xs-1"><a id="ann2" href="#" class="thumbnail"><img id="img2" src="assets/generic-thumbnail.png" alt="thumbnail" onclick="setFunctionThumbnail(this)"></a></div>
                                <div class="col-xs-1"><a id="ann3" href="#" class="thumbnail"><img id="img3" src="assets/generic-thumbnail.png" alt="thumbnail" onclick="setFunctionThumbnail(this)"></a></div>
                                <div class="col-xs-1"><a id="ann4" href="#" class="thumbnail"><img id="img4" src="assets/generic-thumbnail.png" alt="thumbnail" onclick="setFunctionThumbnail(this)"></a></div>
                                <div class="col-xs-1"><a id="ann5" href="#" class="thumbnail"><img id="img5" src="assets/generic-thumbnail.png" alt="thumbnail" onclick="setFunctionThumbnail(this)"></a></div>
                                <div class="col-xs-1"><a id="ann6" href="#" class="thumbnail"><img id="img6" src="assets/generic-thumbnail.png" alt="thumbnail" onclick="setFunctionThumbnail(this)"></a></div>
                                <div class="col-xs-1"><a id="ann7" href="#" class="thumbnail"><img id="img7" src="assets/generic-thumbnail.png" alt="thumbnail" onclick="setFunctionThumbnail(this)"></a></div>
                                <div class="col-xs-1"><a id="ann8" href="#" class="thumbnail"><img id="img8" src="assets/generic-thumbnail.png" alt="thumbnail" onclick="setFunctionThumbnail(this)"></a></div>
                                <div class="col-xs-1"><a id="ann9" href="#" class="thumbnail"><img id="img9" src="assets/generic-thumbnail.png" alt="thumbnail" onclick="setFunctionThumbnail(this)"></a></div>
                                <div class="col-xs-1"><a id="ann10" href="#" class="thumbnail"><img id="img10" src="assets/generic-thumbnail.png" alt="thumbnail" onclick="setFunctionThumbnail(this)"></a></div>
                                <div class="col-xs-1"><a id="ann11" href="#" class="thumbnail"><img id="img11" src="assets/generic-thumbnail.png" alt="thumbnail" onclick="setFunctionThumbnail(this)"></a></div>
                                <div class="col-xs-1"><a id="ann12" href="#" class="thumbnail"><img id="img12" src="assets/generic-thumbnail.png" alt="thumbnail" onclick="setFunctionThumbnail(this)"></a></div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div id="progressBarPpal" class="progress" style="width: 100%;">
                                        <div id="progressbarVideo" class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                                            <svg id="diamondBlue" height="20" width="10" style="z-index: 1; position: absolute;">
                                                <polygon points="6,0 10,10 6,20 2,10" style="fill:blue; stroke:black; stroke-width:1"/>
                                            </svg>
                                            <svg id="diamondRed" height="20" width="10" style="z-index: 2; position: absolute;">
                                                <polygon points="6,0 10,10 6,20 2,10" style="fill:red; stroke:black; stroke-width:1"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    </div>

</div>
<script src="js/jquery.js"></script>
<script src="js/bootbox.min.js"></script>
<script src="js/jwplayer.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/framesFunctions.js"></script>
<script src="js/playerFunctions.js"></script>
<script src="js/controlSesionFunctions.js"></script>
<script src="js/annotationFunctions.js"></script>
<script src="js/annotationButtons.js"></script>
<script src="js/sidebarFunctions.js"></script>
<script src="js/bootstrap-switch.js"></script>
</body>
</html>
