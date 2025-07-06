import * as THREE from 'three';

export class Fireworks {
  constructor(scene, parentGroup) {
    this.particles = [];
    this.geometry = new THREE.BufferGeometry();

    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      // Start at origin
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      // Random outward velocity
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const vz = (Math.random() - 0.5) * speed;
      velocities.push(new THREE.Vector3(vx, vy, vz));
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.velocities = velocities;

    const material = new THREE.PointsMaterial({
      color: 0xffaa00,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });

    this.points = new THREE.Points(this.geometry, material);
    parentGroup.add(this.points);

    this.lifetime = 0;
    this.maxLifetime = 2; // seconds
  }

  update(delta) {
    this.lifetime += delta;

    const positions = this.geometry.attributes.position.array;

    for (let i = 0; i < this.velocities.length; i++) {
      const v = this.velocities[i];
      positions[i * 3] += v.x * delta;
      positions[i * 3 + 1] += v.y * delta;
      positions[i * 3 + 2] += v.z * delta;

      // Add some gravity
      v.y -= 0.5 * delta;
    }

    this.geometry.attributes.position.needsUpdate = true;

    // Reset after lifetime ends
    if (this.lifetime > this.maxLifetime) {
      this.resetParticles();
    }
  }

  resetParticles() {
    const positions = this.geometry.attributes.position.array;

    for (let i = 0; i < this.velocities.length; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      this.velocities[i].set(
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        (Math.random() - 0.5) * speed
      );
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.lifetime = 0;
  }
}
