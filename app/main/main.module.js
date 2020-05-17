import '@uirouter/angularjs';
import angular from 'angular';
import 'angular-animate';
import 'angular-loading-bar';
import 'angular-sanitize';
import 'angular-toastr';
import 'angular-touch';
import './../clusterSettings/clusterSettings.module';
import './../map/map.module';
import './../pointsCluster/pointsCluster.module';

export default angular
    .module('main', [
        // Angular components
        'ngAnimate',
        'ngSanitize',
        'ngLocale',

        // Third party angular components
        'ui.router',
        'angular-loading-bar',
        'toastr',

        // App Components
        'main.map',
        'main.pointsCluster',
        'main.clusterSettings'
    ])
    .config(configure);

function configure($windowProvider, $locationProvider, $urlRouterProvider, $stateProvider, $compileProvider, $logProvider, cfpLoadingBarProvider, toastrConfig) {
    "ngInject";
    // HTML5 mode settings
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false,
        rewriteLinks: true
    });
    $locationProvider.hashPrefix('');

    $urlRouterProvider
        .when('', '/main')
        .when('/', '/main')
        .when('/main/', ['$state', function($state) {
            $state.go("main");
        }]);


    // Routes config
    let states = [{
        name: 'main',
        url: '/main',
        component: 'main',
        resolve: {}
    }];

    // Loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });

    // Angular performance option
    $compileProvider.debugInfoEnabled(false);

    // configure how the application logs messages
    $logProvider.debugEnabled(false);

    // Angular loading bar spinner config
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 200;

    // Toastr notifications configuration
    angular.extend(toastrConfig, {
        allowHtml: true,
        closeButton: true,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 1000,
        autoDismiss: true,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        preventOpenDuplicates: true,
        target: 'body',
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
        },
        messageClass: 'toast-message',
        onHidden: null,
        onShown: null,
        onTap: null,
        progressBar: false,
        tapToDismiss: true,
        /*templates: {
         toast: 'directives/toast/toast.html',
         progressbar: 'directives/progressbar/progressbar.html'
         },*/
        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });
}