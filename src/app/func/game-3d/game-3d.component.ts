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

    this.camera = new BABYLON.ArcRotateCamera('Camera', 3 * Math.PI / 2, Math.PI / 8, 50, BABYLON.Vector3.Zero(), this.scene);
    this.camera.setPosition(new BABYLON.Vector3(20, 70, 120));
    this.camera.attachControl(this.canvas, false);

    this.light = new BABYLON.DirectionalLight('dirLight', new BABYLON.Vector3(0, -0.5, -1), this.scene);
    // this.light.position = new BABYLON.Vector3(50, 250, 200);
    // this.light.shadowOrthoScale = 2.0;
    this.light.parent = this.camera;
    this.light.diffuse = new BABYLON.Color3(0, 0, 0);

    const light1 = new BABYLON.PointLight('Omni1', new BABYLON.Vector3(0, 10, 0), this.scene);
    // const light2 = new BABYLON.PointLight('Omni2', new BABYLON.Vector3(0, -10, 20), this.scene);
    // const light3 = new BABYLON.PointLight('Omni3', new BABYLON.Vector3(10, 0, 0), this.scene);

    const material = new BABYLON.StandardMaterial('kosh', this.scene);

    const sphere = BABYLON.Mesh.CreateSphere('sphere', 10.0, 10.0, this.scene);
    sphere.position = new BABYLON.Vector3(0, 10, 0);
    const materialSphere = new BABYLON.StandardMaterial('textureSphere', this.scene);
    materialSphere.diffuseTexture = new BABYLON.Texture('src/assets/images/game/floor-stone.jpg', this.scene);
    // materialSphere.diffuseColor = new BABYLON.Color3(0, 0, 0);
    materialSphere.emissiveColor = new BABYLON.Color3(0.13, 0.15, 0.35);
    // materialSphere.specularColor = new BABYLON.Color3(0, 0, 0);
    // materialSphere.alpha = 0.9;
    sphere.material = materialSphere;

    const lightSphere1 = BABYLON.Mesh.CreateSphere('Sphere1', 16, 0.5, this.scene);
    const lightSphere2 = BABYLON.Mesh.CreateSphere('Sphere2', 16, 0.5, this.scene);
    const lightSphere3 = BABYLON.Mesh.CreateSphere('Sphere3', 20, 1, this.scene);

    const lightSphere1Material = new BABYLON.StandardMaterial('green', this.scene);
    lightSphere1Material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    lightSphere1Material.specularColor = new BABYLON.Color3(0, 0, 0);
    lightSphere1Material.emissiveColor = new BABYLON.Color3(0.36, 0.91, 0.77);
    lightSphere1.material = lightSphere1Material;

    const lightSphere3Material = new BABYLON.StandardMaterial('gray', this.scene);
    lightSphere3.material = lightSphere3Material;

    light1.diffuse = new BABYLON.Color3(0.36, 0.91, 0.77);
    light1.specular = new BABYLON.Color3(0.36, 0.91, 0.77);

    const ground2 = BABYLON
      .Mesh
      .CreateGround('ground', 1000, 1000, 1, this.scene, false);
      // .CreateGroundFromHeightMap('ground2', 'src/assets/images/magic/ground.jpg', 100, 100, 100, 0, 10, this.scene, false);
    const ground2Material: BABYLON.StandardMaterial = new BABYLON.StandardMaterial('ground2', this.scene);
    ground2Material.diffuseTexture = new BABYLON. Texture('src/assets/images/game/floor1.jpeg', this.scene);
    // ground2Material.diffuseTexture = new BABYLON.Texture('src/assets/images/game/plant.jpeg', this.scene);
    // ground2Material.diffuseTexture.uScale = 20;
    // ground2Material.diffuseTexture.vScale = 20;
    ground2Material.specularColor = new BABYLON.Color3(0, 0, 0);
    ground2.position.y = -2.05;
    ground2.material = ground2Material;
    ground2.receiveShadows = true;

    // const shadowGenerator = new BABYLON.ShadowGenerator(1024, this.light);


    let alpha = 0;
    this.scene.beforeRender = () => {
      light1.position = new BABYLON.Vector3(10 * Math.sin(alpha * 2), 0, 10 * Math.cos(alpha * 2));
      lightSphere1.position = light1.position;

      lightSphere3.position = new BABYLON.Vector3(20 * Math.sin(alpha), 10 + 10 * Math.sin(alpha), 20 * Math.cos(alpha));

      sphere.position = new BABYLON.Vector3(5 * Math.sin(alpha * 5), 10, 5 * Math.cos(alpha * 5));

      alpha += 0.01;
    };

    // plane
    const plane = BABYLON.Mesh.CreatePlane('wall', 100, this.scene, false, 2);
    plane.position = new BABYLON.Vector3(0, 40, 100);
    const planeMaterial = new BABYLON.StandardMaterial('wall', this.scene);
    planeMaterial.diffuseTexture = new BABYLON.Texture('src/assets/images/game/wall.jpeg', this.scene);
    // planeMaterial.diffuseTexture.uScale = 10;
    // planeMaterial.diffuseTexture.vScale = 10;
    // planeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    planeMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    plane.material = planeMaterial;
    plane.receiveShadows = true;

    const spriteManagerPlayer = new BABYLON.SpriteManager('playermanager', 'src/assets/images/game/fire.jpg', 10, 100, this.scene);
    const player = new BABYLON.Sprite('player', spriteManagerPlayer);

    player.playAnimation(0, 1000, true, 100, () => {
      // do
    });
    player.position.y = 2;
    player.size = 10;
    player.isPickable = true;

    const box = BABYLON.Mesh.CreateBox('box', 10, this.scene);
    box.position = new BABYLON.Vector3(10, 3, 30);
    box.rotation = new BABYLON.Vector3(0, 10, 0);
    const boxmaterial = new BABYLON.StandardMaterial('box', this.scene);
    boxmaterial.diffuseTexture = new BABYLON.Texture('src/assets/images/game/woodbox.png', this.scene);
    box.material = boxmaterial;

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
