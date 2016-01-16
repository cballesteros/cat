'use strict';

angular.module('videoApp')

    .controller('hospitalCtrl', ['$scope',
                            '$location',
                            '$http',
                            function($scope, $location, $http)
    {

        $scope.item = "Hospital";

        //LISTAR HOSPITAL
        $http.get('http://localhost/Video_Cat/controller-be/hospital.php?accion=listar').success(function(data)
        {
            $scope.hospitals = data;

        });

        $scope.listarHospital = function()
        {

            //LISTAR HOSPITAL
            $http.get('http://localhost/Video_Cat/controller-be/hospital.php?accion=listar').success(function(data)
            {
                $scope.hospitals = data;

            });

        };


        //ORDENAR 
        $scope.ordenarPor = function(orden)
        {
            $scope.ordenSeleccionado = orden;
        };


        //REGISTRAR HOSPITAL
        $scope.RegistrarHospital = function()
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/hospital.php?accion=registrar", {cHospital: $scope.hospital, cState : $scope.state});
            Registro.success(function(respuesta)
            {
                Registro.log(respuesta);
            });

            $scope.hospital = "";

            //LISTAR HOSPITAL
            $http.get('http://localhost/Video_Cat/controller-be/hospital.php?accion=listar').success(function(data)
            {
                $scope.hospitals = data;

            });

        };


        //ELIMINAR HOSPITAL
         $scope.eliminarHospital = function(codigoHospital)
        {
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/hospital.php?accion=eliminar", {idhospital: codigoHospital});
            $location.path('/hospital');

            //LISTAMOS PARA QUE SE ACTUALICE LA NUEVA LISTA
            $http.get('http://localhost/Video_Cat/controller-be/hospital.php?accion=listar').success(function(data)
            {
                $scope.hospitals = data;

            });
        };


        $scope.obtenerDatos = function(IdHospitalPar){
            $http.post('http://localhost/Video_Cat/controller-be/hospital.php?accion=Editar', {nCodigo: IdHospitalPar }).success(function(data)
            {
            //Como solo obtengo un registro automaticamente asumo la primera posición

            $scope.br = data;
            $scope.codigoHospital = $scope.br[0]['idhospital'];
            $scope.hospitalEdit = $scope.br[0]['description'];
        });

        };

        $scope.editarHospital=function(){
            var Modifico = $http.post("http://localhost/Video_Cat/controller-be/hospital.php?accion=actualizar", {
                cCodigo: $scope.codigoHospital,
                cDescripcion: $scope.hospitalEdit});
            Modifico.success(function(respuesta)
            {
                $scope.listarHospital();
            });
        }

    }]);