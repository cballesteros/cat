'use strict';

angular.module('videoApp')

    .controller('starCtrl', ['$scope',
                            '$location',
                            '$http',
                            function($scope, $location, $http)
    {

        $scope.item = "Colonoscopy Anotation Tool";


    }]);