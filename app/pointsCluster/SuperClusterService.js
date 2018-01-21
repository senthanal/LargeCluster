import supercluster from 'supercluster';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import proj from 'ol/proj';

export default class SuperClusterService{
    constructor(options){
        this.clusterIndex = supercluster(options);
    }

    loadPoints(features){
        this.clusterIndex.load(features);
    }

    getClustersArray(bbox, zoom){
        return this.clusterIndex.getClusters(bbox, zoom);
    }

    superclusterArrayToOlFeatures(clusterArray){
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
}