import html from './clusterSettings.html';
import clusterSettings from './clusterSettings.module';
import './clusterSettings.scss';
import {
    ClusterSettingsController
} from './ClusterSettingsController';

clusterSettings.component('clusterSettings', {
    template: html,
    controller: ClusterSettingsController,
    bindings: {
        clusterPointsCount: '<',
        useWebWorker: '=',
        clusterReady: '<',
        onClusterPointsCountChanged: '&'
    }
});