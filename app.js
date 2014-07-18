/**
 * Created by xerxes on 7/13/14.
 */
angular.module('mySearchGitFactory', [])
    .factory('searchRepo', function ($resource) {
        var searchRepo = $resource('https://api.github.com/search/repositories?q=:query&sort=:sort&order=:order',
            {},
            {'get': {'method': 'JSONP', 'cache': true}}
        );
        return searchRepo;
    })
    .factory('myResource', function () {
        return {'name': 'pallab'}
    });
angular.module('mySearchGitDirective', ['mySearchGitFactory'])
    .directive('myHeader', ['searchRepo', function (searchRepo) {
        return {
            restrict: "A",
            replace: 'true',
            templateUrl: './views/header.html',
            controller: function ($scope) {
                $scope.fetch_links = function (token) {
                    token = (token && token.trim().replace(/ /g, '+') );
                    if (angular.isDefined(token) && token != null) {
                        searchRepo.get({
                            'query': token,
                            'sort': 'stars',
                            'order': 'desc',
                            'callback': 'JSON_CALLBACK',
                            'per_page': 5,
                            'page': $scope.index
                        }).$promise.then(function (data) {
                                if (angular.isDefined(data.data)) {
                                    $scope.data = data.data;
                                    console.log($scope.data);
                                }
                            });

                    }
                }
            },
            link: function (scope, element, attrs) {
                //console.log('scope ', myResource.name, myResource.data);
            }
        }
    }]).directive('myResult', ['searchRepo', function (searchRepo) {
        return {
            restrict: "A",
            replace: 'true',
            templateUrl: './views/result.html',
            link: function (scope, element, attrs) {
                //console.log('scope ', myResource.name, myResource.data);
                console.log(scope.data);
            },
            controller: function ($scope) {
                $scope.index = 1;
                $scope.fetch_data = function (type) {
                    var token = $scope.searchToken;
                    if (type == 'prev') {
                        $scope.index -= 1;
                        $scope.index = Math.max($scope.index, 1);
                    } else {
                        $scope.index += 1;
                        if ($scope.index > Math.ceil($scope.data.total_count/5)) {
                            $scope.index -= 1;
                        }
                    }


                    if (angular.isDefined(token) && token != null) {
                        searchRepo.get({
                            'query': token,
                            'sort': 'stars',
                            'order': 'desc',
                            'callback': 'JSON_CALLBACK',
                            'per_page': 5,
                            'page': $scope.index
                        }).$promise.then(function (data) {
                                if (angular.isDefined(data.data)) {
                                    $scope.data = data.data;
                                    console.log($scope.data);
                                }
                            });

                    }
                };
            }
        }
    }]);

angular.module("githubInstance", ['ngResource', 'mySearchGitDirective'])
    .controller('githubInstance', function ($scope, searchRepo) {
//        console.log('main controller');
    });
