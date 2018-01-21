import _get from 'lodash/get';
import _forEach from 'lodash/foreach';
import proj from 'ol/proj';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import Style from 'ol/style/style';
import Circle from 'ol/style/circle';
import RegularShape from 'ol/style/regularshape';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import Text from 'ol/style/text';
import LayerVector from 'ol/layer/vector';
import SourceVector from 'ol/source/vector';
import GeoJSON from 'ol/format/GeoJSON';
import supercluster from 'supercluster';
import clustersKmeans from '@turf/clusters-kmeans';
import clustersDbscan from '@turf/clusters-dbscan';

let gj = new GeoJSON();
export default class PointsClusterController {
    constructor() {
        this.isInitialized = false;
        let styleCache = {};
        this.layer = new LayerVector({
            name: this.options.name,
            source: new SourceVector({
                format: new GeoJSON({ dataProjection: 'EPSG::4326', featureProjection: 'EPSG::3857' })
            }),
            // https://jsfiddle.net/8kan25Ld/9/
            style: function (feature) {
                var size = feature.get('point_count_abbreviated');
                if (size == undefined) {
                    size = 1;
                }
                var style = styleCache[size];
                if (!style) {
                    style = new Style({
                        image: new Circle({
                            radius: 13,
                            stroke: new Stroke({
                                color: '#fff'
                            }),
                            fill: new Fill({
                                color: '#3399CC'
                            })
                        }),
                        text: new Text({
                            text: size.toString(),
                            fill: new Fill({
                                color: '#fff'
                            })
                        })
                    });
                    styleCache[size] = style;
                }
                return style;
            }
        });
        this.clusterIndex = supercluster({
            log: false,
            radius: 40,
            extent: 256,
            maxZoom: 17
        });
    }

    $onDestroy() {}
    $onInit() {}
    $doCheck() {
        if (this.map && !this.isInitialized) {
            this.isInitialized = true;
            this.init();
        }
    }

    $onChanges(changes){
        if(changes.points && this.isInitialized){
            this.clusterIndex.load(this.points.features);
            this.executeCluster();
        }
    }

    init() {
        this.map.addLayer(this.layer);
        this.map.on('moveend', this.executeCluster, this);
    }

    executeCluster(){
        let clusteredPoints = this.getClusterPoints();
        if (clusteredPoints) {
            this.layer.getSource().clear();
            this.layer.getSource().addFeatures(clusteredPoints);
        }
    }

    getClusterPoints() {
        //return clustersDbscan(this.points, 1000);
        //return clustersKmeans(this.points, {numberOfClusters: 7});
        let bbox = proj.transformExtent(this.map.getView().calculateExtent(), 'EPSG:3857', 'EPSG:4326');
        let zoom = this.map.getView().getZoom();
        let clusterArray = this.clusterIndex.getClusters(bbox, zoom);
        return this.superclusterFeatures(clusterArray);
    }

    superclusterFeatures(clusterArray){
        let features = [];
        for (var i = 0; i < clusterArray.length; ++i) {
            var feature = new Feature(new Point(
                proj.fromLonLat(
                    clusterArray[i].geometry.coordinates.map((numfloat)=> {
                        return parseFloat(numfloat);
                    })
                )
            ));
            feature.setProperties(clusterArray[i]['properties']);
            features.push(feature);
        }
        return features;
    }

    getStyle(radius) {
        let stroke = new Stroke({
            color: this.options.strokeColor || 'black',
            width: this.options.strokeWidth || 2
        });
        let fill = new Fill({
            color: this.options.fillColor || 'red'
        });
        let styles = {
            'circle': new Style({
                image: new Circle({
                    fill: fill,
                    radius: radius || this.options.shapeRadius || 10,
                    stroke: stroke
                })
            }),
            'square': new Style({
                image: new RegularShape({
                    fill: fill,
                    stroke: stroke,
                    points: 4,
                    radius: radius || this.options.shapeRadius || 10,
                    angle: Math.PI / 4
                })
            }),
            'triangle': new Style({
                image: new RegularShape({
                    fill: fill,
                    stroke: stroke,
                    points: 3,
                    radius: radius || this.options.shapeRadius || 10,
                    rotation: Math.PI / 4,
                    angle: 0
                })
            }),
            'star': new Style({
                image: new RegularShape({
                    fill: fill,
                    stroke: stroke,
                    points: 5,
                    radius: radius || this.options.shapeRadius || 10,
                    radius2: 4,
                    angle: 0
                })
            }),
            'cross': new Style({
                image: new RegularShape({
                    fill: fill,
                    stroke: stroke,
                    points: 4,
                    radius: radius || this.options.shapeRadius || 10,
                    radius2: 0,
                    angle: 0
                })
            }),
            'x': new Style({
                image: new RegularShape({
                    fill: fill,
                    stroke: stroke,
                    points: 4,
                    radius: radius || this.options.shapeRadius || 10,
                    radius2: 0,
                    angle: Math.PI / 4
                })
            })
        };

        return _get(styles, this.options.shape, "");
    }
}