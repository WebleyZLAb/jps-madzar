import * as THREE from "three";

const PALETTE = {
  chassis: 0x23222b,
  cabin: 0x2e2d3a,
  cabinDark: 0x1c1b24,
  glass: 0x0d1320,
  bed: 0x29262b,
  bedTrim: 0xe07b2a,
  tire: 0x111114,
  rim: 0x3a3a42,
  light: 0xffd9a0,
  tail: 0xc23b2c,
  exhaust: 0x55555c
};

function box(w, h, d, color, opts = {}) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.65,
    metalness: opts.metalness ?? 0.35,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 1
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = opts.castShadow ?? true;
  mesh.receiveShadow = opts.receiveShadow ?? true;
  return mesh;
}

function wheel(radius, width) {
  const group = new THREE.Group();

  const tireGeo = new THREE.CylinderGeometry(radius, radius, width, 20);
  const tireMat = new THREE.MeshStandardMaterial({
    color: PALETTE.tire,
    roughness: 0.9,
    metalness: 0.1
  });
  const tire = new THREE.Mesh(tireGeo, tireMat);
  tire.rotation.z = Math.PI / 2;
  tire.castShadow = true;
  tire.receiveShadow = true;
  group.add(tire);

  const rimGeo = new THREE.CylinderGeometry(radius * 0.45, radius * 0.45, width * 1.02, 12);
  const rimMat = new THREE.MeshStandardMaterial({
    color: PALETTE.rim,
    roughness: 0.4,
    metalness: 0.7
  });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.rotation.z = Math.PI / 2;
  group.add(rim);

  return group;
}

/**
 * Builds a stylised rear-tipper (kiper) truck from primitive geometry.
 * Truck "forward" faces -Z. Returns the root group plus references
 * needed for animation (tipper pivot, wheels for idle motion).
 */
