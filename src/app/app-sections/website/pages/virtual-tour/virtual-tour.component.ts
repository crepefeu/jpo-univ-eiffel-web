import { Component, HostListener, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Octree } from 'three/examples/jsm/math/Octree.js';
import { Capsule } from 'three/examples/jsm/math/Capsule';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

@Component({
  selector: 'app-virtual-tour',
  templateUrl: './virtual-tour.component.html',
  styleUrls: ['./virtual-tour.component.scss']
})


export class VirtualTourComponent implements OnInit {

  private clock = new THREE.Clock();
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  private gltfLoader: GLTFLoader | undefined;
  private dracoLoader: DRACOLoader | undefined;
  private renderer = new THREE.WebGLRenderer({ antialias: true });
  private worldOctree = new Octree();
  private playerCollider = new Capsule(new THREE.Vector3(2.95, 0.35, 3.7), new THREE.Vector3(2.95, 1.35, 3.7), 0.35);
  private playerVelocity = new THREE.Vector3();
  private playerDirection = new THREE.Vector3();
  private playerOnFloor = false;
  private mouseTime = 0;
  private keyStates: { [key: string]: boolean } = {};
  private container!: HTMLElement;

  // raycaster
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  // menu
  public isMenuvisible: boolean = true;
  private isPointerLocked: boolean = false;

  // dialogBox
  public isDialogVisible: boolean = false;

  // modal
  public isModalVisible: boolean = false;




  ngOnInit() {
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = Math.PI / 3.5;
    this.initLights();
    this.initRenderer();
    this.loadModel();
  }



