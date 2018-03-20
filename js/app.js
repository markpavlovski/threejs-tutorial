example = (() => {
  console.log("running")
  "use strict"

  let scene = new THREE.Scene()
  let renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : THREE.CanvasRenderer()
  let light = new THREE.AmbientLight(0xffffff)
  let camera
  let box

  function initScene() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.querySelector("#webgl-container").appendChild(renderer.domElement)
    scene.add(light)


    // first 35 - Field of View, the up /down degree.
    // second aspect ratio : width/height of the container
    // The last two are the near and far planes of inclusion - only objects inside teh range will be rendered
    // we are using perspective camera, but orthographic camera is another option wchich creates cool equal effect
    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1, 1000
    )
    camera.position.z = 100
    scene.add(camera)

    box = new THREE.Mesh(
      new THREE.BoxGeometry(20, 20, 20),
      new THREE.MeshBasicMaterial({
        color: 0xFF0000
      })
    )

    box.name = "box"
    scene.add(box)

    render()
  }

  function render(){
    box.rotation.y += 0.01
    box.rotation.x += 0.01
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  // initScene()
  window.onload = initScene
  return {scene: scene}
})()
