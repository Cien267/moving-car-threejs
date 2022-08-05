//Variables for setup

let container;
let container2;
let camera;
let camera2;
let renderer;
let renderer2;
let scene;
let scene2;
let house;
let car;

function init() {
  container = document.querySelector(".scene");
  container2 = document.querySelector(".scene2");

  //Create scene
  scene = new THREE.Scene();
  scene2 = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, 30);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);
  scene2.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./house/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    animate();
  });
  loader.load("./car/scene.gltf", function(gltf) {
    scene2.add(gltf.scene);
    car = gltf.scene.children[0];
    animate();
  });
}


function animate() {
  requestAnimationFrame(animate);
  house.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
