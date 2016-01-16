'use strict';

angular.module('videoApp',[
    'ngRoute'
])

.config(function($routeProvider)
    {
        $routeProvider
            .when('/',
            {
                templateUrl: 'views/Star.html',
                controller: 'starCtrl'
            })
            .when('/brand',
            {
                templateUrl: 'views/Brand.html',
                controller: 'brandCtrl'
            })
             .when('/model',
            {
                templateUrl: 'views/Model.html',
                controller: 'modelCtrl'
            })
              .when('/country',
            {
                templateUrl: 'views/Country.html',
                controller: 'countryCtrl'
            })
               .when('/hospital',
            {
                templateUrl: 'views/Hospital.html',
                controller: 'hospitalCtrl'
            })
                .when('/especiality',
            {
                templateUrl: 'views/Especiality.html',
                controller: 'especialityCtrl'
            })
                 .when('/experience',
            {
                templateUrl: 'views/Experience.html',
                controller: 'experienceCtrl'
            })
                  .when('/diagnosisVideo',
            {
                templateUrl: 'views/DiagnosisVideo.html',
                controller: 'diagnosisVideoCtrl'
            })
                   .when('/stateVideo',
            {
                templateUrl: 'views/StateVideo.html',
                controller: 'stateVideoCtrl'
            })
                    .when('/person',
            {
                templateUrl: 'views/Person.html',
                controller: 'personCtrl'
            })
                     .when('/video',
            {
                templateUrl: 'views/Video.html',
                controller: 'videoCtrl'
            })
                      .when('/allocation',
            {
                templateUrl: 'views/Allocation.html',
                controller: 'allocationCtrl'
            })
                       .when('/reports',
            {
                templateUrl: 'views/Reports.html',
                controller: 'reportsCtrl'
            })
            .otherwise(
            {
                redirectTo: '/'
            });
    });