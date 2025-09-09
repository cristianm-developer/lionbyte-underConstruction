
import { ILoadingScreen } from '@babylonjs/core';
import style from './loaderComponent.module.scss';

export class LoaderComponentClass implements ILoadingScreen {
    displayLoadingUI = () => {
        document.querySelector('#loaderElement')?.classList.add('show');
    };
    hideLoadingUI = () => {
        document.querySelector('#loaderElement')?.classList.remove('show');
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
        <i className='logo'></i>
    </div>
}