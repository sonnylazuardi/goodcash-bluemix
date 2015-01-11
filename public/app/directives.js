angular.module('GoodCash.directives', [])

.directive('accounting', function() {
    return {
        restrict: 'A',
        scope: {
            number: '=number',
            negative: '=negative',
        },
        template: '{{formatted}}',
        link: function (scope, element) {
            scope.$watch('number', function() {
                scope.formatted = accounting.formatMoney(scope.number);
                if (scope.negative) {
                    scope.formatted = '- ' + scope.formatted;
                }
            });
            scope.formatted = accounting.formatMoney(scope.number);
            if (scope.negative) {
                scope.formatted = '- ' + scope.formatted;
            }
        }
    }
})

.directive('time', function() {
    return {
        restrict: 'A',
        scope: {
            number: '=',
            format: '=',
        },
        template: '{{formatted}}',
        link: function (scope, element) {
            scope.$watch('number', function() {
                scope.formatted = moment(scope.number).format(scope.format);
            });
            scope.formatted = moment(scope.number).format(scope.format);
        }
    }
})

.directive('splash', function() {
    return {
        restrict: 'A',
        templateUrl: 'app/splash/splash.html',
        link: function (scope, element) {
            scope.done = false;
            setTimeout(function() {
                scope.done = true;
                scope.$apply();
            }, 1000);
        }
    }
})

.directive('tfFloat', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            fid : '@?',
            value : '='
        },
        compile : function() {
            return {
                pre : function(scope, element, attrs) {
                    if (angular.isDefines(attrs.disabled)) {
                        element.attr('disabled', true);
                        scope.isDisabled = true;
                    }

                    scope.label = attrs. label || "";
                    scope.fid = scope.fid || scope.label;

                    element.attr('type', attrs.type || "text");
                    element.attr('class', attrs.class);
                }
            }
        },
        template:
            '<material-input-group ng-disabled="isDisabled">' +
                '<label for="{{fid}}">{{label}}</label>' +
                '<material-input id="{{fid}}" ng-model="value">' +
            '</material-input-group>'
    };
});
