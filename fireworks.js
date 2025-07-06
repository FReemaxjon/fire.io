// fireworks.js
import * as THREE from 'three';

export class Fireworks {
  constructor(scene, anchorGroup) {
    this.particles = [];
    this.velocities = [];
    this.lifetime = 0;

    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Set initial position
      positions[i3 + 0] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;

      // Random velocity
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = Math.random() * 0.05 + 0.02;
      this.velocities.push([
        speed * Math.sin(phi) * Math.cos(theta),
        speed * Math.sin(phi) * Math.sin(theta),
        speed * Math.cos(phi),
      ]);

      // Random color
      colors[i3 + 0] = Math.random();
      colors[i3 + 1] = Math.random();
      colors[i3 + 2] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
    });

    this.points = new THREE.Points(geometry, material);
    anchorGroup.add(this.points);
    this.geometry = geometry;
  }

  update(delta) {
    const positions = this.geometry.attributes.position.array;
    this.lifetime += delta;

    for (let i = 0; i < this.velocities.length; i++) {
      const i3 = i * 3;
      positions[i3 + 0] += this.velocities[i][0];
      positions[i3 + 1] += this.velocities[i][1];
      positions[i3 + 2] += this.velocities[i][2];
    }
scene.background = new THREE.Color(0x000000);
    this.geometry.attributes.position.needsUpdate = true;
  }
}
