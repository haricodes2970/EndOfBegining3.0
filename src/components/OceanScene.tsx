import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import fish1Url    from '../assets/3d/Fish.glb?url';
import fish2Url    from '../assets/3d/Fish2.glb?url';
import sharkUrl    from '../assets/3d/Shark.glb?url';
import fishBoneUrl from '../assets/3d/FishBone.glb?url';

const load = (url: string): Promise<THREE.Object3D | null> =>
  new Promise(res => {
    new GLTFLoader().load(url, g => res(g.scene), undefined, () => res(null));
  });

export default function OceanScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const mobile = window.matchMedia('(hover: none)').matches;

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* scene */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x001a3e, 0.02);

    /* camera */
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 3, 12);

    /* lights */
    const ambient = new THREE.AmbientLight(0x88ccff, 0.6);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);
    const boneFill = new THREE.PointLight(0x0033aa, 0.8, 10);
    boneFill.position.set(0, -5, 2);
    scene.add(boneFill);
    const causticLight = new THREE.PointLight(0x88ddff, 0.5, 8);
    causticLight.position.set(0, 1, 3);
    scene.add(causticLight);

    /* scroll */
    let scrollProgress = 0;
    let targetCamY = 3;
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollProgress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      targetCamY = 3 - scrollProgress * 8;
      (scene.fog as THREE.FogExp2).density = 0.02 + scrollProgress * 0.08;
      ambient.intensity = 0.6 - scrollProgress * 0.3;
    };
    window.addEventListener('scroll', onScroll);

    /* resize */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    /* fish state */
    interface FishState {
      mesh: THREE.Object3D;
      speed: number;
      dir: number;       // +1 or -1
      limit: number;
      offset: number;
      isDarting: boolean;
      dartFrames: number;
    }
    const fishList: FishState[] = [];
    let sharkMesh: THREE.Object3D | null = null;
    let sharkDir = 1;

    /* clock */
    const clock = new THREE.Clock();

    Promise.all([
      load(fish1Url),
      load(fish2Url),
      load(sharkUrl),
      load(fishBoneUrl),
    ]).then(([f1, f2, shark, bone]) => {

      const addFish = (
        tmpl: THREE.Object3D | null,
        sx: number, sy: number, sz: number,
        scale: number, rotY: number,
        speed: number, dir: number, limit: number, offset: number
      ) => {
        if (!tmpl) return;
        const m = tmpl.clone();
        m.scale.setScalar(scale);
        m.position.set(sx, sy, sz);
        m.rotation.y = rotY;
        scene.add(m);
        fishList.push({ mesh: m, speed, dir, limit, offset, isDarting: false, dartFrames: 0 });
      };

      // surface fish
      addFish(f1,  -12, 2.5,  0,  0.12,  Math.PI / 2,  0.03,  1, 16, 0);
      addFish(f1,   12, 2.8, -1,  0.12, -Math.PI / 2,  0.025,-1, 16, 1.5);

      // mid fish
      addFish(f1, -15,  0.5,  1,  0.10,  Math.PI / 2,  0.022, 1, 18, 0.7);
      addFish(f2,  15,  0.0, -1,  0.10, -Math.PI / 2,  0.018,-1, 18, 1.2);
      addFish(f1, -10,  1.2,  2,  0.09,  Math.PI / 2,  0.020, 1, 16, 2.0);
      addFish(f2,  10, -0.5, -2,  0.09, -Math.PI / 2,  0.016,-1, 16, 0.3);

      // deep fish
      if (!mobile) {
        addFish(f2, -12, -3.5,  0, 0.08,  Math.PI / 2,  0.01,  1, 14, 0.5);
        addFish(f2,   8, -3.2,  1, 0.08, -Math.PI / 2,  0.01, -1, 14, 1.8);
      }

      // shark
      if (!mobile && shark) {
        shark.scale.setScalar(0.25);
        shark.rotation.y = Math.PI / 2;
        shark.position.set(-18, -3.8, 0);
        scene.add(shark);
        sharkMesh = shark;
      }

      // bones
      if (!mobile && bone) {
        const boneData = [
          { x: -8,  ry:  0.3 },
          { x: -2,  ry: -0.5 },
          { x:  4,  ry:  1.2 },
          { x: 10,  ry: -0.8 },
        ];
        boneData.forEach(b => {
          const m = bone.clone();
          m.scale.setScalar(0.06);
          m.position.set(b.x, -5.8, 0);
          m.rotation.y = b.ry;
          scene.add(m);
        });
      }
    });

    /* animation loop */
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // camera
      camera.position.y += (targetCamY - camera.position.y) * 0.05;

      // caustic shimmer
      causticLight.position.x = Math.sin(time * 0.7) * 5;
      causticLight.intensity = 0.3 + Math.sin(time * 2) * 0.2;

      // swim fish
      fishList.forEach((f, i) => {
        const spd = f.isDarting ? f.speed * 3 : f.speed;
        f.mesh.position.x += spd * f.dir;
        f.mesh.rotation.z = Math.sin(time * 3 + f.offset) * 0.08;

        if (f.dir > 0 && f.mesh.position.x > f.limit) {
          f.mesh.position.x = -f.limit;
          f.dir = -1;
          f.mesh.rotation.y = -Math.PI / 2;
        } else if (f.dir < 0 && f.mesh.position.x < -f.limit) {
          f.mesh.position.x = f.limit;
          f.dir = 1;
          f.mesh.rotation.y = Math.PI / 2;
        }

        if (f.isDarting) {
          f.dartFrames--;
          if (f.dartFrames <= 0) f.isDarting = false;
        }

        // shark chase deep fish (index 6,7)
        if (sharkMesh && i >= 6) {
          const dist = Math.abs(sharkMesh.position.x - f.mesh.position.x);
          if (dist < 3 && !f.isDarting) {
            f.isDarting = true;
            f.dartFrames = 120;
            // flip away from shark
            f.dir = f.mesh.position.x > sharkMesh.position.x ? 1 : -1;
            f.mesh.rotation.y = f.dir > 0 ? Math.PI / 2 : -Math.PI / 2;
          }
        }
      });

      // shark
      if (sharkMesh) {
        sharkMesh.position.x += 0.02 * sharkDir;
        sharkMesh.rotation.z = Math.sin(time * 1.5) * 0.05;
        if (sharkMesh.position.x > 20) {
          sharkMesh.position.x = -20;
          sharkDir = 1;
          sharkMesh.rotation.y = Math.PI / 2;
        } else if (sharkMesh.position.x < -20) {
          sharkMesh.position.x = 20;
          sharkDir = -1;
          sharkMesh.rotation.y = -Math.PI / 2;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      scene.traverse(obj => {
        const m = obj as THREE.Mesh;
        if (m.isMesh) {
          m.geometry?.dispose();
          if (Array.isArray(m.material)) m.material.forEach(x => x.dispose());
          else (m.material as THREE.Material)?.dispose();
        }
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }} />
  );
}
