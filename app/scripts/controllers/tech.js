'use strict'


angular.module('TheNayakNews').controller('techController', ['$scope', 'webService', function ($scope, webService) {

  var apiKey = "74c20057e29e4641a38b5d00c39bd93f";
  var techRightUrl = "https://newsapi.org/v2/top-headlines?sources=techradar&apiKey=" + apiKey;
  var techLeftUrl = "https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=" + apiKey;
  $scope.showTech = false;
  initialize();

  function initialize() {
    prepareSportsLeftData(techLeftUrl);
    prepareSportsRightData(techRightUrl);
  }

  function prepareSportsLeftData(url) {
    var res = webService.getData(url);
    res.then(function (response) {
      $scope.sportsLeftArticles = [];
      if (angular.isDefined(response.data.articles)) {
        angular.forEach(response.data.articles, function (value, key) {
          var techNews = {
            author: value.author,
            title: value.title,
            description: value.description,
            url: value.url,
            urlToImage: value.urlToImage,
            publishedAt: value.publishedAt
          }
          $scope.sportsLeftArticles.push(techNews);
        })
      }
    },
      function (response) {

      });
  }

  function prepareSportsRightData(url) {
    var res = webService.getData(url);
    res.then(function (response) {
      $scope.sportsRightArticles = [];
      if (angular.isDefined(response.data.articles)) {
        angular.forEach(response.data.articles, function (value, key) {
          var techNews = {
            author: value.author,
            title: value.title,
            description: value.description,
            url: value.url,
            urlToImage: value.urlToImage,
            publishedAt: value.publishedAt
          }
          $scope.sportsRightArticles.push(techNews);
        });
        $scope.showTech = true;
      }
    },
      function (response) {

      });
  }

  $scope.redirectToOriginalSite = function (url) {
    window.open(url);
  }

  $scope.backToTop = function(){
    $("html, body").animate({ scrollTop: 0 }, 1000);
  }
}]);
