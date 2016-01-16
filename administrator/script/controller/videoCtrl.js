'use strict';

angular.module('videoApp')

    .controller('videoCtrl', ['$scope',
                            '$location',
                            '$http',
                            function($scope, $location, $http)
    {

        $scope.item = "Video";

         //LISTAR MODEL
        $http.get('http://localhost/Video_Cat/controller-be/model.php?accion=listar').success(function(data)
        {
            $scope.models = data;

        });

        //LISTAR HOSPITAL
        $http.get('http://localhost/Video_Cat/controller-be/hospital.php?accion=listar').success(function(data)
        {
            $scope.hospitals = data;

        });


        //LISTAR VIDEO
        $http.get('http://localhost/Video_Cat/controller-be/video.php?accion=listar').success(function(data)
        {
            $scope.videos = data;

        });


        //ORDENAR 
        $scope.ordenarPor = function(orden)
        {
            $scope.ordenSeleccionado = orden;
        };

        $scope.listarVideo = function()
        {
            //LISTAR VIDEO
            $http.get('http://localhost/Video_Cat/controller-be/video.php?accion=listar').success(function(data)
            {
                $scope.videos = data;

            });


        };


        //REGISTRAR VIDEO
        $scope.registrarVideo = function()
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/video.php?accion=registrar", {cClinicHistory: $scope.clinicHistory,cDateRecorded: $scope.dateRecorded,cAge: $scope.age,cExam: $scope.exam,cGende: $scope.gende,cDateRegistry: $scope.dateRegistry, cState: $scope.state, cFileLink: $scope.fileLink,cModel: $scope.model,cHospital: $scope.hospital });
            Registro.success(function(respuesta)
            {
                Registro.log(respuesta);
            });

            //LISTAR VIDEO
            $http.get('http://localhost/Video_Cat/controller-be/video.php?accion=listar').success(function(data)
            {
                $scope.videos = data;

            });


        };


        //EDITAR VIDEO
        $scope.editarVideo = function(codigoVideo)
        {
            alert(codigoVideo);
        };


        //ELIMINAR VIDEO
         $scope.eliminarVideo = function(codigoVideo)
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/video.php?accion=eliminar", {idvideo: codigoVideo});
            $location.url('/video');


            //LISTAMOS PARA QUE SE ACTUALICE LA NUEVA LISTA
            $http.get('http://localhost/Video_Cat/controller-be/video.php?accion=listar').success(function(data)
            {
                $scope.videos = data;
            });
        };

    }]);