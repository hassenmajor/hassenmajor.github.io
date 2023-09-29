// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();

// scene.add(new THREE.AxesHelper());

var camera = new THREE.PerspectiveCamera(75, 
    window.innerWidth/window.innerHeight,
    0.01,
    1000
    );
camera.position.z = 2.5;
camera.position.y = 2.5;
camera.position.x = 0;
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
//const circleTexture = textureLoader.load("/cercle_blanc.png");
const alphaMap = textureLoader.load("public/alphamap_cercle.png");

const count = 150;
const distance = 3;
const size = 0.2;
const points = new Float32Array(count*3);
const colors = new Float32Array(count*3);
for (let i = 0; i < points.length; i++) {
    points[i] = THREE.MathUtils.randFloatSpread(distance * 2);
    colors[i] = 0.2 + Math.random() * 0.6;
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
const pointsMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: size,
    // map: circleTexture,
    alphaTest: 0.5,
    alphaMap: alphaMap,
    transparent: true
});
const pointsObject = new THREE.Points(geometry, pointsMaterial);
// const cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1,1), new THREE.MeshNormalMaterial());
const group = new THREE.Group();
group.add(pointsObject);
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x757575,
    opacity: 0.2,
    transparent: 0.5,
    depthWrite: false,
});
const lineObject = new THREE.Line(geometry, lineMaterial);
group.add(lineObject);
scene.add(group);

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// document.body.appendChild(renderer.domElement);
document.getElementById("animation").appendChild(renderer.domElement);

// var controls = new OrbitControls(camera, renderer.domElement);
const clock = new THREE.Clock();

const projets = document.getElementById("projets");
projets.addEventListener("scroll", function() {
    group.rotation.x = -projets.scrollTop/projets.scrollHeight*Math.PI/2;
    // console.log(projets.style.height);
})

function tick() {
    const time = clock.getElapsedTime();
    group.rotation.y = time * 0.05;
    renderer.render(scene, camera);
    // controls.update();
    camera.lookAt(0,0,0);
    requestAnimationFrame(tick);
}

tick();

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
