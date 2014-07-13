/**
 * Created by xerxes on 7/13/14.
 */

var app = angular.module("githubInstance", []);
app.factory('searchRepository', function ($http, $q) {
    var searchRepository = {}
    searchRepository.fetch = function (searchToken, sortBy) {
        var d = $q.defer();

        var url = "http://api.github.com/search/repositories?q=" + (typeof searchToken !== 'undefined' ? searchToken : '') + "&sort=" + (typeof sortBy !== 'undefined' ? sortBy : 'stars') + "&order=desc"
        $http.get(url).success(function (data, status, headers, config) {
            console.log(data);
            d.resolve('successfully fetched data');
        }).error(function (data, status, headers, config) {
            d.reject(searchToken + ' cannot be done');
        });
        return d.promise;
    }
    return searchRepository;
});

app.factory('searchRepo',function($resource,$q){
    var searchRepo = {};
    var github = $resource(
        'https://api.github.com/:query/:user/:repo/:spec',
        {
            'query': 'users',
            'user': 'erkobridee',
            'repo': 'repos',
            'spec': '',
            'callback': 'JSON_CALLBACK',
            'per_page': 100
        }, {
            'get': {
                'method': 'JSONP'
            }
        }
    );

    return github;
    return searchRepo;
});

app.controller('githubInstance', function ($scope, searchRepository) {
    $scope.searchToken = undefined;
    $scope.resolve_data = function (event, searchToken) {
        console.log(searchToken);
        searchRepository.fetch(searchToken).then(function (data) {
            console.log('Success: ' + data);
        }, function (data) {
            console.log('Failed: ' + data);
        }, function (update) {
            console.log('Got notification: ' + data);
        });
    }
});
