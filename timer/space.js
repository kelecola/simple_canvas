let camera, scene, renderer, mesh, texture;

/**
 * 启动
 */
function start() {
    this.init();
    this.animate();
}

/**
 * 初始化
 */
function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;
    scene = new THREE.Scene();
    // 画几何体
    let geometry = new THREE.CubeGeometry(300, 300, 300);
    let canvas = document.getElementById('timer');
    // 添加几何纹理
    texture = new THREE.Texture(canvas);
    let material = new THREE.MeshBasicMaterial({
        map: texture
    });
    texture.needsUpdate = true;
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    texture.needsUpdate = true;
    mesh.rotation.y -= 0.01;
    mesh.rotation.x -= 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}