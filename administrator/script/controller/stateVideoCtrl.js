'use strict';

angular.module('videoApp')

    .controller('stateVideoCtrl', ['$scope',
                            '$location',
                            '$http',      
                            function($scope, $location, $http)
    {

        $scope.item = "State Video";

        //LISTAR STATE VIDEO
        $http.get('http://localhost/Video_Cat/controller-be/stateVideo.php?accion=listar').success(function(data)
        {
            $scope.stateVideos = data;

        });

        $scope.listarStateVideo = function()
        {
            //LISTAR STATE VIDEO
            $http.get('http://localhost/Video_Cat/controller-be/stateVideo.php?accion=listar').success(function(data)
            {
                $scope.stateVideos = data;

            });

        };


        //REGISTRAR STATEVIDEO
        $scope.RegistrarStateVideo = function()
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/stateVideo.php?accion=registrar", {cStateVideo: $scope.stateVideo});
            Registro.success(function(respuesta)
            {
                Registro.log(respuesta);
            });
;
            $scope.stateVideo = "";

            //LISTAR STATE VIDEO
            $http.get('http://localhost/Video_Cat/controller-be/stateVideo.php?accion=listar').success(function(data)
            {
                $scope.stateVideos = data;

            });

        };


        //EDITAR STATEVIDEO
        $scope.editarStateVideo = function(codigoStateVideo)
        {
            alert(codigoStateVideo);
        };


        //ELIMINAR STATEVIDEO
         $scope.eliminarStateVideo = function(codigoStateVideo)
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/stateVideo.php?accion=eliminar", {idstateVideo: codigoStateVideo});
            $location.path('/stateVideo');

            //LISTAR STATE VIDEO PARA QUE SE ACTUALICE
            $http.get('http://localhost/Video_Cat/controller-be/stateVideo.php?accion=listar').success(function(data)
            {
                $scope.stateVideos = data;

            });
        };


        $scope.obtenerDatos = function(IdStateVideoPar){
            $http.post('http://localhost/Video_Cat/controller-be/stateVideo.php?accion=Editar', {nCodigo: IdStateVideoPar }).success(function(data)
            {
            //Como solo obtengo un registro automaticamente asumo la primera posición

            $scope.br = data;
            $scope.codigoStateVideo = $scope.br[0]['idstatevideo'];
            $scope.stateVideoEdit = $scope.br[0]['description'];
        });

        };

        $scope.EditarStateVideo=function(){
            var Modifico = $http.post("http://localhost/Video_Cat/controller-be/stateVideo.php?accion=actualizar", {
                cCodigo: $scope.codigoStateVideo,
                cDescripcion: $scope.stateVideoEdit});
            Modifico.success(function(respuesta)
            {
                $scope.listarStateVideo();
            });
        }

    }]);