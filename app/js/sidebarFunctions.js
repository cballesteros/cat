/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
        $("#playlist").hide("blind");
        $("#annotations-labels").hide("blind");
        $("#info-doctor").hide("blind");
        $("#info-patient").hide("blind");
});

$("#videos").click(function(e) {
        e.preventDefault();
        if ($('#playlist').is(":hidden")){
            $("#playlist").show("blind");
            if (!$('#wrapper.active').length) {$("#wrapper").toggleClass("active");};
        }else{
            $("#playlist").hide("blind");
        }
});

$("#annotations").click(function(e) {
        e.preventDefault();
        if ($('#annotations-labels').is(":hidden")){
            $("#annotations-labels").show("blind");
            if (!$('#wrapper.active').length) {$("#wrapper").toggleClass("active");};
        }else{
            $("#annotations-labels").hide("blind");
        }
});

$("#doctor").click(function(e) {
        e.preventDefault();
        if ($('#info-doctor').is(":hidden")){
            $("#info-doctor").show("blind");
            if (!$('#wrapper.active').length) {$("#wrapper").toggleClass("active");};
        }else{
            $("#info-doctor").hide("blind");
        }
});

$("#patient").click(function(e) {
        e.preventDefault();
        if ($('#info-patient').is(":hidden")){
            $("#info-patient").show("blind");
            if (!$('#wrapper.active').length) {$("#wrapper").toggleClass("active");};
        }else{
            $("#info-patient").hide("blind");
        }
});


