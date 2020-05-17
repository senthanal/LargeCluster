export class ClusterSettingsController {
    constructor() {}

    onClusterPointsChange() {
        this.onClusterPointsCountChanged({
            pointsCount: this.clusterPointsCount
        });
    }
}