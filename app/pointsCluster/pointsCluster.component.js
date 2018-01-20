import pointLayer from './pointsCluster.module';
import html from './pointsCluster.html';
import PointsClusterController from './PointsClusterController';

pointLayer.component('pointsCluster', {
    template: html,
    controller: PointsClusterController,
    bindings: {
        map: '<',
        options: '<',
        points: '<'
    }
});