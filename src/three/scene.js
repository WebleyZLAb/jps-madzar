import * as THREE from "three";
import { createTruck } from "./truck.js";
import { createRoad } from "./road.js";
import { DustParticles } from "./particles.js";

function buildSkyTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#11101a");
  gradient.addColorStop(0.45, "#1a1a2e");
  gradient.addColorStop(0.75, "#2e2433");
  gradient.addColorStop(0.92, "#5a3324");
  gradient.addColorStop(1, "#7a4a2e");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const isMobile = () => window.innerWidth < 760;

export class HeroScene {
  constructor(canvas, { reducedMotion = false } = {}) {
    this.canvas = canvas;
    this.reducedMotion = reducedMotion;
    this.clock = new THREE.Clock();
    this.active = true;
    this.tipperProgress = 0;
    this._frame = null;
    this._resizeHandler = () => this.resize();
  }

  init() {
    const mobile = isMobile();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
    this.renderer.shadowMap.enabled = !mobile;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.scene.background = buildSkyTexture();
    this.scene.fog = new THREE.Fog(0x2a2230, 9, mobile ? 32 : 42);

    this.camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
    this.basePosition = new THREE.Vector3(6.4, 3.0, 9.6);
    this.camera.position.copy(this.basePosition);
    this.lookTarget = new THREE.Vector3(0, 1.3, 0.4);
    this.camera.lookAt(this.lookTarget);

    this.addLights();

    const road = createRoad();
    this.road = road;
    this.scene.add(road.mesh);

    const { group, bedPivot, wheels, maxTipAngle } = createTruck();
    this.truck = group;
    this.bedPivot = bedPivot;
    this.wheels = wheels;
    this.maxTipAngle = maxTipAngle;
    this.truck.rotation.y = THREE.MathUtils.degToRad(18);
    this.scene.add(this.truck);

    const particleOrigin = new THREE.Vector3(0, 1.6, 5.2);
    this.particles = new DustParticles(mobile ? 90 : 260, particleOrigin);
    this.scene.add(this.particles.points);

    this.resize();
    window.addEventListener("resize", this._resizeHandler);

    this.start();
  }

  addLights() {
    const ambient = new THREE.AmbientLight(0x2a2a45, 0.65);
    this.scene.add(ambient);

    const hemi = new THREE.HemisphereLight(0x3a3550, 0x14121a, 0.5);
    this.scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffaa55, 2.0);
    key.position.set(8, 6.5, -4);
    key.castShadow = !isMobile();
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 30;
    key.shadow.camera.left = -10;
    key.shadow.camera.right = 10;
    key.shadow.camera.top = 10;
    key.shadow.camera.bottom = -10;
    key.shadow.bias = -0.002;
    this.scene.add(key);

    const rim = new THREE.DirectionalLight(0x5a6fc0, 0.55);
    rim.position.set(-7, 4, 6);
    this.scene.add(rim);
  }

  setTipperProgress(progress) {
    this.tipperProgress = THREE.MathUtils.clamp(progress, 0, 1);
    if (this.bedPivot) {
      this.bedPivot.rotation.x = this.tipperProgress * this.maxTipAngle;
    }
    if (this.particles) {
      this.particles.setIntensity(this.tipperProgress);
    }
    if (this.camera) {
      const dolly = this.tipperProgress * 0.9;
      this.camera.position.set(
        this.basePosition.x - dolly * 0.6,
        this.basePosition.y + dolly * 0.15,
        this.basePosition.z - dolly
      );
      this.camera.lookAt(this.lookTarget);
    }
  }

  resize() {
    if (!this.canvas) return;
    const { clientWidth, clientHeight } = this.canvas;
    const width = clientWidth || window.innerWidth;
    const height = clientHeight || window.innerHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  setActive(active) {
    this.active = active;
    if (active) {
      this.start();
    } else {
      this.stop();
    }
  }

  start() {
    if (this._frame !== null) return;
    this.clock.start();
    const loop = () => {
      this._frame = requestAnimationFrame(loop);
      this.tick();
    };
    loop();
  }

  stop() {
    if (this._frame !== null) {
      cancelAnimationFrame(this._frame);
      this._frame = null;
    }
  }

  tick() {
    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsed = this.clock.getElapsedTime();

    this.road.update(delta, 0.55 + this.tipperProgress * 0.4);
    this.particles.update(delta);

    if (!this.reducedMotion) {
      const bob = Math.sin(elapsed * 1.4) * 0.025;
      const sway = Math.sin(elapsed * 0.9) * 0.012;
      this.truck.position.y = bob;
      this.truck.rotation.z = sway;

      this.wheels.forEach((w) => {
        w.rotation.x -= delta * 1.6;
      });
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.stop();
    window.removeEventListener("resize", this._resizeHandler);
  }
}
