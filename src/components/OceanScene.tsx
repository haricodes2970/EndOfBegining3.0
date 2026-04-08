import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import fish1Url    from '../assets/3d/Fish.glb?url';
import fish2Url    from '../assets/3d/Fish2.glb?url';
import sharkUrl    from '../assets/3d/Shark.glb?url';
import fishBoneUrl from '../assets/3d/FishBone.glb?url';

const load = (url: string): Promise<THREE.Object3D | null> =>
  new Promise(res => {
    new GLTFLoader().load(url, g => res(g.scene), undefined, () => res(null));
  });

/** Center a cloned model at its own bounding-box midpoint so
 *  mesh.position is the true visual centre of the model. */
function centerModel(obj: THREE.Object3D, scale: number): THREE.Object3D {
  obj.scale.setScalar(scale);
  const box    = new THREE.Box3().setFromObject(obj);
  const center = box.getCenter(new THREE.Vector3());
  obj.position.sub(center);          // offset mesh so its centre sits at origin
  const wrap = new THREE.Group();
  wrap.add(obj);
  return wrap;                       // position/rotate the wrapper instead
}

export default function OceanScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.matchMedia('(hover: none)').matches;

    /* ── renderer ── */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    const el = renderer.domElement;
    el.style.position      = 'fixed';
    el.style.top           = '0';
    el.style.left          = '0';
    el.style.width         = '100vw';
    el.style.height        = '100vh';
    el.style.zIndex        = '0';
    el.style.pointerEvents = 'none';
    mount.appendChild(el);

    /* ── scene ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x001a3e, 0.012);

    /* ── camera ── */
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.set(0, 1, 12);

    /* ── lights ── */
    const ambient    = new THREE.AmbientLight(0x88ccff, 0.6);
    scene.add(ambient);
    const dirLight   = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);
    const causticLight = new THREE.PointLight(0x88ddff, 0.5, 10);
    causticLight.position.set(0, 1, 3);
    scene.add(causticLight);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    /* ── fish state ── */
    interface FishState {
      mesh: THREE.Object3D;
      speed: number;
      dir: number;
      limit: number;
      offset: number;
      isDarting: boolean;
      dartFrames: number;
    }
    const fishList: FishState[]        = [];
    let   sharkMesh: THREE.Object3D | null = null;
    let   sharkDir  = 1;
    const boneMeshes: THREE.Object3D[] = [];
    const clock = new THREE.Clock();

    Promise.all([load(fish1Url), load(fish2Url), load(sharkUrl), load(fishBoneUrl)])
      .then(([f1, f2, shark, bone]) => {

        const addFish = (
          tmpl: THREE.Object3D | null,
          sx: number, sy: number, sz: number,
          scale: number, dir: number,
          speed: number, limit: number, offset: number,
        ) => {
          if (!tmpl) return;
          const wrap = centerModel(tmpl.clone(), scale);
          wrap.position.set(sx, sy, sz);
          /* rotation.x = PI/2 lays the fish horizontal.
             rotation.z controls which way it faces left/right. */
          wrap.rotation.x = Math.PI / 2;
          wrap.rotation.z = dir > 0 ? 0 : Math.PI;
          scene.add(wrap);
          fishList.push({ mesh: wrap, speed, dir, limit, offset, isDarting: false, dartFrames: 0 });
        };

        /* ── mid-water fish  (y = −8)
           Camera at y=1 sees down to y ≈ −6, so these start off-screen.
           They enter view naturally as the camera descends with scroll. ── */
        addFish(f1, -14, -8.0,  1, 0.13,  1, 0.030, 18, 0.0);
        addFish(f1,  14, -8.5, -1, 0.13, -1, 0.025, 18, 1.5);
        addFish(f2,  -9, -9.0,  0, 0.11,  1, 0.022, 16, 0.8);

        /* ── deep fish — chased by shark (y = −11) ── */
        if (!isMobile) {
          addFish(f2, -12, -11.0,  1, 0.10,  1, 0.018, 15, 1.2);
          addFish(f2,  10, -11.5, -1, 0.10, -1, 0.016, 15, 0.4);
        }

        /* ── shark (y = −11) ── */
        if (!isMobile && shark) {
          const sw = centerModel(shark.clone(), 0.28);
          sw.position.set(-22, -11.0, 0);
          sw.rotation.x = Math.PI / 2;
          sw.rotation.z = 0;
          scene.add(sw);
          sharkMesh = sw;
        }

        /* ── seabed bones (y = −14) ── */
        if (!isMobile && bone) {
          [{ x: -10, ry: 0.3 }, { x: -4, ry: -0.5 }, { x: 2, ry: 1.2 },
           { x: 8, ry: -0.8 }, { x: 14, ry: 0.6 }].forEach(b => {
            const bw = centerModel(bone.clone(), 0.07);
            bw.position.set(b.x, -14.0, 0);
            bw.rotation.y = b.ry;
            scene.add(bw);
            boneMeshes.push(bw);
          });
        }
      });

    /* ── animation loop ── */
    let rafId: number;
    let targetCamY = 1;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      /* ── scroll: read directly from ScrollSmoother every frame.
           This works even though ScrollSmoother is created AFTER this
           effect, because get() is called lazily each frame. ── */
      const smoother  = ScrollSmoother.get();
      let   scrollAmt = 0;
      let   maxScroll = 1;
      if (smoother) {
        scrollAmt = smoother.scrollTop();
        const contentEl = smoother.content() as HTMLElement;
        maxScroll = Math.max(contentEl.scrollHeight - window.innerHeight, 1);
      } else {
        scrollAmt = window.scrollY;
        maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      }
      const p = Math.min(scrollAmt / maxScroll, 1);
      targetCamY = 1 - p * 16;              // y: 1 → −15

      (scene.fog as THREE.FogExp2).density = 0.010 + p * 0.055;
      ambient.intensity = 0.6 - p * 0.35;

      /* camera lerp */
      camera.position.y += (targetCamY - camera.position.y) * 0.05;

      /* caustic shimmer */
      causticLight.position.x = Math.sin(time * 0.7) * 5;
      causticLight.intensity   = 0.3 + Math.sin(time * 2) * 0.2;

      /* fish swim */
      fishList.forEach((f, i) => {
        const spd = f.isDarting ? f.speed * 3.5 : f.speed;
        f.mesh.position.x += spd * f.dir;
        f.mesh.position.y += Math.sin(time * 1.2 + f.offset) * 0.002;

        const baseZ = f.dir > 0 ? 0 : Math.PI;
        f.mesh.rotation.z = baseZ + Math.sin(time * 3 + f.offset) * 0.08;

        if (f.dir > 0 && f.mesh.position.x >  f.limit) { f.mesh.position.x = -f.limit; f.dir = -1; }
        if (f.dir < 0 && f.mesh.position.x < -f.limit) { f.mesh.position.x =  f.limit; f.dir =  1; }
        if (f.isDarting) { f.dartFrames--; if (f.dartFrames <= 0) f.isDarting = false; }

        if (sharkMesh && i >= 3) {
          const dist = Math.abs(sharkMesh.position.x - f.mesh.position.x);
          if (dist < 4 && !f.isDarting) {
            f.isDarting  = true;
            f.dartFrames = 140;
            f.dir = f.mesh.position.x > sharkMesh.position.x ? 1 : -1;
          }
        }
      });

      /* shark patrol */
      if (sharkMesh) {
        sharkMesh.position.x += 0.018 * sharkDir;
        sharkMesh.rotation.z = (sharkDir > 0 ? 0 : Math.PI) + Math.sin(time * 1.5) * 0.04;
        if (sharkMesh.position.x >  24) { sharkMesh.position.x = -24; sharkDir =  1; sharkMesh.rotation.z = 0; }
        if (sharkMesh.position.x < -24) { sharkMesh.position.x =  24; sharkDir = -1; sharkMesh.rotation.z = Math.PI; }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
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
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
