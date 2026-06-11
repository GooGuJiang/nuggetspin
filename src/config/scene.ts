export const CAMERA_INITIAL_POSITION = { x: 0, y: 2, z: 100 };
export const CAMERA_ACTIVE_POSITION = { x: 0, y: 3, z: 10 };
export const CAMERA_TARGET = { x: 0, y: 0, z: 0 };

export const CAMERA_INTRO_ANIMATION = {
  duration: 2,
  ease: 'power3.inOut',
};

export const CAMERA_ORBIT_LIMITS = {
  minPolarAngle: 0,
  maxPolarAngle: Math.PI / 2,
  minAzimuthAngle: -Math.PI / 8,
  maxAzimuthAngle: Math.PI / 8,
  minDistance: 8,
  maxDistance: 100,
};

export const STAGE_ENVIRONMENT = {
  path: '/assets/hdri/',
  files: ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
};

export const STAGE_SHADOWS = {
  type: 'accumulative' as const,
  scale: 12,
  opacity: 0.45,
  alphaTest: 0.85,
  resolution: 512,
  frames: 80,
  color: '#000000',
  colorBlend: 2,
};

export const NUGGET_MODEL_PATH = '/assets/model-transformed.glb';

export const NUGGET_MODEL_TRANSFORM = {
  scale: 0.09,
  rotation: [0, -0.7, 0] as [number, number, number],
};

export const NUGGET_MESH_TRANSFORM = {
  position: [0.953, 50.977, -5.217] as [number, number, number],
  rotation: [3.21, 0, 0.9] as [number, number, number],
};

export const NUGGET_MOTION = {
  floatBaseY: 62.5,
  floatAmplitude: 7.5,
  floatCycleSeconds: 1.35,
  rotationSpeed: Math.PI * 1.25,
  positionDamping: 5,
};
