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
    });
angular.module('mySearchGitDirective', ['mySearchGitFactory'])
    .directive('myHeader', function () {
        return {
            scope: {},
            restrict: "A",
            replace: 'true',
            templateUrl: './views/header.html',
            controller: function ($scope) {
                $scope.searchToken = undefined;
                $scope.fetch_links = function (token) {
                    token = (token && token.trim().replace(/ /g, '+') );
                    console.log('token is ', token);
                }
            }
        }
    }).directive('myResult', function () {
        return {
            scope: {},
            restrict: "A",
            replace: 'true',
            templateUrl: './views/result.html'
        }
    });

angular.module("githubInstance", ['ngResource', 'mySearchGitDirective'])
    .controller('githubInstance', function ($scope, searchRepo) {
//        console.log('main controller');
    });
