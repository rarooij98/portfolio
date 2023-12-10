import React, { useEffect, useRef, useState, forwardRef } from 'react';
import {useLocation } from "react-router-dom";
import chroma from 'chroma-js';
import gsap from 'gsap';
import { TextureLoader, MeshBasicMaterial } from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { ScrollControls, useScroll, SoftShadows, Environment } from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Card from './Card';
import './styles/Home.css';

const Laptop = forwardRef(({ hoveredCard, gltf }, ref) => {
  const tl = useRef();
  const meshRef = useRef();
  const defaultMaterial = useRef(null);
  const material1 = useRef(null);
  const material2 = useRef(null);
  const material3 = useRef(null);
  const material4 = useRef(null);
  const material5 = useRef(null);
  
  // Loads materials and assign each to a reference
  const loadMaterials = (textures, materials) => {
    const textureLoader = new TextureLoader();
    return Promise.all(textures.map((texturePath, index) => {
      return new Promise((resolve, reject) => {
        textureLoader.load(texturePath, (texture) => {
          const newMaterial = new MeshBasicMaterial({ map: texture});
          materials[index].current = newMaterial;
          resolve();
        });
      });
    }));
  };
  
  // Preload the materials on the initial render
  useEffect(() => {
    const textureLoader = new TextureLoader();
    const image0 = process.env.PUBLIC_URL + '/images/black.png';
    textureLoader.load(image0, (texture) => {
      const newMaterial = new MeshBasicMaterial({ map: texture });
      defaultMaterial.current = newMaterial;
    })
    const image1 = process.env.PUBLIC_URL + '/images/color-picker.png';
    const image2 = process.env.PUBLIC_URL + '/images/navigatie-ODL.png';
    const image3 = process.env.PUBLIC_URL + '/images/AR-biologieboek.png';
    const image4 = process.env.PUBLIC_URL + '/images/CO2-dashboard.png';
    const image5 = process.env.PUBLIC_URL + '/images/school-match.png';
    const materials = [material1, material2, material3, material4, material5];
    const textures = [image1, image2, image3, image4, image5]
    loadMaterials(textures, materials);
  }, [])
  
  // When a Card is hovered, change the mesh color
  useEffect(() => { 
    if (meshRef.current && material1.current && defaultMaterial.current) {
      if (hoveredCard === 'color-picker') {
        meshRef.current.children[2].material = material1.current;
      } else if (hoveredCard === 'navigatie-ODL') {
        meshRef.current.children[2].material = material2.current;
      } else if (hoveredCard === 'AR-biologieboek') {
        meshRef.current.children[2].material = material3.current;
      } else if (hoveredCard === 'CO2-dashboard') {
        meshRef.current.children[2].material = material4.current;
      } else if (hoveredCard === 'school-match') {
        meshRef.current.children[2].material = material5.current;
      } else {
        // If no card is hovered, set it to the original material
        meshRef.current.children[2].material = defaultMaterial.current;
      }
    }
  }, [hoveredCard]);
  
  // Set the default material when the component mounts
  useEffect(() => {
    const currentMesh = meshRef.current;
    if (currentMesh && defaultMaterial.current) {
      currentMesh.children[2].material = defaultMaterial.current;
    }
    return () => {
      // Cleanup: Restore the default material when the component unmounts
      if (currentMesh && defaultMaterial.current) {
        currentMesh.children[2].material = defaultMaterial.current;
      }
    };
  }, []);
  
  // Creates the scroll animation
  const scroll = useScroll();
  useFrame((state, delta) => {
    tl.current.seek(scroll.offset * tl.current.duration());
  })
  
  // Light Helpers
  const pointlight = useRef();
  const directionallight = useRef();
  const directionallow = useRef();
  
  // Set up timelines
  useEffect((delta) => {
    tl.current = gsap.timeline();
    tl.current.to(
      meshRef.current.position,
      {duration: 1.5, x: 2.85, y: 0, z: 4, onUpdate: getPosition}, 0
    );
    tl.current.to(
      meshRef.current.rotation,
      {duration: 1.5, x: 0, y: -0.85, z: 0}, 0
    );
    
    // Gets the position on every scroll & when scrolled to the end shows the projects
    function getPosition(){
      let position = meshRef.current.position.z; //? start: 0.25, end: 4
      const content = document.getElementById('content');
      const list = document.getElementById('list');
    
      if (position < 4){
        position > 2 && content.classList.add('slide-out-content');
        position < 2 && content.classList.remove('slide-out-content');
        position > 2 && list.classList.add('slide-out-list');
        position < 2 && list.classList.remove('slide-out-list');
      }
      if (position > 3){
        gsap.set("div.Projects-card", {opacity: 1, pointerEvents: 'all', xPercent: 0})
      } else {
        gsap.set("div.Projects-card", {opacity: 0, pointerEvents: 'none', xPercent: -50})
      }
      
      // Function to calculate new colors based on scroll position
      const calculateNewColor = (percentage) => {
        const startColors = ['#a9c6ff', '#c5d3ff', '#dce0fe', '#efeffe', '#ffffff']; // Blue
        const endColors = ['#fff7d6', '#fff4e4', '#fff5f6', '#fffbff', '#ffffff']; // Yellow
        const interpolatedColors = startColors.map((startColor, index) => {
          return chroma.scale([startColor, endColors[index]])(percentage / 100).hex();
        });
        return `radial-gradient(circle, ${interpolatedColors.join(', ')})`;
      };
      // Apply the new color to the canvas (where endposition is 4 and startposition is 0.25)
      const canvas = document.getElementById('canvas');
      const scrollPercentage = (position - 0.25) / (4 - 0.25) * 100;
      canvas.style.background = calculateNewColor(scrollPercentage);
      
      // Stop updating the position
      return () => {
        tl.current.pause();
      }
    }
  }, []);
  
  return (
  <>
    <hemisphereLight skyColor={0xffeeb1} groundColor={0xffffff} intensity={1} castShadow />
    <directionalLight ref={directionallight} color={0xffffff} intensity={1} position={[2, 1.35, 4]} shadow-mapSize={1024}/>
    <directionalLight ref={directionallow} color={0xffffff} intensity={4} position={[0, 3, 2]} castShadow shadow-mapSize={1024}/>
    <pointLight ref={pointlight} intensity={2} color={0xffffff} position={[-1, 0.5, 4]} />
    <primitive
      name='model'
      object={gltf.scene}
      ref={meshRef}
      dispose={null}
      scale={1.5}
      position={[0, 1, 0]}
      rotation={[0, 0.2, 1.2]}
    />
  </>
  )
})

