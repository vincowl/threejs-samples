var scene, camera, renderer;
var geometry, material, cube;
var sphere;

//init();
//animate();

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 1000;


	var cubesize = 200;
	geometry = new THREE.BoxGeometry(cubesize, cubesize, cubesize);
	cubematerial = new THREE.MeshBasicMaterial({
		color: 0xCCAA00,
		wireframe: true
	});

	cube = new THREE.Mesh(geometry, cubematerial);
	scene.add(cube);

	// create the sphere's material
	var sphereMaterial =
		new THREE.MeshLambertMaterial({
			color: 0xCC0000
		});

	// set up the sphere vars
	var radius = 90,
		segments = 60,
		rings = 60;

	// create a new mesh with
	// sphere geometry - we will cover
	// the sphereMaterial next!
	sphere = new THREE.Mesh(

		new THREE.SphereGeometry(
			radius,
			segments,
			rings),

		sphereMaterial);

	// add the sphere to the scene
	scene.add(sphere);

	// create a point light
	var pointLight =
		new THREE.PointLight(0xFFFFFF);

	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	// on ajoute une lumière blanche
	var lumiere = new THREE.DirectionalLight(0xffffff, 1.0);
	lumiere.position.set(0, 0, 600);
	scene.add(lumiere);

	var ambient = new THREE.AmbientLight( 0x555555 );
	scene.add( ambient );


	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	var container = document.getElementById('container');
	container.appendChild(renderer.domElement);

}

function animate() {

	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.02;

	sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.02;

	renderer.render(scene, camera);

}
