import * as THREE from 'three';
// import EmbellishImage from 'embellish-image';

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
    console.warn('test');

    const width = document.body.clientWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x393e46);
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 100);

    camera.position.set(0, 0, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    document.getElementById('honeythree').appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const geometry = new THREE.Geometry();
    // geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    // geometry.vertices.push(new THREE.Vector3(0, 10, 0));
    // geometry.vertices.push(new THREE.Vector3(10, 0, 0));


    const material = new THREE.MeshBasicMaterial({
      color: 0xb83b5e
    });

    // const material = new THREE.LineBasicMaterial({
    //   color: 0x0000ff
    // });
    // const line = new THREE.Line(geometry, material);
    // scene.add(line);

    // renderer.render(scene, camera);


    camera.position.z = 5;

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function render(): void {
      requestAnimationFrame(render);
      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
      renderer.render(scene, camera);
    }

    render();

  }


}
