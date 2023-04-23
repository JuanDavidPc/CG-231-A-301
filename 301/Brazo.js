
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//funcion traslacion 
function translateObject(group, pos){
    group.position.set(pos[0], pos[1], pos[2]);
    return group;
}

//funcion de rotar
function rotateObject(group, degrees, posini){
    var radians = degrees.map(function(deg) {
        return deg * Math.PI / 180;
    });
    var pos = [-posini[0], -posini[1], -posini[2]];
    group = translateObject(group, pos);
    group.rotation.set(radians[0], radians[1], radians[2]);
    group = translateObject(group, posini);
    return group;
}

var l = [.2, 1, .2];
var alfa = [0, 0, -30];
var beta = [0, 0, -30];
var gamma = [0, 0, 0];

// Arreglo que contiene los colores
var colors = [0x0000ff, 0xf00f0f];

// Arreglo que contiene la geometría de objetos
var geometry = [
    new THREE.BoxGeometry(l[0], l[1], l[2]),
    new THREE.BoxGeometry(l[0], l[1], l[2])
];

// Arreglo que contiene los materiales de los objetos
var materials = [
    new THREE.MeshPhongMaterial({color: colors[0]}),
    new THREE.MeshPhongMaterial({color: colors[1]})
];

// Arreglo que crea los objetos con la geometría y materiales establecidos anteriormente
var objects = [
    new THREE.Mesh(geometry[0], materials[0]),
    new THREE.Mesh(geometry[1], materials[1])
];

for(var i = 0; i < objects.length; i++){
    scene.add(objects[i]);
}

// Creación del grupo que contiene los objetos
var arm = new THREE.Group();
arm.add(objects[0]);
arm.add(objects[1]);

// Aplicación de transformaciones al grupo y objetos individuales
arm = translateObject(arm, [-.1, .5, .1]);
arm = rotateObject(arm, beta, [-.1, .5, .1]);
objects[1] = translateObject(objects[1], [0, 1, 0]);
objects[1] = rotateObject(objects[1], alfa, [-.1, .5, .1]);

scene.add(arm);

var spotLight = new THREE.SpotLight(0xFFFFFF, 1);   
spotLight.position.set(2, 7, 7);  
spotLight.target = objects[1]; 
scene.add(spotLight);

// Creación de la malla
var size = 100;
var divisions = 100;
var gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

camera.position.set(2, 2, 2);  //Ajuste de la posición de la cámara

var controls = new THREE.OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

animate();
