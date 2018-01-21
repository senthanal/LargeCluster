import {randomPoint} from '@turf/random';
import proj from 'ol/proj';

export default class MainController{
    constructor(){
        this.map = null;
        this.isInitialized = false;
        this.points = null;
        this.useWebWorker = false;
        this.pointsCount = 1000;
        this.clusterOptions = {
            name: "Stores",
            shape: "circle",
            radius: 5,
            fillColor: "#00ecff"
        };
    }

    $doCheck(){
        if(this.map && !this.isInitialized){
            this.isInitialized = true;
            this.generatePoints();
        }
    }

    generatePoints(){
        this.points = randomPoint(this.pointsCount, {bbox: proj.transformExtent(this.map.getView().calculateExtent(), 'EPSG:3857', 'EPSG:4326')});
    }

    onPointsCountChanged(pCount){
        this.pointsCount = pCount;
        this.generatePoints();
    }
}