  private initLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);
  }

  private initRenderer() {
    this.container = document.getElementById('container')!;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);
  }


  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    this.keyStates[event.code] = true;
  }

  @HostListener('document:keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent) {
    this.keyStates[event.code] = false;
  }

  @HostListener('document:keypress', ['$event'])
  public onKeyPress(event: KeyboardEvent) {
    if (event.code === 'Space') {
      if (this.isPointerLocked) {
        document.exitPointerLock();
        this.isModalVisible = false;
        this.isDialogVisible = false;
      } else {
        document.body.requestPointerLock();
        document.body.requestFullscreen();
        this.mouseTime = performance.now();
      }
    }
  }


  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:pointerlockchange', ['$event'])
  public onPointerLockChange() {
    this.isPointerLocked = document.pointerLockElement === document.body;
    this.isMenuvisible = !this.isPointerLocked;
  }



  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {

    if (document.pointerLockElement === document.body) {
      this.camera.rotation.y -= event.movementX / 1200;
      this.camera.rotation.x -= event.movementY / 1200;

      this.camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.camera.rotation.x));

      this.mouse.x = 0;
      this.mouse.y = 0;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      const objectsToIntersect: THREE.Mesh[] = [];
      this.scene.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          objectsToIntersect.push(child);

        }
      });

      const intersects = this.raycaster.intersectObjects(objectsToIntersect, true);

      if (intersects.length > 0 && intersects[0].distance < 1.5) {
        if (intersects[0].object.parent?.name === 'PC') {
          this.scene.traverse((child : any) => {
            if (child instanceof THREE.Mesh) {
              if (child.name === 'Plane012_3') {
                this.isDialogVisible = true;
              }
            }
          });
        }
        else {
          this.isDialogVisible = false;
        }
      }
      else {
        this.isDialogVisible = false;
      }

    }
    this.dialogBox()
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }


  private dialogBox() {
    const dialogBoxdiv = document.getElementById('dialogBox');
    if (dialogBoxdiv) {
      dialogBoxdiv.style.display = this.isDialogVisible ? 'block' : 'none';
    }
  }


  private playerCollisions() {
    const result = this.worldOctree.capsuleIntersect(this.playerCollider);
    this.playerOnFloor = false;

    if (result) {
      this.playerOnFloor = result.normal.y > 0;
      if (!this.playerOnFloor) {
        this.playerVelocity.addScaledVector(result.normal, -result.normal.dot(this.playerVelocity));
      }
      this.playerCollider.translate(result.normal.multiplyScalar(result.depth));
    }
  }



  private updatePlayer(deltaTime: number) {
    let damping = Math.exp(-5 * deltaTime) - 1;

    if (!this.playerOnFloor) {
      this.playerVelocity.y -= 30 * deltaTime;
      damping *= 0.1;
    }

    this.playerVelocity.addScaledVector(this.playerVelocity, damping);
    const deltaPosition = this.playerVelocity.clone().multiplyScalar(deltaTime);
    this.playerCollider.translate(deltaPosition);
    this.playerCollisions();
    this.camera.position.copy(this.playerCollider.end);
  }

  private getForwardVector() {
    this.camera.getWorldDirection(this.playerDirection);
    this.playerDirection.y = 0;
    this.playerDirection.normalize();
    return this.playerDirection;
  }

  private getSideVector() {
    this.camera.getWorldDirection(this.playerDirection);
    this.playerDirection.y = 0;
    this.playerDirection.normalize();
    this.playerDirection.cross(this.camera.up);
    return this.playerDirection;
  }

  private controls(deltaTime: number) {
    const speedDelta = deltaTime * (this.playerOnFloor ? 12 : 8);

    if (document.pointerLockElement === document.body) {

      if (this.keyStates['KeyW']) {
        this.playerVelocity.add(this.getForwardVector().multiplyScalar(speedDelta));
      }

      if (this.keyStates['KeyS']) {
        this.playerVelocity.add(this.getForwardVector().multiplyScalar(-speedDelta));
      }

      if (this.keyStates['KeyA']) {
        this.playerVelocity.add(this.getSideVector().multiplyScalar(-speedDelta));
      }

      if (this.keyStates['KeyD']) {
        this.playerVelocity.add(this.getSideVector().multiplyScalar(speedDelta));
      }
    }

    if (this.keyStates['KeyE']) {
      const dialogBox = document.getElementById('dialogBox');
      if (dialogBox && this.isDialogVisible) {
        dialogBox.style.display = 'none';
        this.isModalVisible = true;
      } else if (!this.isDialogVisible) {
        this.isModalVisible = false;
      }
    }

  }

  private loadModel() {

    this.scene.background = new THREE.Color(0x000000);

    this.gltfLoader = new GLTFLoader().setPath('./assets/gltf/');
    this.dracoLoader = new DRACOLoader().setDecoderPath('./assets/draco/');
    this.dracoLoader.preload();
    this.gltfLoader.setDRACOLoader(this.dracoLoader);

    this.gltfLoader.load('318_final.gltf', (gltf: any) => {

      const piece = gltf.scene.children.find((child: any) => child.name === 'Pièce') as THREE.Mesh;
      const table_l = gltf.scene.children.find((child: any) => child.name === 'Table_L') as THREE.Object3D;
      const table_r = gltf.scene.children.find((child: any) => child.name === 'Table_R') as THREE.Object3D;
      const fenetre = gltf.scene.children.find((child: any) => child.name === 'Fenêtre') as THREE.Object3D;
      const table_pc = gltf.scene.children.find((child: any) => child.name === 'Table_PC') as THREE.Object3D;

      this.worldOctree.fromGraphNode(piece);
      // this.worldOctree.fromGraphNode(table_r);
      // this.worldOctree.fromGraphNode(table_l);
      // this.worldOctree.fromGraphNode(fenetre);
      // this.worldOctree.fromGraphNode(table_pc);

      gltf.scene.traverse((child :any) => {

        if (child instanceof THREE.Object3D && child.name === 'Light_R') {
          const dl_l = new THREE.PointLight(0xffffff, 0.5);

          dl_l.position.set(2.1, 2.7, 0);
          dl_l.decay = 0.1;
          dl_l.power = 15;
          dl_l.distance = 10;
          this.scene.add(dl_l);
        }
        if (child instanceof THREE.Object3D && child.name === 'Light_C') {
          const dl_c = new THREE.PointLight(0xffffff, 1, 0.5);
          dl_c.position.set(0, 2.7, 0);
          dl_c.decay = 0.1;
          dl_c.power = 15;
          dl_c.distance = 10;
          this.scene.add(dl_c);
        }
        if (child instanceof THREE.Object3D && child.name === 'Light_L') {
          const dl_r = new THREE.PointLight(0xffffff, 0.5);
          dl_r.position.set(-2.1, 2.7, 0);
          dl_r.decay = 0.1;
          dl_r.power = 15;
          dl_r.distance = 10;
          dl_r.castShadow = true;
          dl_r.shadow.mapSize.width = 1024 * 2;
          dl_r.shadow.mapSize.height = 1024 * 2;
          dl_r.shadow.camera.near = 0.1;
          dl_r.shadow.camera.far = 80;
          dl_r.shadow.bias = -0.005;
          this.scene.add(dl_r);
        }

        if (child) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
        if (child instanceof THREE.Mesh) {
          if (child.name === 'Dehors') {

            const textureDehors = new THREE.TextureLoader().load('./assets/dehors.jpg');
            child.material = new THREE.MeshStandardMaterial({ map: textureDehors });
            child.material.side = THREE.DoubleSide;
            child.receiveShadow = false;
          }

          if (child.name === 'Plane007_1'){
            const  textureplafond = new THREE.TextureLoader().load('./assets/trou_plafond.jpg');
            child.material = new THREE.MeshStandardMaterial({ map: textureplafond });
            child.receiveShadow = false;
          }

          if (child.name === 'Plane008_1'){
            const  texturemur = new THREE.TextureLoader().load('./assets/trou_mur.jpg');
            child.material = new THREE.MeshStandardMaterial({ map: texturemur });
            child.receiveShadow = false;
          }
        }


      });

      this.scene.add(gltf.scene);
      this.animate();
    });
  }


  private teleportPlayerIfOob() {
    if (this.camera.position.y <= -15) {
      this.playerCollider.start.set(2.95, 0.35, 3.7);
      this.playerCollider.end.set(2.95, 1.35, 3.7);
      this.playerCollider.radius = 0.35;
      this.camera.position.copy(this.playerCollider.end);
      this.camera.rotation.set(0, Math.PI / 2, 0);
    }
  }



  private animate() {

    const deltaTime = Math.min(0.05, this.clock.getDelta()) / 5;

    for (let i = 0; i < 5; i++) {
      this.controls(deltaTime);
      this.updatePlayer(deltaTime);
      this.teleportPlayerIfOob();
    }


    if (this.scene) {

      const objectsToIntersect: THREE.Mesh[] = [];

      const time = new Date();
      const hours = time.getHours() % 12;
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();
      const rotationHours = (hours + minutes / 60) * (Math.PI / 6);
      const rotationMinutes = minutes * (Math.PI / 30);
      const rotationSeconds = seconds * (Math.PI / 30);

      this.scene.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          objectsToIntersect.push(child);

          if (child.name === "minutes") {
            child.rotation.y = - rotationMinutes;
          }
          if (child.name === "heure") {
            child.rotation.y = - rotationHours;
          }
          if (child.name === "seconde") {
            child.rotation.y = - rotationSeconds;
          }
        }
      });
    }

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));

  }

  exitPointLockOnReturn() {
    // force exit full screen
      document.exitFullscreen();
  }
}

const container = document.getElementById('container');
if (container) {
  new VirtualTourComponent();
}