function Home(projects) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [modelLoading, setModelLoading] = useState(true);
  const [gltf, setGltf] = useState(null);
  
  // Loading the model
  useEffect(() => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(`${process.env.PUBLIC_URL}/laptop3.gltf`, (loadedGltf) => {
      loadedGltf.scene.children.forEach((mesh) => {
        mesh.castShadow = true;
      });
      setModelLoading(false);
      setGltf(loadedGltf);
    });
  }, []);
  
  // Don't save the scroll position from the previous page
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  // Show project image when hovering Card
  const handleCardHover = (cardName) => {
    setHoveredCard(cardName);
  };
  const handleCardUnhover = () => {
    setHoveredCard(null);
  };
  
  // Make a Card component for each Project
  const projectCards = projects.projects.map((item, index) => {
    return (
      <div className='Projects-card' key={item.name} id={item.name} onMouseEnter={() => handleCardHover(item.name)} onMouseLeave={handleCardUnhover}>
        <Card 
          className="card"
          item={item}
          id={item.name} 
          key={item.name} 
        />
      </div>
    )
  });
  
  return (
  <>
    {modelLoading ? (
        console.log('Loading...')
        // <div className="loading-screen">Loading...</div>
      ) : (
        <>
        {console.log('Loading complete.')}
          <div className='container'>
      {
        // Canvas
        // Wrapping the model in ScrollControls enables scroll animation with three fiber
        // With pages={3} it takes 3 pages of scrolling to finish the animation
      }
        <Canvas shadows className='canvas' id='canvas' camera={({position: [-1, 1, 10], fov: 50})} 
          style={{backgroundImage: 'radial-gradient(circle, #a9c6ff, #c5d3ff, #dce0fe, #efeffe, #ffffff'}}
        >
          <SoftShadows />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow >
            <planeGeometry args={[100, 100]}/>
            <shadowMaterial transparent opacity={0.4} />
          </mesh>
          <ScrollControls pages={2} damping={0.25} >
            <Laptop hoveredCard={hoveredCard} gltf={gltf}/>
          </ScrollControls>
          <Environment files={`${process.env.PUBLIC_URL}/forest_blur2.hdr`} />
        </Canvas>
      
      {
        // Content
      }
      <div className='content' id='content' style={{ pointerEvents: 'none' }}>
        <h1>Robin van Rooij</h1>
        <h2>Digital designer / Front-end developer</h2>
        <p>
        Hi, ik ben Robin! 👋 Ik volg de opleiding Communication & Multimedia Design in Amsterdam, waar ik me vooral focus op webdevelopment & UX design. 
        <br/>
        Ik vind het leuk om creatief bezig te zijn met tech, om prototypes te bouwen en deze te testen. 😊💻
        </p>
        <p className='cta'>🖱️ Scroll om mijn werk te zien</p>
      </div>
      <ul className="list" id="list">
          <li className="list-item">
            <a href="mailto: robinvanrooij@live.nl" className="list-link">
              <i className="bx bxl-gmail"></i>
            </a> 
          </li>
          <li className="list-item">
            <a href="https://github.com/rarooij98" target="_blank" className="list-link">
              <i className="bx bxl-github"></i>
            </a>
          </li>
          <li className="list-item">
            <a href="https://www.linkedin.com/in/robin-van-rooij-736405145/" target="_blank" className="list-link">
              <i className="bx bxl-linkedin"></i>
            </a>
          </li>
        </ul>
      {
        // Projects, loader & gradient background
      }
      <div className='projects-list' style={{ pointerEvents: 'none' }}>
        {projectCards}
      </div> 
    </div>
        </>
      )}
  
    
  </>
  );
}

export default Home;

