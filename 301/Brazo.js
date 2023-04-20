var lado=1;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;


var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();


var camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT);
camera.position.z = 4.5;
camera.position.x = -1.2;
camera.position.y = 2;

camera.rotation.set(0, -0.5, 0);
scene.add(camera);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

//paralelepípedo
var geometry = new THREE.BoxGeometry( lado , lado*4 , lado );
var material = new THREE.MeshBasicMaterial( {color: 0xFFFF00} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );





const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 0);
scene.add(light);

const size = 150;
const divisions = 160;
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

scene.add(cube)



function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
