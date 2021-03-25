import '/style.scss';
import * as THREE from 'three';
// import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import fragment from './shader/fragment.glsl';
import vertex from './shader/vertex.glsl';

// const gui = new dat.GUI();

export default class Sketch{
	constructor(options){
		this.time = 0;
		this.container = options.dom;

		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
		this.camera.position.z = 1;

		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		
		this.container.appendChild( this.renderer.domElement );

		this.controls = new OrbitControls( this.camera, this.renderer.domElement );

		this.resize();
		this.setupResize();
		this.addObjects();
		this.render();
	}

	setupResize(){
		window.addEventListener('resize', this.resize.bind(this));
	}

	resize(){
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		this.renderer.setSize( this.width, this.height );
		this.camera.aspect = this.width/this.height;
		this.camera.updateProjectionMatrix();
	}

	addObjects(){

		// this.geometrySphere = new THREE.SphereGeometry( 3, 132, 132 );

		this.geometry = new THREE.PlaneBufferGeometry( 4, 4, 100, 100 );
		// this.material2 = new THREE.MeshNormalMaterial();
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				time: {value:0}
			},
			side: THREE.DoubleSide,
			fragmentShader: fragment,
			vertexShader: vertex,
			// wireframe: true,
		})
	
		this.mesh = new THREE.Mesh( this.geometry, this.material );
		// this.mesh2 = new THREE.Mesh( this.geometrySphere, this.material );
		// this.mesh.position.set(0,0,0);
		// this.mesh.rotation.set(0,0,0);

		// this.scene.add( this.mesh2 );
		this.scene.add( this.mesh );

		this.mesh.rotation.x = -1.30;



		// gui.add(this.mesh.rotation, 'y').min(-1.5).max(1.5).step(0.01);
		// gui.add(this.mesh.rotation, 'x').min(-1.5).max(1.5).step(0.01);
		// gui.add(this.mesh.rotation, 'z').min(-90).max(90).step(0.01);
	}

	render(){
		this.time+= 0.05;
		// this.mesh.rotation.x = this.time / 2000;
		// this.mesh.rotation.y = this.time / 1000;

		// this.mesh.rotation.x -= 0.001 * 2;

		this.material.uniforms.time.value = this.time;
	
		this.renderer.render(this.scene, this.camera);
		window.requestAnimationFrame(this.render.bind(this));
	}
}

new Sketch({
	dom: document.getElementById('container')
});