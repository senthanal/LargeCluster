import supercluster from 'supercluster';

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

    static superclusterArrayToOlFeatures(Feature, Point, proj, clusterArray){
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