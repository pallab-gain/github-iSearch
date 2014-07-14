/**
 * Created by xerxes on 7/13/14.
 */


var app = angular.module("githubInstance", ['ngResource']);
app.factory('searchRepo', function ($resource) {
    var searchRepo = $resource('https://api.github.com/search/repositories?q=:query&sort=:sort&order=:order',
        {},
        {'get': {'method': 'JSONP', 'cache': true}}
    );
    return searchRepo;
});
app.factory('slowDown', function () {
    var slowDown = {};
    slowDown.pressed = false;
    slowDown.interval = (0.3 * 1000);
    slowDown.curtime = undefined;


    slowDown.resolve = function (query_string, callback) {
        if (slowDown.pressed === false) {
            slowDown.pressed = true;
            slowDown.query = query_string;
            slowDown.curtime = new Date().getTime();
            return callback({
                'str': query_string,
                'ok': true
            });
        } else {
            var next_time = new Date().getTime();
            if (next_time > slowDown.curtime + slowDown.interval && slowDown.query !== query_string) {
                slowDown.query = query_string;
                slowDown.curtime = next_time;
                return callback({
                    'str': query_string,
                    'ok': true
                });
            } else {
                return callback({
                    'str': query_string,
                    'ok': false
                });
            }
        }
    };
    return slowDown;
});
app.controller('githubInstance', function ($scope, searchRepo, slowDown) {
    $scope.searchToken = undefined;

    $scope.resolve_data = function (event, searchToken) {
        searchToken = (searchToken && searchToken.trim().replace(' ', '+') );
        slowDown.resolve(searchToken, function (status) {
            if (status.ok === true) {
                searchRepo.get({
                    'query': searchToken,
                    'sort': 'stars',
                    'order': 'desc',
                    'callback': 'JSON_CALLBACK',
                    'per_page': 50
                }).$promise.then(function (data) {
                        if (angular.isDefined(data.data)) {
                            $scope.data = data.data;
                            console.log($scope.data);
                        }
                    });
            }
        });
    }
});
