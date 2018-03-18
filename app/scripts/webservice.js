'use strict'

angular.module('TheNayakNews').factory('webService', ['$http','$q' ,function ($http, $q) {

    var newsUrl = 'https://newsapi.org/v1/articles?source=techcrunch&apiKey=74c20057e29e4641a38b5d00c39bd93f';
    var service = {
        news: [],
        getData: getData
    };
    return service;

    function getData(uri) {
        var deffered = $q.defer();
        $http({
            method: 'GET',
            url: uri,
        }).then(function successCallback(response) {
            service.news = response;
            deffered.resolve(response);

        }, function errorCallback(response) {
            deffered.reject(response);
        });
        return deffered.promise;
    }

}]);