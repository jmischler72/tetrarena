<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import texture1 from '$lib/three/textures2/tile000.png';
	import texture2 from '$lib/three/textures2/tile001.png';
	import texture3 from '$lib/three/textures2/tile002.png';
	import texture4 from '$lib/three/textures2/tile003.png';
	import texture5 from '$lib/three/textures2/tile004.png';
	import texture6 from '$lib/three/textures2/tile005.png';
	import texture7 from '$lib/three/textures2/tile006.png';
	import texture8 from '$lib/three/textures2/tile007.png';
	import texture9 from '$lib/three/textures2/tile008.png';

	import * as THREE from 'three';

	let canvas: HTMLCanvasElement;

	let scene: THREE.Scene;
	let renderer: THREE.WebGLRenderer;
	let camera: THREE.OrthographicCamera;

	let initialTextures = [texture3, texture4, texture5, texture6, texture7, texture8, texture9];

	let textures: THREE.Texture[] = [];

	let cubes: THREE.Mesh[] = [];

	const tetra_min = [
		// tetra
		[0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0], // ligne 1
		[1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1], // ligne 2
		[0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1], // ligne 3
		[0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1], // ligne 4
		[0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1], // ligne 5
	];

	const tetra_max = [
		// TETRA
		[1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1], // ligne 1
		[0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1], // ligne 2
		[0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1], // ligne 3
		[0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1], // ligne 4
		[0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1], // ligne 5
	];

	const rena_min = [
		// rena
		[0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0], // ligne 1
		[0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0], // ligne 2
		[0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0], // ligne 3
		[0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0], // ligne 4
		[0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0], // ligne 5
	];

	const matrix = tetra_min;
	function init() {
		scene = new THREE.Scene();

		renderer = new THREE.WebGLRenderer({ antialias: false, canvas });
		renderer.setSize(window.innerWidth, window.innerHeight);

		for (let i = 0; i < initialTextures.length; i++) {
			let texture = new THREE.TextureLoader().load(initialTextures[i]);
			texture.minFilter = THREE.NearestFilter;
			texture.magFilter = THREE.NearestFilter;
			textures.push(texture);
		}
		camera = createCamera();

		var grid = new THREE.GridHelper(110, 22);
		scene.add(grid);
	}

	function createCubes() {
		var geometry = new THREE.BoxGeometry(5, 5, 5);
		var rand = Math.floor(Math.random() * textures.length);

		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[0].length; j++) {
				if (matrix[i][j] === 0) continue;
				var material = new THREE.MeshBasicMaterial({
					map: textures[Math.floor(Math.random() * textures.length)],
				});
				var cube = new THREE.Mesh(geometry, material);

				cube.position.x = (-9 + j) * geometry.parameters.width;
				cube.position.y = (matrix.length - i) * geometry.parameters.width;
				scene.add(cube);
				cubes.push(cube);
			}
		}
	}

	function onWindowResize() {
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera = createCamera();
	}
	function animate(cube: THREE.Mesh) {
		// requestAnimationFrame(animate);
		// console.log(cube.position);
		// cube.position.y = -20;
		// if (cube.position.y === 0) {
		//   cube.position.y = 5;
		// }
		cube.position.y -= 5;

		setTimeout(() => {
			animate(cube);
		}, 1000);
		// cube.position.y -= 5;
		// cube.rotation.y += 0.01;
		renderer.render(scene, camera);
	}

	function rotateAnimation() {
		requestAnimationFrame(rotateAnimation);
		scene.rotateY(0.001);
		renderer.render(scene, camera);
	}

	function createCamera() {
		const aspect = window.innerWidth / window.innerHeight;
		const d = 40;
		const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
		camera.position.set(50, 50, 50); // all components equal
		camera.lookAt(scene.position); // or the origin
		return camera;
	}

	onMount(() => {
		init();

		createCubes();
		// createCubes2();
		rotateAnimation();
		// animate(cubes[Math.floor(Math.random() * cubes.length)]);
	});
	onDestroy(() => {
		if (renderer) renderer.dispose();
	});
</script>

<svelte:window on:resize={onWindowResize} />

<canvas bind:this={canvas}></canvas>
