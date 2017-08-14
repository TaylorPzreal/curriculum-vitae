import { Component, AfterViewInit } from '@angular/core';

import * as BABYLON from 'babylonjs';

@Component({
  selector: 'cv-game3d',
  templateUrl: './game-3d.component.html',
  styleUrls: ['./game-3d.component.scss']
})
export class Game3DComponent implements AfterViewInit {
  private canvas: HTMLCanvasElement;
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private camera: BABYLON.ArcRotateCamera;
  private light: BABYLON.Light;

  public ngAfterViewInit() {
    this.canvas = document.getElementById('game3dCanvas') as HTMLCanvasElement;
    this.engine = new BABYLON.Engine(this.canvas, true);

    this.createScene();
    this.animate();
  }

  private createScene(): void {
    this.scene = new BABYLON.Scene(this.engine);
    // this.engine.enableOfflineSupport = false;
    // this.scene.clearColor = new BABYLON.Color3.White();

    const sphere1 = BABYLON.Mesh.CreateSphere('sphere1', 10.0, 10.0, this.scene);
    sphere1.position = new BABYLON.Vector3(0, 10, 0);

    this.camera = new BABYLON.ArcRotateCamera('Camera', 3 * Math.PI / 2, Math.PI / 8, 50, BABYLON.Vector3.Zero(), this.scene);

    // this.camera = new BABYLON.FollowCamera('followCamera', new BABYLON.Vector3(0, 15, -45), this.scene);
    // this.camera.lockedTarget = sphere1;

    // this.camera.radius = 30;
    // this.camera.heightOffset = 8;
    // this.camera.rotationOffset = 180;
    // this.camera.cameraAcceleration = 0.05;
    // this.camera.maxCameraSpeed = 20;
    // this.camera.target = sphere1;
    // this.scene.activeCamera = this.camera;

    // this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this.scene);
    // this.camera = new BABYLON.FollowCamera('followcamera', BABYLON.Vector3.Zero(), this.scene);
    // this.camera.radius = 10;
    // this.camera.heightOffset = 0;

    // this.camera.setTarget(BABYLON.Vector3.Zero());

    this.camera.attachControl(this.canvas, true);

    // this.camera.keysUp.push(38);
    // this.camera.keysDown.push(40);
    // this.camera.keysLeft.push(37);
    // this.camera.keysRight.push(39);

    this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 100, 100), this.scene);
    this.light.diffuse = new BABYLON.Color3(41, 94, 106);

    this.light = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(0, 10, 0), this.scene);
    this.light.parent = this.camera;
    this.light.diffuse = new BABYLON.Color3(1, 1, 1);

    const sphere = BABYLON.Mesh.CreateSphere('sphere', 10.0, 10.0, this.scene);
    sphere.position = new BABYLON.Vector3(0, 10, 0);
    const materialSphere = new BABYLON.StandardMaterial('textureSphere', this.scene);
    // materialSphere.diffuseTexture = new BABYLON.Texture('src/assets/images/game/fire.jpg', this.scene);
    materialSphere.diffuseColor = BABYLON.Color3.Blue();
    materialSphere.specularColor = BABYLON.Color3.Red();

    materialSphere.alpha = 0.8;
    sphere.material = materialSphere;

    const ground2 = BABYLON
      .Mesh
      .CreateGroundFromHeightMap('ground2', 'src/assets/images/magic/ground.jpg', 100, 100, 100, 0, 10, this.scene, false);
    const ground2Material = new BABYLON.StandardMaterial('ground2', this.scene);
    ground2Material.diffuseTexture = new BABYLON. Texture('src/assets/images/game/floor.jpeg', this.scene);
    // ground2Material.diffuseTexture = new BABYLON.Texture('src/assets/images/game/plant.jpeg', this.scene);
    // ground2Material.diffuseTexture.uScale = 6;
    // ground2Material.diffuseTexture.vScale = 6;
    ground2Material.specularColor = new BABYLON.Color3(0, 0, 0);
    ground2.position.y = -2.05;
    ground2.material = ground2Material;

  }

  private animate(): void {
    this.engine.runRenderLoop(() => {
      this.scene.render();

      const sphere1 = this.scene.getMeshByName('sphere1');
      // this.scene.activeCamera.follow(sphere1);
    });

    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }

}
