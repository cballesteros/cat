'use strict';

angular.module('videoApp')

    .controller('personCtrl', ['$scope',
                            '$location',
                            '$http',
                            function($scope, $location, $http)
    {

        $scope.item = "Person";

         //ORDENAR 
        $scope.ordenarPor = function(orden)
        {
            $scope.ordenSeleccionado = orden;
        };

        //LISTAR ESPECIALITY
        $http.get('http://localhost/Video_Cat/controller-be/especiality.php?accion=listar').success(function(data)
        {
            $scope.especialitys = data;

        });

         //LISTAR EXPERIENCE
        $http.get('http://localhost/Video_Cat/controller-be/experience.php?accion=listar').success(function(data)
        {
            $scope.experiences = data;

        });

        //LISTAR HOSPITAL
        $http.get('http://localhost/Video_Cat/controller-be/hospital.php?accion=listar').success(function(data)
        {
            $scope.hospitals = data;

        });

        //LISTAR COUNTRY
        $http.get('http://localhost/Video_Cat/controller-be/country.php?accion=listar').success(function(data)
        {
            $scope.countrys = data;

        });

        //LISTAR PERSON
        $http.get('http://localhost/Video_Cat/controller-be/person.php?accion=listar').success(function(data)
        {
            $scope.persons = data;

        });

        $scope.listarPerson = function()
        {
            //LISTAR PERSON
            $http.get('http://localhost/Video_Cat/controller-be/person.php?accion=listar').success(function(data)
            {
                $scope.persons = data;

            });


        };

        //REGISTRAR PERSON
        $scope.registrarPerson = function()
        {

            var Registro = $http.post("http://localhost/Video_Cat/controller-be/person.php?accion=registrar", {cName: $scope.nombre, cEmail: $scope.email, cPhone: $scope.phone, cEspeciality: $scope.especiality, cCountry: $scope.country, cExperience: $scope.experience, cHospital: $scope.hospital, cUser: $scope.user, cPass: $scope.pass, cEstado: $scope.state,cFecha: $scope.fecha});
            Registro.success(function(respuesta)
            {
                Registro.log(respuesta);
            });

            //LISTAR PERSON
            $http.get('http://localhost/Video_Cat/controller-be/person.php?accion=listar').success(function(data)
            {
                $scope.persons = data;

            });


        };


        //ELIMINAR PERSON
         $scope.eliminarPerson = function(codigoPerson)
        {
          //alert(idbrand);
            var Registro = $http.post("http://localhost/Video_Cat/controller-be/person.php?accion=eliminar", {idperson: codigoPerson});
            $location.path('/person');

            //LISTAMOS PARA QUE SE ACTUALICE LA NUEVA LISTA
            $http.get('http://localhost/Video_Cat/controller-be/person.php?accion=listar').success(function(data)
            {
                $scope.persons = data;

            });
        };


        $scope.obtenerDatos = function(IdPersonPar){
            $http.post('http://localhost/Video_Cat/controller-be/person.php?accion=Editar', {nCodigo: IdPersonPar }).success(function(data)
            {
            //Como solo obtengo un registro automaticamente asumo la primera posición

            $scope.br = data;
            $scope.codigoPerson = $scope.br[0]['idperson'];
            $scope.nombreEdit = $scope.br[0]['name'];
            $scope.emailEdit = $scope.br[0]['email'];
            $scope.phoneEdit = $scope.br[0]['phone'];
            $scope.especialityEdit = $scope.br[0]['idespeciality'];
            $scope.countryEdit = $scope.br[0]['idcountry'];
            $scope.experienceEdit = $scope.br[0]['idexperience'];
            $scope.hospitalEdit = $scope.br[0]['idhospital'];
            $scope.userEdit = $scope.br[0]['user'];
            $scope.passEdit = $scope.br[0]['pass'];
            $scope.stateEdit = $scope.br[0]['state'];
            $scope.fechaEdit = $scope.br[0]['lastaccessed'];
        });

        };

        $scope.EditPerson=function(){
            var Modifico = $http.post("http://localhost/Video_Cat/controller-be/person.php?accion=actualizar", {
                cCodigo: $scope.codigoPerson,
                cNombre: $scope.nombreEdit,
                cEmail: $scope.emailEdit,
                cPhone: $scope.phoneEdit,
                cEspeciality: $scope.especialityEdit,
                cCountry: $scope.countryEdit,
                cExperience: $scope.experienceEdit,
                cHospital: $scope.hospitalEdit,
                cUser: $scope.userEdit,
                cPass: $scope.passEdit,
                cState: $scope.stateEdit,
                cFecha: $scope.fechaEdit});
            Modifico.success(function(respuesta)
            {
                $scope.listarPerson();
            });
        }

    }]);