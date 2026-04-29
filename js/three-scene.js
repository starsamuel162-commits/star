/* ═══════════════════════════════════════════════════════
   TECHWORLD - Three.js 3D Animations
   Lightweight, optimized scenes for hero and footer
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var ACCENT = 0x00ADB5;
  var BG = 0x222831;
  var SECTION = 0x393E46;

  function initHeroScene() {
    var container = document.getElementById('hero3d');
    if (!container || typeof THREE === 'undefined') return;

    var w = container.clientWidth;
    var h = container.clientHeight;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 1, 5);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(3, 5, 4);
    scene.add(dirLight);

    var pointLight = new THREE.PointLight(ACCENT, 1.2, 20);
    pointLight.position.set(-2, 2, 3);
    scene.add(pointLight);

    var group = new THREE.Group();
    scene.add(group);

    // Laptop body
    var bodyGeo = new THREE.BoxGeometry(2.4, 0.08, 1.6);
    var bodyMat = new THREE.MeshStandardMaterial({ color: SECTION, metalness: 0.8, roughness: 0.3 });
    var body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0;
    group.add(body);

    // Screen
    var screenGeo = new THREE.BoxGeometry(2.3, 1.5, 0.06);
    var screenMat = new THREE.MeshStandardMaterial({ color: BG, metalness: 0.5, roughness: 0.4 });
    var screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0.8, -0.77);
    screen.rotation.x = -0.2;
    group.add(screen);

    // Screen glow
    var glowGeo = new THREE.PlaneGeometry(2.1, 1.3);
    var glowMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.15 });
    var glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.set(0, 0.8, -0.74);
    glow.rotation.x = -0.2;
    group.add(glow);

    // Keyboard dots
    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 10; col++) {
        var keyGeo = new THREE.BoxGeometry(0.16, 0.02, 0.1);
        var keyMat = new THREE.MeshStandardMaterial({ color: 0x4a5060, metalness: 0.5, roughness: 0.5 });
        var key = new THREE.Mesh(keyGeo, keyMat);
        key.position.set(-0.9 + col * 0.2, 0.05, -0.5 + row * 0.18);
        group.add(key);
      }
    }

    // Floating particles
    var particles = [];
    for (var i = 0; i < 25; i++) {
      var pGeo = new THREE.SphereGeometry(0.03, 8, 8);
      var pMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.6 });
      var p = new THREE.Mesh(pGeo, pMat);
      p.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3 + 1,
        (Math.random() - 0.5) * 3
      );
      p.userData = {
        speedY: 0.002 + Math.random() * 0.005,
        speedX: (Math.random() - 0.5) * 0.003,
        baseY: p.position.y
      };
      scene.add(p);
      particles.push(p);
    }

    group.rotation.x = -0.3;
    group.rotation.y = -0.4;
    group.position.y = -0.3;

    var clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();

      group.rotation.y = -0.4 + Math.sin(t * 0.5) * 0.15;
      group.position.y = -0.3 + Math.sin(t * 0.8) * 0.05;

      glowMat.opacity = 0.12 + Math.sin(t * 2) * 0.05;

      for (var i = 0; i < particles.length; i++) {
        var pt = particles[i];
        pt.position.y = pt.userData.baseY + Math.sin(t * 1.5 + i) * 0.3;
        pt.position.x += pt.userData.speedX;
        if (Math.abs(pt.position.x) > 3) pt.userData.speedX *= -1;
      }

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', function () {
      w = container.clientWidth;
      h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  function initFooterScene() {
    var container = document.getElementById('footer3d');
    if (!container || typeof THREE === 'undefined') return;

    var w = container.clientWidth;
    var h = container.clientHeight;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 0, 4);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(ACCENT, 1, 15);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Grid of dots
    var dots = [];
    var cols = 30;
    var rows = 6;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var dGeo = new THREE.SphereGeometry(0.025, 6, 6);
        var dMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.3 });
        var d = new THREE.Mesh(dGeo, dMat);
        d.position.set(
          (c - cols / 2) * 0.35,
          (r - rows / 2) * 0.35,
          0
        );
        d.userData = { baseOp: 0.15 + Math.random() * 0.2, phase: Math.random() * Math.PI * 2 };
        scene.add(d);
        dots.push(d);
      }
    }

    // Animated ring
    var ringGeo = new THREE.TorusGeometry(1.2, 0.02, 8, 64);
    var ringMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.3 });
    var ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    var clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();

      ring.rotation.z = t * 0.3;
      ring.rotation.x = Math.sin(t * 0.5) * 0.3;
      ringMat.opacity = 0.2 + Math.sin(t) * 0.1;

      for (var i = 0; i < dots.length; i++) {
        var dt = dots[i];
        var wave = Math.sin(t * 1.5 + dt.userData.phase + dt.position.x * 0.5);
        dt.material.opacity = dt.userData.baseOp + wave * 0.15;
        dt.position.z = wave * 0.15;
      }

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', function () {
      w = container.clientWidth;
      h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initHeroScene();
      initFooterScene();
    });
  } else {
    initHeroScene();
    initFooterScene();
  }
})();
