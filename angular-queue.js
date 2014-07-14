/**
 * Created by xerxes on 7/14/14.
 */
(function (window, angular, undefined) {
    'use strict';
    angular.module('ngQueue', []).factory('$Queue',
        ['$timeout', $q,
            function ($timeout, $q) {

                function Queue(options) {
                    options = angular.extend({}, options);
                    //public variables
                    this.queue = [];
                    this.delay = options.delay || 100; //100 milisecond delay
                    this.complete = options.complete || false;

                    this.q_len = function () {
                        this.queue.length;
                    };
                    this.q_push = function (item) {
                        this.queue.push(item);
                    };
                    this.q_pop = function () {
                        var deferred = $q.defer();

                        if (this.queue.length > 0) {
                            deferred.resolve((function (item) {
                                this.queue.shift();
                                return item;
                            })(this.queue[0]));
                        } else {
                            deferred.resolve(null);
                        }
                        return deferred.promise;
                    }
                };
            }]);

})(window, window.angular);