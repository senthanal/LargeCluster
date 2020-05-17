import html from './pointsCluster.html';
import pointLayer from './pointsCluster.module';
import PointsClusterController from './PointsClusterController';

pointLayer.component('pointsCluster', {
    template: html,
    controller: PointsClusterController,
    bindings: {
        map: '<',
        options: '<',
        points: '<',
        clusterReady: '=',
        refreshCluster: '<',
        useWebWorker: '<',
        onClusterRefreshed: '&?'
    }
});