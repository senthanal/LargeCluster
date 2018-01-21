import clusterSettings from './clusterSettings.module';
import html from './clusterSettings.html';
import './clusterSettings.scss';
import ClusterSettingsController from './ClusterSettingsController';

clusterSettings.component('clusterSettings', {
    template: html,
    controller: ClusterSettingsController,
    bindings: {
        clusterPointsCount: '<',
        useWebWorker: '=',
        onClusterPointsCountChanged: '&'
    }
});