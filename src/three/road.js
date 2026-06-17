import * as THREE from "three";

function buildAsphaltTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#221f26";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // subtle grain
  for (let i = 0; i < 1400; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const shade = Math.random() > 0.5 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.05)";
    ctx.fillStyle = shade;
    ctx.fillRect(x, y, 2, 2);
  }

  // lane edge lines
  ctx.fillStyle = "rgba(244,241,234,0.18)";
  ctx.fillRect(14, 0, 4, canvas.height);
  ctx.fillRect(canvas.width - 18, 0, 4, canvas.height);

  // dashed centre line in accent amber
  ctx.fillStyle = "#e07b2a";
  const dashH = 70;
  const gap = 50;
  for (let y = 0; y < canvas.height; y += dashH + gap) {
    ctx.fillRect(canvas.width / 2 - 5, y, 10, dashH);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 30);
  texture.anisotropy = 4;
  return texture;
}

export function createRoad() {
  const texture = buildAsphaltTexture();
  const geometry = new THREE.PlaneGeometry(34, 220, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.95,
    metalness: 0.05
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0;
  mesh.receiveShadow = true;

  function update(delta, speed = 0.06) {
    texture.offset.y -= delta * speed;
  }

  return { mesh, texture, update };
}
