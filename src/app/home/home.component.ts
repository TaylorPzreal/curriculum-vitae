import * as THREE from 'three';
const OrbitControls = require('three-orbitcontrols');

import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'cv-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {

  public ngOnInit() {

    this.initHoneyThree();
  }

  public initHoneyThree(): void {
    console.warn('投影');

    let scene: THREE.Scene;
    let camera: THREE.Camera;
    let renderer: THREE.WebGLRenderer;
    // let material: THREE.MeshLambertMaterial;
    // let rocks: Rock;
    let angle: number = 0;

    const width = document.body.clientWidth;
    const height = window.innerHeight;

    function initScene() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.set(0, 30, 50);
      camera.lookAt(new THREE.Vector3(0, 15, 0));
      renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      renderer.setSize(width, height);
      renderer.setClearColor(0x393e46);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      document.getElementById('honeythree').appendChild(renderer.domElement);
    }

    function initLights() {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      // light.position.set(300, 300, 0);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(25, 50, 25);
      pointLight.castShadow = true;
      pointLight.shadow.mapSize.width = 1024;
      pointLight.shadow.mapSize.height = 1024;
      scene.add(pointLight);
    }

    function initMesh() {
      const shadowMaterisl = new THREE.ShadowMaterial(0xeeeeee);
      shadowMaterisl.opacity = 0.5;
      const groundMesh = new THREE.Mesh(
        new THREE.BoxGeometry(100, .1, 100),
        shadowMaterisl
      );
      groundMesh.receiveShadow = true;
      scene.add(groundMesh);
    }

    function generateShapes() {
      // A simple geometric shape with a flat material
      const shapeOne = new THREE.Mesh(
        new THREE.OctahedronGeometry(10, 1),
        new THREE.MeshStandardMaterial({
          color: 0xff0051,
          shading: THREE.FlatShading,
          metalness: 0,
          roughness: 0.8
        })
      );
      shapeOne.position.y += 10;
      shapeOne.rotateZ(Math.PI / 3);
      shapeOne.castShadow = true;
      scene.add(shapeOne);

      // Add a second shape
      const shapeTwo = new THREE.Mesh(
        new THREE.OctahedronGeometry(5, 1),
        new THREE.MeshStandardMaterial({
          color: 0x47689b,
          shading: THREE.FlatShading,
          metalness: 0,
          roughness: 0.8
        })
      );
      shapeTwo.position.y += 5;
      shapeTwo.position.x += 15;
      shapeTwo.rotateZ(Math.PI / 5);
      shapeTwo.castShadow = true;
      scene.add(shapeTwo);
    }

    function render() {
      // requestAnimationFrame(render);

      renderer.render(scene, camera);

      // updateCamPosition();
    }

    function updateCamPosition() {
      angle += 0.005;
      const z = 50 * Math.cos(angle);
      const y = 50 * Math.sin(angle);

      // camera.position.z = z;
      camera.position.y = y;
      // camera.rotation.x = z * 0.02;
    }

    // function resize() {
    //   // camera.aspect = width / height;
    //   camera.updateMatrix();
    //   renderer.setSize(width, height);
    // }

    // window.addEventListener('resize', resize);

    function initControls() {
      const controls =  new OrbitControls(
        camera, renderer.domElement
      );
      controls.target = new THREE.Vector3(0, 15, 0);
      controls.maxPolarAngle = Math.PI / 2;
      controls.addEventListener('change', () => {
        renderer.render(scene, camera);
      });
    }

    initScene();
    initLights();
    initMesh();
    generateShapes();
    initControls();
    render();

  }


}
