var scene, camera, renderer;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;
var PI = 3.14159;

var seaMaterial;
var mesh = null;
var sea = null;
var ObjectGroup = null;
var chrono;

function init() {
	scene = new THREE.Scene();
	
	//var axisHelper = new THREE.AxisHelper( 2 );
	//scene.add( axisHelper );
	
	initMaterials();
	initObjects();
	initCamera();
	initLights();
	initRenderer();

	document.body.appendChild(renderer.domElement);
	chrono=new THREE.Clock();
	chrono.start();
}

function initCamera() {
	camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 150);
	camera.position.set(1, 1, 7);
	//camera.position.set(1, 0.1, 1);
	camera.lookAt(scene.position);
}

function initObjects() {
	//ObjectGroup = new THREE.Group();
	//scene.add(ObjectGroup);
	initMesh();
	initSea();
}


function initRenderer() {
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.cullFace = THREE.CullFaceBack;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize(WIDTH, HEIGHT);
}

function initLights() {
	// create a point light
	var pointLight =
		new THREE.PointLight(0xFFFFFF);

	// set its position
	pointLight.position.x = 400;
	pointLight.position.y = 550;
	pointLight.position.z = 530;
	pointLight.castShadow = true;
	// add to the scene
	scene.add(pointLight);

	// on ajoute une lumière blanche
	var lumiere = new THREE.DirectionalLight(0xffffff, 1.0);
	lumiere.position.set(0, 0, 600);
	lumiere.castShadow = true;
	scene.add(lumiere);

	var ambient = new THREE.AmbientLight(0xffffff);
	scene.add(ambient);

}

function initMesh() {
	var loader = new THREE.JSONLoader();
	loader.load('../images/cad/namani/namani.json', function(geometry, materials) {
		mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
		mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.45;
		mesh.translation = geometry.center();
		scene.add(mesh);
		//ObjectGroup.add(mesh);
	});
	
}

function deg2rad(deg) {
	return deg*PI/180;
}

function initMaterials() {
	// load a texture, set wrap mode to repeat
	var texture_eau = new THREE.TextureLoader().load("../images/textures/Eau/Eau004.jpg");
	texture_eau.name = "eau";
	texture_eau.mapping = THREE.CubeReflectionMapping;
	texture_eau.wrapS = THREE.RepeatWrapping;
	texture_eau.wrapT = THREE.RepeatWrapping;
	texture_eau.repeat.set( 20, 20 );
	texture_eau.needsUpdate = true;

	//texture_eau.repeat.set( 4, 4 ); 

	seaMaterial = new THREE.MeshPhongMaterial({
		map: texture_eau
	});
	seaMaterial.overdraw = true;
}


function initSea() {
	var geometry = new THREE.PlaneGeometry( 120, 120, 5,5 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	//seaMaterial.side = THREE.DoubleSide;
	sea = new THREE.Mesh( geometry, seaMaterial );
	sea.dynamic = true;
	sea.rotation.x = deg2rad(90);
	sea.translateZ(2.2);
	sea.material.side = THREE.DoubleSide;
	scene.add( sea );
	//ObjectGroup.add(sea);
}

function rotateMesh() {
	if (!mesh) {
		return;
	}
	temps=chrono.getElapsedTime()
	mesh.rotation.x = .06*Math.cos(temps);//SPEED * 2;
	mesh.rotation.y -= SPEED/4;
	//mesh.rotation.z -= SPEED * 3;
}

function render() {
	requestAnimationFrame(render);temps=chrono.getElapsedTime()
	rotateMesh();
	renderer.render(scene, camera);
}
