import html from './main.html';
import './main.scss';
import MainController from './MainController';
import main from './main.module';

import './../map/map.component';
import './../pointsCluster/pointsCluster.component';

main.component('main', {
    template: html,
    controller: MainController
});