'use strict';

angular.module('videoApp')

    .controller('diagnosisVideoCtrl', ['$scope',
                            '$location',
                            '$http',
                            function($scope, $location, $http)
    {

        $scope.item = "Diagnosis Video";

        //LISTAR DIAGNOSIS VIDEOS
        $http.get('http://localhost/Video_Cat/controller-be/diagnosisVideo.php?accion=listar').success(function(data)
        {
            $scope.diagnosisVideos = data;

        });

        $scope.listarDiagnosisVideo = function()
        {
            //LISTAR DIAGNOSIS VIDEOS
            $http.get('http://localhost/Video_Cat/controller-be/diagnosisVideo.php?accion=listar').success(function(data)
            {
                $scope.diagnosisVideos = data;

            });

        };


        //REGISTRAR BRAND
        $scope.RegistrarDiagnosisVideo = function()
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/diagnosisVideo.php?accion=registrar", {cDiagnosisVideo: $scope.diagnosisVideo});
            Registro.success(function(respuesta)
            {
                Registro.log(respuesta);
            });

            $scope.diagnosisVideo = "";

            //LISTAR DIAGNOSIS VIDEOS
            $http.get('http://localhost/Video_Cat/controller-be/diagnosisVideo.php?accion=listar').success(function(data)
            {
                $scope.diagnosisVideos = data;

            });

        };


        //EDITAR BRAND
        $scope.editarDiagnosisVideo = function(codigoDiagnosisVideo)
        {
            alert(codigoDiagnosisVideo);
        };


        //ELIMINAR BRAND
         $scope.eliminarDiagnosisVideo = function(codigoDiagnosisVideo)
        {
          //alert(idbrand);
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/diagnosisVideo.php?accion=eliminar", {iddiagnosisVideo: codigoDiagnosisVideo});
            $location.path('/diagnosisVideo');

            //LISTAMOS PARA QUE SE ACTUALICE LA NUEVA LISTA
            $http.get('http://localhost/Video_Cat/controller-be/diagnosisVideo.php?accion=listar').success(function(data)
            {
                $scope.diagnosisVideos = data;

            });
        };

        $scope.obtenerDatos = function(IdDiagnosisVideoPar){
            $http.post('http://localhost/Video_Cat/controller-be/diagnosisVideo.php?accion=Editar', {nCodigo: IdDiagnosisVideoPar }).success(function(data)
            {
            //Como solo obtengo un registro automaticamente asumo la primera posición

            $scope.br = data;
            $scope.codigoDiagnosisVideo = $scope.br[0]['iddiagnosisvideoframe'];
            $scope.DiagnosisVideodEdit = $scope.br[0]['description'];
        });

        };

        $scope.editarDiagnosisVideo=function(){
            var Modifico = $http.post("http://localhost/Video_Cat/controller-be/diagnosisVideo.php?accion=actualizar", {
                cCodigo: $scope.codigoDiagnosisVideo,
                cDescripcion: $scope.DiagnosisVideodEdit});
            Modifico.success(function(respuesta)
            {
                $scope.listarDiagnosisVideo();
            });
        }

    }]);