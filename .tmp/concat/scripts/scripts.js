'use strict';

/**
 * @ngdoc overview
 * @name TheNayakNews
 * @description
 * # TheNayakNews
 *
 * Main module of the application.
 */
angular
  .module('TheNayakNews', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ]);

'use strict';
angular.module('TheNayakNews').config(['$stateProvider', '$urlRouterProvider',  function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, send to /business
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {//State demonstrating Nested views
            url: "/",
            templateUrl: "views/home.html"
        })
        .state('myProject', {//State demonstrating Nested views
            url: "/myProject",
            templateUrl: "views/myProject.html",
            controller: 'myProjectController'
        })
        .state('myStack', {//State demonstrating Nested views
            url: "/myStack",
            templateUrl: "views/myStack.html",
            controller: 'myStackController'
        })
        .state('sports', {//State demonstrating Nested views
            url: "/sports",
            templateUrl: "views/sports.html",
            controller: 'sportsController'
        });

 

}]);

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
'use strict'


angular.module('TheNayakNews').controller('myStackController', ['$scope', 'webService','$location' , '$anchorScroll','$window', function ($scope, webService,$location ,$anchorScroll,$window) {

  var apiKey = "74c20057e29e4641a38b5d00c39bd93f";
  var filmRightUrl = "https://newsapi.org/v2/top-headlines?sources=mtv-news-uk&apiKey=" + apiKey;
  var filmLeftUrl = "https://newsapi.org/v1/articles?source=mtv-news&sortBy=latest&apiKey=" + apiKey;
  
  $scope.showFilm = false;
  initialize();

  function initialize() {
    prepareFilmLeftData(filmLeftUrl);
    prepareFilmRightData(filmRightUrl);
  }

  function prepareFilmLeftData(url) {
    var res = webService.getData(url);
    res.then(function (response) {
      $scope.filmLeftArticles = [];
      if (angular.isDefined(response.data.articles)) {
        angular.forEach(response.data.articles, function (value, key) {
          var filmNews = {
            author: value.author,
            title: value.title,
            description: value.description,
            url: value.url,
            urlToImage: value.urlToImage,
            publishedAt: value.publishedAt
          }
          $scope.filmLeftArticles.push(filmNews);
        });
        $scope.showFilm = true;
      }
    },
      function (response) {

      });
  }

  function prepareFilmRightData(url) {
    var res = webService.getData(url);
    res.then(function (response) {
      $scope.filmRightArticles = [];
      if (angular.isDefined(response.data.articles)) {
        angular.forEach(response.data.articles, function (value, key) {
          var filmNews = {
            author: value.author,
            title: value.title,
            description: value.description,
            url: value.url,
            urlToImage: value.urlToImage,
            publishedAt: value.publishedAt
          }
          $scope.filmRightArticles.push(filmNews);
        })
      }
    },
      function (response) {

      });
  }

  $scope.redirectToOriginalSite = function (url) {
    window.open(url);
  }

 
$scope.backToTop = function() {
      $("html, body").animate({ scrollTop: 0 }, 1000);
      }
}]);

'use strict'


angular.module('TheNayakNews').controller('sportsController', ['$scope', 'webService', function ($scope, webService) {

  var apiKey = "74c20057e29e4641a38b5d00c39bd93f";
  var sportsRightUrl = " https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=" + apiKey;
  var sportsLeftUrl = "https://newsapi.org/v1/articles?source=espn-cric-info&sortBy=latest&apiKey=" + apiKey;
  $scope.showSports = false;
  initialize();

  function initialize() {
    prepareSportsLeftData(sportsLeftUrl);
    prepareSportsRightData(sportsRightUrl);
  }

  function prepareSportsLeftData(url) {
    var res = webService.getData(url);
    res.then(function (response) {
      $scope.sportsLeftArticles = [];
      if (angular.isDefined(response.data.articles)) {
        angular.forEach(response.data.articles, function (value, key) {
          var sportsNews = {
            author: value.author,
            title: value.title,
            description: value.description,
            url: value.url,
            urlToImage: value.urlToImage,
            publishedAt: value.publishedAt
          }
          $scope.sportsLeftArticles.push(sportsNews);
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
          var sportsNews = {
            author: value.author,
            title: value.title,
            description: value.description,
            url: value.url,
            urlToImage: value.urlToImage,
            publishedAt: value.publishedAt
          }
          $scope.sportsRightArticles.push(sportsNews);
        });
        $scope.showSports = true;
      }
    },
      function (response) {

      });
  }

  $scope.redirectToOriginalSite = function (url) {
    window.open(url);
  }

  $scope.backToTop = function() {
      $("html, body").animate({ scrollTop: 0 }, 1000);
      }
}]);

