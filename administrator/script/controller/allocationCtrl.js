'use strict';

angular.module('videoApp')

    .controller('allocationCtrl', ['$scope',
                            '$location',
                            '$http',
                            function($scope, $location, $http)
    {

        $scope.item = "Allocation";

        //LISTAR PERSON
        $http.get('http://localhost/Video_Cat/controller-be/allocation.php?accion=listar').success(function(data)
        {
            $scope.persons = data;

        });

        //ORDENAR 
        $scope.ordenarPor = function(orden)
        {
            $scope.ordenSeleccionado = orden;

        };

        $scope.listadoOk = function(codigo,nombre)
        {
            //LISTAR ALLOCATION
             $http.post('http://localhost/Video_Cat/controller-be/allocation.php?accion=listarok', {nCodigo: codigo }).success(function(data)
            {
            
            $scope.allocations = data;
            $scope.nombrePersona = nombre;
            //$rootScope.codigoPersona = codigo;
        });

        };

         //AGREGAR VIDEO - ALLOCATION
        $scope.agregarVideo = function(idvid)
        {

            alert(idvid);
            //alert(item);
            

            /*var Registro = $http.post("http://localhost:8096/Video_Cat/controller-be/person.php?accion=registrar", {cName: $scope.nombre, cEmail: $scope.email, cPhone: $scope.phone, cEspeciality: $scope.especiality, cCountry: $scope.country, cExperience: $scope.experience, cHospital: $scope.hospital, cUser: $scope.user, cPass: $scope.pass, cEstado: $scope.state,cFecha: $scope.fecha});
            Registro.success(function(respuesta)
            {
                Registro.log(respuesta);
            });*/
        };

    }]);