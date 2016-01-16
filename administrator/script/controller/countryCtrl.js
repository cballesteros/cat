'use strict';

angular.module('videoApp')

    .controller('countryCtrl', ['$scope',
                            '$location',
                            '$http',
                            function($scope, $location, $http)
    {

        $scope.item = "Country";

         //LISTAR COUNTRY
        $http.get('http://localhost/Video_Cat/controller-be/country.php?accion=listar').success(function(data)
        {
            $scope.countrys = data;

        });

        $scope.listarCountry = function(orden)
        {
           $http.get('http://localhost/Video_Cat/controller-be/country.php?accion=listar').success(function(data)
           {
                $scope.countrys = data;
           });
        };

        //ORDENAR 
        $scope.ordenarPor = function(orden)
        {
            $scope.ordenSeleccionado = orden;
        };


        //REGISTRAR COUNTRY
        $scope.RegistrarCountry = function()
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/country.php?accion=registrar", {cCountry: $scope.country});
            Registro.success(function(respuesta)
            {
                Registro.log(respuesta);
            });

            //LISTAR COUNTRY
            $http.get('http://localhost/Video_Cat/controller-be/country.php?accion=listar').success(function(data)
           {
                $scope.countrys = data;
           });

            $scope.country = "";

        };


        //ELIMINAR COUNTRY
         $scope.eliminarCountry = function(codigoCountry)
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/country.php?accion=eliminar", {idcountry: codigoCountry});
            $location.path('/country');

            //LISTAMOS PARA QUE SE ACTUALICE LA NUEVA LISTA
            $http.get('http://localhost/Video_Cat/controller-be/country.php?accion=listar').success(function(data)
            {
                $scope.countrys = data;

            });
        };

        $scope.obtenerDatos = function(IdCountryPar){
            $http.post('http://localhost/Video_Cat/controller-be/country.php?accion=Editar', {nCodigo: IdCountryPar }).success(function(data)
            {
            //Como solo obtengo un registro automaticamente asumo la primera posición

            $scope.br = data;
            $scope.codigoCountry = $scope.br[0]['idcountry'];
            $scope.countryEdit = $scope.br[0]['description'];
        });

        };

        $scope.editarCountry=function(){
            var Modifico = $http.post("http://localhost/Video_Cat/controller-be/country.php?accion=actualizar", {
                cCodigo: $scope.codigoCountry,
                cDescripcion: $scope.countryEdit});
            Modifico.success(function(respuesta)
            {
                $scope.listarCountry();
            });
        }

    }]);