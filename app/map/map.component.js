import map from './map.module';
import html from './map.html';
import './map.scss';
import MapController from './MapController';

export default map.component('olMap', {
    template: html,
    controller: MapController,
    bindings: {
        map: '='
    }
});