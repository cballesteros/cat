var truco=0;
'use strict';

angular.module('videoApp')

    .controller('brandCtrl', ['$scope',
                            '$location',
                            '$http',
                            function($scope, $location, $http)
    {

        $scope.item = "Brand";

        $scope.listarBrand = function()
        {
            $http.get('http://localhost/Video_Cat/controller-be/brand.php?accion=listar').success(function(data)
            {
                $scope.brands = data;
                console.log($scope.brands);
            });
        }

        $scope.listarBrand();


        //ORDENAR 
        $scope.ordenarPor = function(orden)
        {
            $scope.ordenSeleccionado = orden;
        };


        //REGISTRAR BRAND
        $scope.RegistrarBrand = function()
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/brand.php?accion=registrar", {cBrand: $scope.brand});
            Registro.success(function(respuesta)
            {
                alert(respuesta);
                $scope.listarBrand();
            });

               //LISTAR BRAND
            $http.get('http://localhost/Video_Cat/controller-be/brand.php?accion=listar').success(function(data)
            {
                $scope.brands = data;
            });

            $scope.brand = "";

        };

        //ELIMINAR BRAND
         $scope.eliminarBrand = function(codigoBrad)
        {
          $http.post('http://localhost/Video_Cat/controller-be/brand.php?accion=eliminar', {nCodigo: codigoBrad }).success(function(data)
            {
                alert(data);
                $scope.listarBrand();
        });

        };

        $scope.obtenerDatos = function(IdBrandPar){
            $http.post('http://localhost/Video_Cat/controller-be/brand.php?accion=Editar', {nCodigo: IdBrandPar }).success(function(data)
            {
            //Como solo obtengo un registro automaticamente asumo la primera posición

            $scope.br = data;
            $scope.codigoBrand = $scope.br[0]['idbrand'];
            $scope.brandEdit = $scope.br[0]['descripcion'];
        });

        };

        $scope.editarBrand=function(){
            var Modifico = $http.post("http://localhost/Video_Cat/controller-be/brand.php?accion=actualizar", {
                cCodigo: $scope.codigoBrand,
                cDescripcion: $scope.brandEdit});
            Modifico.success(function(respuesta)
            {
                $scope.listarBrand();
            });
        }

    }]);