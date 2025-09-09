'use client';


import { BabylonCanvas } from "@/components/babylonCanvas/babylonCanvas";
import styles from "./page.module.scss";
import { LightsComponent } from "@/components/lightsComponent/lightsComponent";
import { LogoModel } from "@/components/sceneManager/models/logo/logoModel";
import { SceneManager } from "@/components/sceneManager/sceneManager";
import { CanvasContextProvider } from "@/context/canvasContext/canvasContext";
import { FloorModel } from "@/components/sceneManager/models/floor/floorModel";
import { MouseComponent } from "@/components/mouseComponent/mouseComponent";
import { OptimizerComponent } from "@/components/optimizer/optimizerComponent";
import { WarningLetterModel } from "@/components/sceneManager/models/warningLetter/warningLetterModel";
import { Vector3 } from "@babylonjs/core";
import { LoaderComponent } from "@/components/loader/loaderComponent";
import { GuiComponent } from "@/components/gui/guiComponent";

export default function Home() {
  

  return <main className={styles.mainComponent}>
    <LoaderComponent></LoaderComponent>
    <CanvasContextProvider>
      <BabylonCanvas initConfig={{showDebug: false, attachCameraControl: false}}>
        <OptimizerComponent></OptimizerComponent>
        <LightsComponent></LightsComponent>
        <SceneManager >
          <LogoModel></LogoModel>
          <WarningLetterModel position={new Vector3(0, -9, 2)} rotation={new Vector3(0, 0, 0)} scale={new Vector3(2, 2, 2)}></WarningLetterModel>
          <FloorModel></FloorModel>
        </SceneManager>
        <MouseComponent lightConfig={{ intensity: 2 }} pushConfig={{ force: -4, decay: 12 }}></MouseComponent>
      </BabylonCanvas>
     </CanvasContextProvider>
     <GuiComponent></GuiComponent>
  </main>;
 
}
