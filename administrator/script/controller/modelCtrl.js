'use strict';

angular.module('videoApp')

    .controller('modelCtrl', ['$scope',
                            '$location',
                            '$http',
                            function($scope, $location, $http)
    {

        $scope.item = "Model";

        
        //LISTAR BRAND
        $http.get('http://localhost/Video_Cat/controller-be/brand.php?accion=listar').success(function(data)
        {
            $scope.brands = data;

        });

        //LISTAR MODEL
        $http.get('http://localhost/Video_Cat/controller-be/model.php?accion=listar').success(function(data)
        {
            $scope.models = data;

        });

        $scope.listarModel = function()
        {
            //LISTAR MODEL
            $http.get('http://localhost/Video_Cat/controller-be/model.php?accion=listar').success(function(data)
            {
                $scope.models = data;

            });

        };

        //ORDENAR 
        $scope.ordenarPor = function(orden)
        {
            $scope.ordenSeleccionado = orden;
        };

        //REGISTRAR MODEL
        $scope.RegistrarModel = function()
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/model.php?accion=registrar", {cModel: $scope.model, cIdbrand: $scope.brand});
            Registro.success(function(respuesta)
            {
                Registro.log(respuesta);
            });

            $scope.model = "";

            //LISTAR MODEL
            $http.get('http://localhost/Video_Cat/controller-be/model.php?accion=listar').success(function(data)
            {
                $scope.models = data;

            });

        };

        //ELIMINAR MODEL
         $scope.eliminarModel = function(codigoModel)
        {
          //alert(idbrand);
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/model.php?accion=eliminar", {idmodel: codigoModel});
            $location.path('/model');

            //LISTAMOS PARA QUE SE ACTUALICE LA NUEVA LISTA
            $http.get('http://localhost/Video_Cat/controller-be/model.php?accion=listar').success(function(data)
            {
                $scope.models = data;

            });

        };


        $scope.obtenerDatos = function(IdModelPar){
            $http.post('http://localhost/Video_Cat/controller-be/model.php?accion=Editar', {nCodigo: IdModelPar }).success(function(data)
            {
            //Como solo obtengo un registro automaticamente asumo la primera posición

            $scope.br = data;
            $scope.codigoModel = $scope.br[0]['idmodel'];
            $scope.modelEdit = $scope.br[0]['descripcion'];
        });

        };

        $scope.editarModel=function(){
            var Modifico = $http.post("http://localhost/Video_Cat/controller-be/model.php?accion=actualizar", {
                cCodigo: $scope.codigoModel,
                cDescripcion: $scope.modelEdit,
                cBrand: $scope.brandEdit});
            Modifico.success(function(respuesta)
            {
                $scope.listarModel();
            });
        }

    }]);