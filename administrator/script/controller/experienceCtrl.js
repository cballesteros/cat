'use strict';

angular.module('videoApp')

    .controller('experienceCtrl', ['$scope',
                            '$location',
                            '$http',
                            function($scope, $location, $http)
    {

        $scope.item = "Experience";

         //LISTAR EXPERIENCE
        $http.get('http://localhost/Video_Cat/controller-be/experience.php?accion=listar').success(function(data)
        {
            $scope.experiences = data;

        });

        $scope.listarExperience = function()
        {
             //LISTAR EXPERIENCE
            $http.get('http://localhost/Video_Cat/controller-be/experience.php?accion=listar').success(function(data)
            {
                $scope.experiences = data;

            });

        };


        //ORDENAR 
        $scope.ordenarPor = function(orden)
        {
            $scope.ordenSeleccionado = orden;
        };


        //REGISTRAR EXPERIENCE
        $scope.RegistrarExperience = function()
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/experience.php?accion=registrar", {cExperience: $scope.experience});
            Registro.success(function(respuesta)
            {
                Registro.log(respuesta);
            });

            $scope.experience = "";

             //LISTAR EXPERIENCE
            $http.get('http://localhost/Video_Cat/controller-be/experience.php?accion=listar').success(function(data)
            {
                $scope.experiences = data;

            });

        };


        //ELIMINAR BRAND
         $scope.eliminarExperience = function(codigoExperience)
        {
          //alert(idbrand);
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/experience.php?accion=eliminar", {idexperience: codigoExperience});
            $location.path('/experience');

            //LISTAMOS PARA QUE SE ACTUALICE LA NUEVA LISTA
            $http.get('http://localhost/Video_Cat/controller-be/experience.php?accion=listar').success(function(data)
            {
                $scope.experiences = data;

            });

        };


        $scope.obtenerDatos = function(IdBrandPar){
            $http.post('http://localhost/Video_Cat/controller-be/experience.php?accion=Editar', {nCodigo: IdBrandPar }).success(function(data)
            {
            //Como solo obtengo un registro automaticamente asumo la primera posición

            $scope.br = data;
            $scope.codigoExperience = $scope.br[0]['idexperience'];
            $scope.experienceEdit = $scope.br[0]['descripcion'];
        });

        };

        $scope.editarExperience=function(){
            var Modifico = $http.post("http://localhost/Video_Cat/controller-be/experience.php?accion=actualizar", {
                cCodigo: $scope.codigoExperience,
                cDescripcion: $scope.experienceEdit});
            Modifico.success(function(respuesta)
            {
                $scope.listarExperience();
            });
        }


    }]);