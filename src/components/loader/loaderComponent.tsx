
import { ILoadingScreen } from '@babylonjs/core';
import style from './loaderComponent.module.scss';
import { IconComponent } from '../icon/iconComponent';

export class LoaderComponentClass implements ILoadingScreen {
    displayLoadingUI = () => {
        document.body.classList.add('loading');
        document.querySelector('#loaderElement')?.classList.add('show');
    };
    hideLoadingUI = () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('ready');
            document.querySelector('#loaderElement')?.classList.remove('show');
        }, 1000);
    };
    loadingUIText: string;
    loadingUIBackgroundColor: string;

    constructor() {
        this.loadingUIText = "";
        this.loadingUIBackgroundColor = "black";
    }
}

export const LoaderComponent = () => {

    return <div id='loaderElement' className={`${style.mainComponent} show`}>
        <IconComponent icon='logo'></IconComponent>
    </div>
}