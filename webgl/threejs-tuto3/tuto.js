var scene, camera, renderer;
var geometry, material, cube;
var sphere;
var spherematerial, cubematerial;

//init();
//animate();

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 800;


	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	var container = document.getElementById('container');
	container.appendChild(renderer.domElement);
	defineMaterials();
	defineMeshes();
	addLight();
}

function defineMaterials() {
	// load a texture, set wrap mode to repeat
	var texture_eau = new THREE.TextureLoader().load("../images/textures/Eau/Eau015.jpg");
	texture_eau.name = "eau";
	texture_eau.mapping = THREE.SphericalReflectionMapping;
	texture_eau.wrapS = THREE.RepeatWrapping;
	texture_eau.wrapT = THREE.RepeatWrapping;
	//texture.repeat.set( 4, 4 );
	texture_eau.needsUpdate = true

	spherematerial = new THREE.MeshPhongMaterial({
		map: texture_eau
	});
	spherematerial.overdraw = true;


	var texture_pierre = new THREE.TextureLoader().load("../images/textures/Bois/Bois006.jpg");
	texture_pierre.name = "pierre";
	texture_pierre.mapping = THREE.SphericalReflectionMapping;
	texture_pierre.wrapS = THREE.RepeatWrapping;
	texture_pierre.wrapT = THREE.RepeatWrapping;
	//texture_pierre.repeat.set( 4, 4 );
	texture_pierre.needsUpdate = true;
	
	cubematerial = new THREE.MeshPhongMaterial({
		map: texture_pierre
	});
	cubematerial.overdraw = true;
}

function defineMeshes() {
	var cubesize = 300;
	geometry = new THREE.BoxGeometry(cubesize, cubesize, cubesize);


	cube = new THREE.Mesh(geometry, cubematerial);
	cube.dynamic = true;
	scene.add(cube);



	// set up the sphere vars
	var radius = 200,
		segments = 32,
		rings = 32;

	// create a new mesh with
	// sphere geometry - we will cover
	// the sphereMaterial next!
	sphere = new THREE.Mesh(

		new THREE.SphereGeometry(
			radius,
			segments,
			rings),

		spherematerial);

	sphere.dynamic = true;
	// add the sphere to the scene
	scene.add(sphere);

}

function addLight() {
	// create a point light
	var pointLight =
		new THREE.PointLight(0xFFFFFF);

	// set its position
	pointLight.position.x = 400;
	pointLight.position.y = 550;
	pointLight.position.z = 530;

	// add to the scene
	scene.add(pointLight);

	// on ajoute une lumière blanche
	var lumiere = new THREE.DirectionalLight(0xffffff, 1.0);
	lumiere.position.set(0, 0, 600);
	scene.add(lumiere);

	var ambient = new THREE.AmbientLight(0x555555);
	scene.add(ambient);
}

function animate() {

	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.02;

	sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.02;

	renderer.render(scene, camera);

}