export function createTruck() {
  const truck = new THREE.Group();

  const frameY = 1.05;
  const frameLength = 8.6;
  const frameWidth = 2.3;

  // Chassis / frame rail
  const frame = box(frameWidth, 0.32, frameLength, PALETTE.chassis, {
    roughness: 0.7,
    metalness: 0.4
  });
  frame.position.set(0, frameY, 0);
  truck.add(frame);

  // --- Cabin ---------------------------------------------------------
  const cabinGroup = new THREE.Group();
  cabinGroup.position.set(0, frameY + 0.18, -2.95);
  truck.add(cabinGroup);

  const cabinBody = box(2.15, 1.55, 1.9, PALETTE.cabin, { metalness: 0.5, roughness: 0.45 });
  cabinBody.position.set(0, 0.95, 0);
  cabinGroup.add(cabinBody);

  const cabinRoof = box(2.0, 0.32, 1.7, PALETTE.cabinDark, { metalness: 0.5, roughness: 0.45 });
  cabinRoof.position.set(0, 1.86, 0.05);
  cabinGroup.add(cabinRoof);

  const windshield = box(1.92, 0.7, 0.06, PALETTE.glass, {
    metalness: 0.2,
    roughness: 0.1,
    castShadow: false
  });
  windshield.position.set(0, 1.05, -0.96);
  windshield.rotation.x = THREE.MathUtils.degToRad(-8);
  cabinGroup.add(windshield);

  const sideWindowGeo = new THREE.BoxGeometry(0.06, 0.5, 1.1);
  const sideWindowMat = new THREE.MeshStandardMaterial({
    color: PALETTE.glass,
    metalness: 0.2,
    roughness: 0.1
  });
  const windowL = new THREE.Mesh(sideWindowGeo, sideWindowMat);
  windowL.position.set(-1.075, 1.05, 0.15);
  cabinGroup.add(windowL);
  const windowR = windowL.clone();
  windowR.position.x = 1.075;
  cabinGroup.add(windowR);

  // Mirrors
  const mirrorArmGeo = new THREE.BoxGeometry(0.04, 0.04, 0.35);
  const mirrorMat = new THREE.MeshStandardMaterial({ color: PALETTE.cabinDark, roughness: 0.5, metalness: 0.5 });
  const mirrorHeadGeo = new THREE.BoxGeometry(0.06, 0.26, 0.18);
  [-1, 1].forEach((side) => {
    const arm = new THREE.Mesh(mirrorArmGeo, mirrorMat);
    arm.position.set(side * 1.12, 1.35, -0.75);
    cabinGroup.add(arm);
    const head = new THREE.Mesh(mirrorHeadGeo, mirrorMat);
    head.position.set(side * 1.16, 1.35, -0.92);
    cabinGroup.add(head);
  });

  // Headlights
  const lightGeo = new THREE.BoxGeometry(0.32, 0.18, 0.06);
  const lightMat = new THREE.MeshStandardMaterial({
    color: PALETTE.light,
    emissive: PALETTE.light,
    emissiveIntensity: 1.1,
    roughness: 0.3,
    metalness: 0.1
  });
  [-1, 1].forEach((side) => {
    const headlight = new THREE.Mesh(lightGeo, lightMat);
    headlight.position.set(side * 0.78, 0.55, -1.0);
    headlight.castShadow = false;
    cabinGroup.add(headlight);
  });

  // Exhaust stack
  const exhaustGeo = new THREE.CylinderGeometry(0.07, 0.07, 1.4, 10);
  const exhaustMat = new THREE.MeshStandardMaterial({ color: PALETTE.exhaust, roughness: 0.4, metalness: 0.8 });
  const exhaust = new THREE.Mesh(exhaustGeo, exhaustMat);
  exhaust.position.set(0.98, 1.55, 0.5);
  exhaust.castShadow = true;
  cabinGroup.add(exhaust);

  // Bumper / grille
  const bumper = box(2.1, 0.22, 0.18, PALETTE.cabinDark, { metalness: 0.5, roughness: 0.5 });
  bumper.position.set(0, 0.32, -1.0);
  cabinGroup.add(bumper);

  // --- Tipper bed ------------------------------------------------------
  // Pivot sits at the rear-bottom hinge; the bed extends forward from it
  // so a positive rotation around X lifts the front edge (kiper action).
  const bedPivot = new THREE.Group();
  bedPivot.position.set(0, frameY + 0.18, 3.95);
  truck.add(bedPivot);

  const bedLength = 5.0;
  const bedWidth = 2.28;
  const bedHeight = 1.35;

  const bedFloor = box(bedWidth, 0.22, bedLength, PALETTE.bed, { metalness: 0.4, roughness: 0.7 });
  bedFloor.position.set(0, 0.11, -bedLength / 2);
  bedPivot.add(bedFloor);

  const sideWallGeo = new THREE.BoxGeometry(0.1, bedHeight, bedLength);
  const sideWallMat = new THREE.MeshStandardMaterial({ color: PALETTE.bed, metalness: 0.4, roughness: 0.65 });
  [-1, 1].forEach((side) => {
    const wall = new THREE.Mesh(sideWallGeo, sideWallMat);
    wall.position.set(side * (bedWidth / 2 - 0.05), bedHeight / 2, -bedLength / 2);
    wall.castShadow = true;
    wall.receiveShadow = true;
    bedPivot.add(wall);

    const trim = box(0.12, 0.08, bedLength, PALETTE.bedTrim, {
      roughness: 0.4,
      metalness: 0.3,
      emissive: PALETTE.bedTrim,
      emissiveIntensity: 0.12
    });
    trim.position.set(side * (bedWidth / 2 - 0.04), bedHeight - 0.04, -bedLength / 2);
    bedPivot.add(trim);
  });

  // Front headboard (against the cabin) — taller, reinforced look
  const headboard = box(bedWidth, bedHeight + 0.5, 0.12, PALETTE.bed, { metalness: 0.4, roughness: 0.65 });
  headboard.position.set(0, (bedHeight + 0.5) / 2, -bedLength + 0.06);
  bedPivot.add(headboard);

  // Rear tailgate
  const tailgate = box(bedWidth, bedHeight, 0.08, PALETTE.bed, { metalness: 0.4, roughness: 0.65 });
  tailgate.position.set(0, bedHeight / 2, -0.04);
  bedPivot.add(tailgate);

  const tailLightGeo = new THREE.BoxGeometry(0.18, 0.14, 0.05);
  const tailLightMat = new THREE.MeshStandardMaterial({
    color: PALETTE.tail,
    emissive: PALETTE.tail,
    emissiveIntensity: 0.8,
    roughness: 0.4
  });
  [-1, 1].forEach((side) => {
    const tailLight = new THREE.Mesh(tailLightGeo, tailLightMat);
    tailLight.position.set(side * (bedWidth / 2 - 0.18), bedHeight - 0.2, 0.0);
    tailLight.castShadow = false;
    bedPivot.add(tailLight);
  });

  // Hydraulic ram hint — sits between frame and headboard
  const ramGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.1, 8);
  const ramMat = new THREE.MeshStandardMaterial({ color: 0x9a9aa2, metalness: 0.8, roughness: 0.3 });
  const ram = new THREE.Mesh(ramGeo, ramMat);
  ram.position.set(0, frameY + 0.7, 2.2);
  ram.rotation.x = THREE.MathUtils.degToRad(12);
  ram.castShadow = true;
  truck.add(ram);

  // --- Wheels ------------------------------------------------------
  const wheels = [];
  const wheelRadius = 0.52;
  const wheelWidth = 0.42;
  const axleY = frameY - 0.42;
  const trackX = frameWidth / 2 + 0.08;

  const axlePositions = [
    { z: -2.95, dual: false }, // front / steer axle
    { z: 2.35, dual: true }, // rear axle 1
    { z: 3.35, dual: true } // rear axle 2
  ];

  axlePositions.forEach(({ z, dual }) => {
    [-1, 1].forEach((side) => {
      const w1 = wheel(wheelRadius, wheelWidth);
      w1.position.set(side * trackX, axleY, z);
      truck.add(w1);
      wheels.push(w1);

      if (dual) {
        const w2 = wheel(wheelRadius, wheelWidth);
        w2.position.set(side * (trackX + wheelWidth + 0.04), axleY, z);
        truck.add(w2);
        wheels.push(w2);
      }
    });
  });

  return { group: truck, bedPivot, wheels, maxTipAngle: THREE.MathUtils.degToRad(48) };
}
