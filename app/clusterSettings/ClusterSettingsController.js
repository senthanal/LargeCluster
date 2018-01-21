
export default class ClusterSettingsController{
    constructor(){

    }

    $onDestroy(){}
    $onInit(){}
    $doCheck(){}

    onClusterPointsChange(){
        this.onClusterPointsCountChanged()(this.clusterPointsCount);
    }
}