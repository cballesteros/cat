'use strict';

angular.module('videoApp')

    .controller('LoginCtrl', ['$scope',
                            '$location',
                            '$http',
                            function($scope, $location, $http)
    {

        $scope.titulo = "Login";


        $scope.ingresoLogin = function()
        {
            var cusuario = $scope.usuario;
            var cclave = $scope.clave;

            alert(cusuario);
            alert(cclave);

            $http.post('http://localhost/Video_Cat/controller-be/login.php?accion=obtengo', {user: cusuario, clave: cclave }).success(function(data)
            {
                //Como solo obtengo un registro automaticamente asumo la primera posición

                $scope.br = data;
                $scope.codigoId = $scope.br[0]['idbrand'];
                $scope.brandEdit = $scope.br[0]['descripcion'];
            });

            location.href = "panelAdministrador.html";
        };

    }]);