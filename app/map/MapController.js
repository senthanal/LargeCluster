import control from 'ol/control';
import ScaleLine from 'ol/control/scaleline';
import TileLayer from 'ol/layer/tile';
import Map from 'ol/map';
import 'ol/ol.css';
import proj from 'ol/proj';
import OSM from 'ol/source/osm';
import View from 'ol/view';
import './map.scss';

export default class MapController {
    constructor() {}

    $onDestroy() {
        this.map.setTarget(null);
        this.map = null;
    }

    $onInit() {
        this.map = new Map({
            target: 'map',
            view: new View({
                projection: 'EPSG:3857',
                displayProjection: 'EPSG:4326',
                center: proj.transform([11.58, 48.14], 'EPSG:4326', 'EPSG:900913'),
                zoom: 4
            }),
            controls: control.defaults({
                zoom: true,
                attribution: false,
                rotate: false
            }).extend([
                new ScaleLine()
            ]),
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ]
        });

        this.attachWindowResize();
        this.onMapReady({
            map: this.map
        });
    }

    attachWindowResize() {
        window.addEventListener("resize", () => {
            this.map.updateSize();
        }, false);
        let tid = setTimeout(() => {
            clearTimeout(tid);
            this.map.updateSize();
        }, 100);
    }
}