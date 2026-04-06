import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/* ── fish data ── */
interface FishData {
  mesh: THREE.Object3D;
  speed: number;
  dir: number;       // 1 = left→right, -1 = right→left
  baseY: number;
  bobOffset: number;
  bobSpeed: number;
  baseScale: number;
  zone: 'surface' | 'mid' | 'deep';
  isStaring: boolean;
  dartTimer: number;
}

const isMobile = () => window.matchMedia('(hover: none)').matches;

export default function OceanScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── RENDERER ── */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile() });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── SCENE ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x001a3e, 0.05);

    /* ── CAMERA ── */
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2, 10);

    /* ── LIGHTS ── */
    const ambient = new THREE.AmbientLight(0x88ccff, 0.6);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x0044ff, 0.4, 20);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    /* ── BONE GLOW ── */
    const boneLight = new THREE.PointLight(0x003388, 0.35, 8);
    boneLight.position.set(0, -5.2, 0);
    scene.add(boneLight);

    /* ── STATE ── */
    const fishList: FishData[] = [];
    let sharkMesh: THREE.Object3D | null = null;
    let sharkDir = 1;
    const boneMeshes: THREE.Object3D[] = [];

    /* ── SCROLL STATE ── */
    let scrollProgress = 0;
    let targetCameraY = 2;
    let currentCameraY = 2;

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      // camera y: 2 (surface) → 0 (mid) → -4 (deep)
      targetCameraY = 2 - scrollProgress * 6;
      // fog density
      const fogDensity = 0.05 + scrollProgress * 0.1;
      (scene.fog as THREE.FogExp2).density = fogDensity;
    };
    window.addEventListener('scroll', onScroll);

    /* ── RESIZE ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    /* ── MOUSE ── */
    let mouseX = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── LOADER ── */
    const loader = new GLTFLoader();

    const loadModel = (url: string): Promise<THREE.Object3D | null> =>
      new Promise(resolve => {
        loader.load(
          url,
          gltf => resolve(gltf.scene),
          undefined,
          () => resolve(null),  // silent fail
        );
      });

    /* helper: clone + add to scene */
    const spawnFish = (
      template: THREE.Object3D,
      config: {
        x: number; y: number; z: number;
        scale: number; dir: number;
        speed: number; bobOffset: number; bobSpeed: number;
        zone: FishData['zone'];
      }
    ) => {
      const mesh = template.clone();
      mesh.scale.setScalar(config.scale);
      mesh.position.set(config.x, config.y, config.z);
      // face swimming direction
      if (config.dir < 0) mesh.rotation.y = Math.PI;
      scene.add(mesh);

      fishList.push({
        mesh,
        speed: config.speed,
        dir: config.dir,
        baseY: config.y,
        bobOffset: config.bobOffset,
        bobSpeed: config.bobSpeed,
        baseScale: config.scale,
        zone: config.zone,
        isStaring: false,
        dartTimer: 0,
      });
    };

    /* ── LOAD ALL MODELS ── */
    const mobile = isMobile();
    const fishCountMid = mobile ? 2 : 6;

    Promise.all([
      loadModel('/src/assets/3d/Fish.glb'),
      loadModel('/src/assets/3d/Fish 2.glb'),
      loadModel('/src/assets/3d/Shark.glb'),
      loadModel('/src/assets/3d/Fish Bone.glb'),
    ]).then(([fish1, fish2, shark, bone]) => {

      /* ── SURFACE FISH (2) ── */
      if (fish1) {
        spawnFish(fish1, { x: -15, y: 3.5, z: 0,   scale: 0.3, dir: 1,  speed: 0.02,  bobOffset: 0,    bobSpeed: 2,   zone: 'surface' });
        spawnFish(fish1, { x:  10, y: 3.2, z: -1,  scale: 0.28,dir: -1, speed: 0.018, bobOffset: 1.2,  bobSpeed: 1.8, zone: 'surface' });
      }

      /* ── MID OCEAN FISH ── */
      const midTemplates = [fish1, fish2].filter(Boolean) as THREE.Object3D[];
      if (midTemplates.length > 0) {
        const midConfigs = [
          { x: -12, y:  1.5, z:  1,  scale: 0.35, dir:  1, speed: 0.022, bobOffset: 0.5,  bobSpeed: 1.5 },
          { x:   8, y:  0.8, z: -1,  scale: 0.28, dir: -1, speed: 0.028, bobOffset: 1.0,  bobSpeed: 1.7 },
          { x: -10, y:  0.2, z:  2,  scale: 0.4,  dir:  1, speed: 0.015, bobOffset: 2.1,  bobSpeed: 1.3 },
          { x:   5, y:  1.8, z:  0,  scale: 0.32, dir: -1, speed: 0.025, bobOffset: 0.8,  bobSpeed: 2.0 },
          { x: -14, y: -0.5, z: -2,  scale: 0.38, dir:  1, speed: 0.019, bobOffset: 1.6,  bobSpeed: 1.6 },
          { x:  12, y:  0.6, z:  1,  scale: 0.3,  dir: -1, speed: 0.03,  bobOffset: 0.3,  bobSpeed: 1.9 },
        ].slice(0, fishCountMid);

        midConfigs.forEach((cfg, i) => {
          const tmpl = midTemplates[i % midTemplates.length];
          spawnFish(tmpl, { ...cfg, zone: 'mid' });
        });
      }

      /* ── DEEP FISH (2) ── */
      if (!mobile && fish2) {
        spawnFish(fish2, { x: -13, y: -3.2, z: -1, scale: 0.22, dir:  1, speed: 0.009, bobOffset: 0,   bobSpeed: 1.0, zone: 'deep' });
        spawnFish(fish2, { x:  11, y: -3.8, z:  1, scale: 0.2,  dir: -1, speed: 0.008, bobOffset: 2.0, bobSpeed: 0.9, zone: 'deep' });
        // tint deep fish blue
        fishList.slice(-2).forEach(fd => {
          fd.mesh.traverse(child => {
            if ((child as THREE.Mesh).isMesh) {
              const mat = (child as THREE.Mesh).material;
              if (mat && !Array.isArray(mat)) {
                (mat as THREE.MeshStandardMaterial).color?.multiplyScalar(0.4);
              }
            }
          });
        });
      }

      /* ── SHARK ── */
      if (!mobile && shark) {
        shark.scale.setScalar(0.8);
        shark.position.set(-18, -3.5, 0);
        scene.add(shark);
        sharkMesh = shark;
      }

      /* ── FISH BONES ── */
      if (!mobile && bone) {
        const bonePositions = [{ x: -8 }, { x: -2 }, { x: 4 }, { x: 10 }];
        bonePositions.forEach((bp, i) => {
          const b = bone.clone();
          b.scale.setScalar(0.15);
          b.position.set(bp.x, -5.3 + (i % 2) * 0.15, (i % 3) - 1);
          b.rotation.y = Math.random() * Math.PI;
          scene.add(b);
          boneMeshes.push(b);
        });
      }
    });

    /* ── IDLE STARE ── */
    let idleTimer: ReturnType<typeof setTimeout>;
    const scheduleStare = () => {
      const delay = 8000 + Math.random() * 7000;
      idleTimer = setTimeout(() => {
        const midFish = fishList.filter(f => f.zone === 'mid' && !f.isStaring);
        if (midFish.length === 0) { scheduleStare(); return; }
        const target = midFish[Math.floor(Math.random() * midFish.length)];
        target.isStaring = true;
        // face camera
        target.mesh.rotation.y = 0;
        target.mesh.scale.setScalar(target.baseScale * 1.4);
        setTimeout(() => {
          target.isStaring = false;
          target.mesh.scale.setScalar(target.baseScale);
          if (target.dir < 0) target.mesh.rotation.y = Math.PI;
          scheduleStare();
        }, 2000);
      }, delay);
    };
    scheduleStare();

    /* ── ANIMATION LOOP ── */
    let rafId: number;
    let time = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      time += 0.016;

      /* smooth camera */
      currentCameraY += (targetCameraY - currentCameraY) * 0.05;
      camera.position.y = currentCameraY;
      /* subtle camera x from mouse */
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03;

      /* fish */
      fishList.forEach(fd => {
        if (fd.isStaring) return;

        // swim
        fd.mesh.position.x += fd.speed * fd.dir;
        // bob
        fd.mesh.position.y = fd.baseY + Math.sin(time * fd.bobSpeed + fd.bobOffset) * 0.008;

        // wrap
        const limit = 17;
        if (fd.dir > 0 && fd.mesh.position.x > limit) {
          fd.mesh.position.x = -limit;
        } else if (fd.dir < 0 && fd.mesh.position.x < -limit) {
          fd.mesh.position.x = limit;
        }
      });

      /* shark */
      if (sharkMesh) {
        sharkMesh.position.x += 0.025 * sharkDir;
        sharkMesh.rotation.z = Math.sin(time) * 0.05;
        if (sharkDir > 0) sharkMesh.rotation.y = 0;
        else sharkMesh.rotation.y = Math.PI;

        if (sharkMesh.position.x > 18) {
          sharkMesh.position.x = 18;
          sharkDir = -1;
        } else if (sharkMesh.position.x < -18) {
          sharkMesh.position.x = -18;
          sharkDir = 1;
        }

        /* shark chase deep fish */
        if (!isMobile()) {
          fishList.filter(f => f.zone === 'deep').forEach(fd => {
            const dist = Math.abs(sharkMesh!.position.x - fd.mesh.position.x);
            if (dist < 3 && fd.dartTimer <= 0) {
              const origSpeed = fd.speed;
              fd.speed = origSpeed * 3;
              fd.dartTimer = 120; // frames
              setTimeout(() => { fd.speed = origSpeed; }, 2000);
            }
            if (fd.dartTimer > 0) fd.dartTimer--;
          });
        }
      }

      /* bone slow spin */
      boneMeshes.forEach(b => { b.rotation.y += 0.002; });

      renderer.render(scene, camera);
    };

    animate();

    /* ── CLEANUP ── */
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);

      scene.traverse(obj => {
        if ((obj as THREE.Mesh).isMesh) {
          (obj as THREE.Mesh).geometry?.dispose();
          const mat = (obj as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach(m => m.dispose());
          else (mat as THREE.Material)?.dispose();
        }
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
