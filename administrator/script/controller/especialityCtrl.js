'use strict';

angular.module('videoApp')

    .controller('especialityCtrl', ['$scope',
                            '$location',
                            '$http',
                            function($scope, $location, $http)
    {

        $scope.item = "Especiality";

        //LISTAR ESPECIALITY
        $http.get('http://localhost/Video_Cat/controller-be/especiality.php?accion=listar').success(function(data)
        {
            $scope.especialitys = data;

        });

        $scope.listarEspeciality = function()
        {

            //LISTAR ESPECIALITY
            $http.get('http://localhost/Video_Cat/controller-be/especiality.php?accion=listar').success(function(data)
            {
                $scope.especialitys = data;

            });

        };

        //REGISTRAR ESPECIALITY
        $scope.RegistrarEspeciality = function()
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/especiality.php?accion=registrar", {cEspeciality: $scope.especiality});
            Registro.success(function(respuesta)
            {
                Registro.log(respuesta);
            });

            $scope.especiality = "";

            //LISTAR ESPECIALITY
            $http.get('http://localhost/Video_Cat/controller-be/especiality.php?accion=listar').success(function(data)
            {
                $scope.especialitys = data;

            });

        };


        //EDITAR ESPECIALITY
        $scope.editarEspeciality = function(codigoEspeciality)
        {
            alert(codigoEspeciality);
        };


        //ELIMINAR ESPECIALITY
         $scope.eliminarEspeciality = function(codigoEspeciality)
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/especiality.php?accion=eliminar", {idespeciality: codigoEspeciality});
            $location.path('/especiality');

            //LISTAMOS PARA QUE SE ACTUALICE LA NUEVA LISTA
            $http.get('http://localhost/Video_Cat/controller-be/especiality.php?accion=listar').success(function(data)
            {
                $scope.especialitys = data;

            });

        };

        $scope.obtenerDatos = function(IdEspecialityPar){
            $http.post('http://localhost/Video_Cat/controller-be/especiality.php?accion=Editar', {nCodigo: IdEspecialityPar }).success(function(data)
            {
            //Como solo obtengo un registro automaticamente asumo la primera posición

            $scope.br = data;
            $scope.codigoEspeciality = $scope.br[0]['idespeciality'];
            $scope.especialityEdit = $scope.br[0]['description'];
        });

        };

        $scope.editarEspeciality=function(){
            var Modifico = $http.post("http://localhost/Video_Cat/controller-be/especiality.php?accion=actualizar", {
                cCodigo: $scope.codigoEspeciality,
                cDescripcion: $scope.especialityEdit});
            Modifico.success(function(respuesta)
            {
                $scope.listarEspeciality();
            });
        }

    }]);