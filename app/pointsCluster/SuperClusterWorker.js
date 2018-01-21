import supercluster from 'supercluster';
import SuperClusterService from './SuperClusterService';

let superClusterService = null;

// Respond to message from parent thread
self.addEventListener('message', (event) => {
    if(event.data && event.data.isLoad){
        superClusterService = new SuperClusterService(event.data.options);
        superClusterService.loadPoints(event.data.points);
    }
    if(event.data && event.data.isCluster){
        let clusterArray = superClusterService.getClustersArray(event.data.bbox, event.data.zoom);
        // Post data to parent thread
        self.postMessage({clusterArray: clusterArray});
    }
});