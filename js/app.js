example = (() => {
  console.log("running")
  "use strict"

  let scene = new THREE.Scene()
  let renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : THREE.CanvasRenderer()
  let light = new THREE.AmbientLight(0xffffff)
  let camera
  let loader
  let box
  let sphere
  let manualGeometry
  let shape
  let monster
  let flamingo
  let t = 0

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
    camera.position.z = 50
    camera.position.y = 10
    camera.rotation.x = -.1
    scene.add(camera)

    // added loader from examples
    loader = new THREE.ColladaLoader()
    // loader.options.convertUpAxis = true

    loader.load('models/stormtrooper.dae', (collada)=>{
      monster = collada.scene
      monster.scale.x = 2
      monster.scale.y = 2
      monster.scale.z = 2


      // scene.add(monster)
      render()
    })


    // added Three.js native loader

    loader = new THREE.JSONLoader()

    loader.load("models/flamingo.js", (geometry,materials)=>{
      let material = new THREE.MeshBasicMaterial({
        color: 0xBADA55,
        wireframe: true
      })
      flamingo = new THREE.Mesh(geometry,material)
      flamingo.scale.x = .2
      flamingo.scale.y = .2
      flamingo.scale.z = .2

      flamingo.position.x = -5
      flamingo.position.y = 7


      scene.add(flamingo)
      render()
    })







    // Create Box Geometry
    box = new THREE.Mesh(
      new THREE.BoxGeometry(20, 20, 20),
      new THREE.MeshBasicMaterial({
        color: 0xFF0000
      })
    )
    box.name = "box"
    // scene.add(box)

    // Create Sphere Geometry
    // Sphere mesh: radius, widthSegmentds, heightSegment
    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(20, 30, 30),
      new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        wireframe: true
      })
    )
    // scene.add(sphere)


    // Create custom Geometry

    let triangleGeometry = new THREE.Geometry()

    triangleGeometry.vertices.push(new THREE.Vector3(0.0, 10.0, 0.0))
    triangleGeometry.vertices.push(new THREE.Vector3(-10.0, -10.0, 0.0))
    triangleGeometry.vertices.push(new THREE.Vector3(10.0, -10.0, 0.0))

    triangleGeometry.faces.push(new THREE.Face3(0, 1, 2))

    triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xFF0000)
    triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00FF00)
    triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0x0000FF)

    let triangleMaterial = new THREE.MeshBasicMaterial({
      vertexColors: THREE.VertexColors,
      side: THREE.DoubleSide,
      wireframe: false
    })

    manualGeometry = new THREE.Mesh(triangleGeometry, triangleMaterial)
    // scene.add(manualGeometry)


    // Play with Extrusion

    let wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xBADA55,
      wireframe: true
    })

    let shapePoints = []
    shapePoints.push(new THREE.Vector3(0.0, 10.0, 0.0))
    shapePoints.push(new THREE.Vector3(-10.0, -10.0, 0.0))
    shapePoints.push(new THREE.Vector3(10.0, -10.0, 0.0))

    let shapeSettings = new THREE.Shape( shapePoints )
    let extrusionSettings = {
      steps: 10,
      amount: 20,
      bevelEnabled: false
    }

    let shapeGeometry = new THREE.ExtrudeGeometry( shapeSettings, extrusionSettings )

    shape = new THREE.Mesh(shapeGeometry, wireMaterial)
    // scene.add(shape)









    stats = new Stats()
    stats.setMode(0)
    stats.domElement.style = 'position: absolute; left: 20px; top: 20px;'
    document.body.appendChild(stats.domElement)

    render()
  }

  function render() {
    box.rotation.y += 0.01
    sphere.rotation.y += 0.01
    // manualGeometry.rotation.y += 0.01
    t += 0.02
    manualGeometry.geometry.vertices[0].y = 10 * (1 + Math.pow(Math.sin(t),2))
    manualGeometry.geometry.vertices[1].x = 10 * (1 + Math.pow(Math.sin(t),2))
    manualGeometry.geometry.vertices[2].x = -10 * (1 + Math.pow(Math.sin(t),2))
    manualGeometry.geometry.verticesNeedUpdate = true


    shape.rotation.y += 0.01
    if (monster) monster.rotation.z += 0.005
    if (flamingo) flamingo.rotation.y += 0.005

    renderer.render(scene, camera)
    requestAnimationFrame(render)
    stats.update()
  }

  // initScene()
  window.onload = initScene
  return {
    scene: scene
  }
})()
