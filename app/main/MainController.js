import {
    randomPoint
} from '@turf/random';
import proj from 'ol/proj';

export default class MainController {
    constructor($interval) {
        "ngInject";
        this.$interval = $interval;
    }

    $onInit() {
        this.map = null;
        this.refreshCluster = false;
        this.isInitialized = false;
        this.points = null;
        this.useWebWorker = false;
        this.clusterReady = false;
        this.pointsCount = 100000;
        this.clusterOptions = {
            name: "Stores",
            shape: "circle",
            radius: 5,
            fillColor: "#00ecff"
        };
    }

    generatePoints() {
        this.points = randomPoint(this.pointsCount, {
            bbox: proj.transformExtent(this.map.getView().calculateExtent(), 'EPSG:3857', 'EPSG:4326')
        });
        this.$interval(() => {
            this.refreshCluster = true;
        }, 100, 1);

    }

    onMapReady(map) {
        this.map = map;
        this.isInitialized = true;
        this.generatePoints();
    }

    onPointsCountChanged(pointsCount) {
        this.pointsCount = pointsCount;
        this.generatePoints();
    }

    onClusterRefreshed() {
        this.refreshCluster = false;
    }
}