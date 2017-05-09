import * as THREE from 'three';
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
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    document.getElementById('honeythree').appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xb83b5e
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function render(): void {
      requestAnimationFrame(render);
      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
      renderer.render(scene, camera);
    }

    render();

  }


}
