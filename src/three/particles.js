import * as THREE from "three";

function buildDustSprite() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,235,210,0.9)");
  gradient.addColorStop(0.5, "rgba(224,123,42,0.45)");
  gradient.addColorStop(1, "rgba(224,123,42,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

export class DustParticles {
  constructor(count, origin) {
    this.count = count;
    this.origin = origin.clone();
    this.intensity = 0.08;

    this.velocities = new Float32Array(count * 3);
    this.lives = new Float32Array(count);
    this.maxLives = new Float32Array(count);

    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      this.respawn(i, positions, true);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.16,
      map: buildDustSprite(),
      transparent: true,
      depthWrite: false,
      sizeAttenuation: true,
      color: 0xe0b27a,
      opacity: 0.85
    });

    this.geometry = geometry;
    this.points = new THREE.Points(geometry, material);
    this.points.frustumCulled = false;
  }

  respawn(i, positionArray, initial = false) {
    const spread = 0.55 + this.intensity * 0.6;
    positionArray[i * 3] = this.origin.x + (Math.random() - 0.5) * spread;
    positionArray[i * 3 + 1] = this.origin.y + Math.random() * 0.4 - (initial ? Math.random() * 1.5 : 0);
    positionArray[i * 3 + 2] = this.origin.z + (Math.random() - 0.5) * 0.6;

    this.velocities[i * 3] = (Math.random() - 0.5) * 0.25;
    this.velocities[i * 3 + 1] = -0.25 - Math.random() * 0.35;
    this.velocities[i * 3 + 2] = 0.15 + Math.random() * 0.35;

    this.maxLives[i] = 1.2 + Math.random() * 1.4;
    this.lives[i] = initial ? Math.random() * this.maxLives[i] : 0;
  }

  setOrigin(vec3) {
    this.origin.copy(vec3);
  }

  setIntensity(value) {
    this.intensity = THREE.MathUtils.clamp(value, 0, 1);
  }

  update(delta) {
    const positions = this.geometry.attributes.position.array;
    const activeCount = Math.max(6, Math.floor(this.count * (0.12 + this.intensity * 0.88)));

    for (let i = 0; i < this.count; i++) {
      if (i >= activeCount) {
        // park inactive particles out of view
        positions[i * 3 + 1] = -50;
        continue;
      }

      this.lives[i] += delta;
      if (this.lives[i] >= this.maxLives[i]) {
        this.respawn(i, positions);
        continue;
      }

      this.velocities[i * 3 + 1] -= delta * 0.4; // gravity
      positions[i * 3] += this.velocities[i * 3] * delta;
      positions[i * 3 + 1] += this.velocities[i * 3 + 1] * delta;
      positions[i * 3 + 2] += this.velocities[i * 3 + 2] * delta;
    }

    this.geometry.attributes.position.needsUpdate = true;
  }
}
