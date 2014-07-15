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

app.controller('githubInstance', function ($scope, searchRepo) {
    $scope.searchToken = undefined;
    $scope.fetch_links = function () {
        var searchToken = ($scope.searchToken && $scope.searchToken.trim().replace(' ', '+') );
        if (angular.isDefined(searchToken) && searchToken != null) {
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


    }
});