'use strict'


angular.module('TheNayakNews').controller('myProjectController', ['$scope', 'webService', function ($scope, webService) {

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

'use strict'


angular.module('TheNayakNews').controller('navController', ['$scope', '$location', function ($scope, $location) {
  $scope.isCurrentPath = function (path) {
    return $location.path() == path;
  };

}]);

angular.module('TheNayakNews').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/home.html',
    "<div id=\"home-content\"> <div id=\"home-hacker\"> <img src=\"/picture/Prajwal.jpg\"> <div id=\"home-hackerInto\"> <h4>Prajwal Nayak</h4> <p>Banaglore based Angular, Java full statck developer</p> <ul> <li><a href=\"https://github.com/theprajwalnayak/\" target=\"_blank\"><i class=\"fa fa-github\"></i></a></li> <li><a href=\"https://www.linkedin.com/in/theprajwalnayak//\" target=\"_blank\"><i class=\"fa fa-linkedin\"></i></a></li> <li><a href=\"https://twitter.com/ThePrajwalNayak/\" target=\"_blank\"><i class=\"fa fa-twitter\"></i></a></li> <li><a href=\"http://plus.google.com/\" target=\"_blank\"><i class=\"fa fa-google-plus\"></i> </a></li> </ul> </div> </div> </div>"
  );


  $templateCache.put('views/homeBack.html',
    "<div class=\"home-content\"> <div id=\"myCarousel\" class=\"carousel slide\" data-ride=\"carousel\"> <!-- Indicators --> <ol class=\"carousel-indicators\"> <li data-target=\"#myCarousel\" data-slide-to=\"0\" class=\"active\"></li> <li data-target=\"#myCarousel\" data-slide-to=\"1\"></li> <li data-target=\"#myCarousel\" data-slide-to=\"2\"></li> </ol> <!-- Wrapper for slides --> <div class=\"carousel-inner\"> <div class=\"item active\"> <img src=\"images/film.jpg\" alt=\"Los Angeles\" style=\"width:100%;height : 700px\"> <div class=\"carousel-caption\"> <h3>Film</h3> <blockquote> <h1>My Mama always said, 'Life was like a box of chocolates; you never know what you're gonna get.'</h1> <p>- <i>TOM HANKS</i> as Forrest Gump in Forrest Gump</p> <!-- console.developers.google.com/apis/credentials?project=thenayaknews --> </blockquote> </div> </div> <div class=\"item\"> <img src=\"images/sports.jpg\" alt=\"Chicago\" style=\"width:100%;height : 700px\"> <div class=\"carousel-caption\"> <h3>Sports</h3> <blockquote> <h1>I've failed over and over and over again in my life and that is why I succedd</h1> <p>- <i>Michael Jordan</i></p> </blockquote> <!-- https://www.brainyquote.com/quotes/quotes/m/michaeljor127660.html?src=t_sports --> </div> </div> <div class=\"item\"> <img src=\"images/tech.jpg\" alt=\"New York\" style=\"width:100%;height : 700px\"> <div class=\"carousel-caption\"> <h3>Tech</h3> <blockquote> <h1> Just because something doesn’t do what you planned it to do doesn’t mean it’s useless. </h1> <p>- <i>Thomas Edison </i></p> </blockquote> </div> </div> </div> <!-- Left and right controls --> <a class=\"left carousel-control\" href=\"#myCarousel\" data-slide=\"prev\"> <span class=\"glyphicon glyphicon-chevron-left\"></span> <span class=\"sr-only\">Previous</span> </a> <a class=\"right carousel-control\" href=\"#myCarousel\" data-slide=\"next\"> <span class=\"glyphicon glyphicon-chevron-right\"></span> <span class=\"sr-only\">Next</span> </a> </div> </div>"
  );


  $templateCache.put('views/myProject.html',
    "<div id=\"myProject-content\"> Under progress . . . <button id=\"myProjectBackToTop\" type=\"button\" scrollable ng-click=\"backToTop()\">Back to Top</button> </div>"
  );


  $templateCache.put('views/myStack.html',
    "<div id=\"myStack-content\"> <div class=\"logo-container\"> <h4>FrontEnd</h4> <div class=\"row\"> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/angular5.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/hybrid.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/javaScript.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/html5.png\"> </div> </div> <div class=\"row\"> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/css3.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/bootstrap.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/json.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/scss.png\"> </div> </div> </div> <div class=\"logo-container\"> <h4>Backend</h4> <div class=\"row\"> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/java.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/spring.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/microServices.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/restAPI.png\"> </div> </div> <div class=\"row\"> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/maven.jpeg\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/myBatis.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/swagger.png\"> </div> </div> </div> <div class=\"logo-container\"> <h4>Test Framework</h4> <div class=\"row\"> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/junit.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/jasmin.jpeg\"> </div> </div> </div> <div class=\"logo-container\"> <h4>Data Base and Servers</h4> <div class=\"row\"> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/oracle.jpeg\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/sql.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/linuxServer.jpeg\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/apacheTomcat.png\"> </div> </div> <div class=\"row\"> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/shellScript.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/jenkins.png\"> </div> </div> </div> <div class=\"logo-container\"> <h4>Source Control System</h4> <div class=\"row\"> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/git.jpeg\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/gerrit.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/bitBucket.png\"> </div> <div class=\"col-md-3\"> <img class=\"logo\" src=\"picture/myStack/svn.jpeg\"> </div> </div> </div> <button id=\"myStackBackToTop\" type=\"button\" scrollable ng-click=\"backToTop()\">Back to Top</button> </div>"
  );


  $templateCache.put('views/nav.html',
    "<!-- NAVIGATION --> <div id=\"nav-content\"> <nav class=\"navbar navbar-inverse\" role=\"navigation\" ng-controller=\"navController\"> <div class=\"navbar-header\"> <a class=\"navbar-brand\" ui-sref=\"home\">P N</a> </div> <ul class=\"nav navbar-nav\"> <li class=\"navMenu\" ng-class=\"{ active: isCurrentPath('/myStack') }\"><a ui-sref=\"myStack\">My stack</a></li> <li class=\"navMenu\" ng-class=\"{ active: isCurrentPath('/myProject') }\"><a ui-sref=\"myProject\">My Project</a></li> <!-- <li class=\"navMenu\" ng-class=\"{ active: isCurrentPath('/sports') }\"><a ui-sref=\"sports\">My Resume</a></li>--> </ul> </nav> </div>"
  );


  $templateCache.put('views/sports.html',
    "<div id=\"sports-content\"> <div id=\"sportsArticle\" class=\"row\"> <div id=\"sportsLeft\" class=\"col-md-7\"> <div class=\"sportsLeftArticles\" ng-repeat=\"sportsLeftArticle in sportsLeftArticles\"> <blockquote> <h1>{{sportsLeftArticle.title}}</h1> <h4>-{{sportsLeftArticle.author}}</h4> </blockquote> <img class=\"sportsLeftArticlesImage\" ng-src=\"{{sportsLeftArticle.urlToImage}}\" ng-click=\"redirectToOriginalSite(sportsLeftArticle.url)\" target=\"_blank\"> <p class=\"sportsLeftArticlesDescription\">{{sportsLeftArticle.description}}<span class=\"continueReading\"><a href=\"{{sportsLeftArticle.url}}\" target=\"_blank\">Continue reading >></a></span></p><p> </p></div> </div> <div id=\"sportsRight\" class=\"col-md-4\"> <h2 ng-if=\"showSports\">Top Headlines</h2> <div class=\"sportsRightArticles\" ng-repeat=\"sportsRightArticle in sportsRightArticles\"> <blockquote> <h1>{{sportsRightArticle.title}}</h1> <h4>-{{sportsRightArticle.author}}</h4> </blockquote> <img class=\"sportsRightArticlesImage\" ng-src=\"{{sportsRightArticle.urlToImage}}\" ng-click=\"redirectToOriginalSite(sportsRightArticle.url)\" target=\"_blank\"> <p class=\"sportsRightArticlesDescription\">{{sportsRightArticle.description}}<span class=\"continueReading\"><a href=\"{{sportsRightArticle.url}}\" target=\"_blank\">Continue reading >></a></span></p><p> </p></div> </div> <button id=\"sportsBackToTop\" type=\"button\" scrollable ng-click=\"backToTop()\">Back to Top</button> </div> </div>"
  );

}]);
