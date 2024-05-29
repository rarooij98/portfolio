import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { easeInOut, motion, useScroll, useTransform } from "framer-motion";
import './styles/Single.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const transition = { duration: 1.4, ease: easeInOut };

// Sets animation rules for the title
const firstWord = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};
const secondWord = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};
const letter = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { duration: 1, ...transition },
  },
};

// Animates + displays the title and heading image
const Project = ({ project }) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  
  // Unable to scroll during entering animation
  const [canScroll, setCanScroll] = useState(false);
  useEffect(() => {
    if (canScroll === false) {
      document.querySelector("body").classList.add("no-scroll");
    } else {
      document.querySelector("body").classList.remove("no-scroll");
    }
  }, [canScroll]);
  
  // For each letter of the page name, return a motion.span
  const string = project.name;
  const firstString = string.split('-')[0];
  const secondString = string.split('-')[1];
  let firstArray = firstString.split('');
  let secondArray = secondString.split('');
  // Capitalize the first letter of the first word
  const firstLetters = firstArray.map((x, index) => {
    const capitalizedLetter = index === 0 ? x.toUpperCase() : x;
    return <motion.span variants={letter}>{capitalizedLetter}</motion.span>;
  });
  const secondLetters = secondArray.map((x) => {
    return <motion.span variants={letter}>{x}</motion.span>;
  });
  
  // Don't save the scroll position from the previous page
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  // Animations for the gallery images
  useEffect(() => {
    const images = document.querySelectorAll('.gallery-image');
    const texts = document.querySelectorAll('.gallery-text');
    
    images.forEach((image, index) => {
      const text = texts[index];
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
          // markers: true,
        },
      });
      tl.set(image, { opacity: 0, x: -100 }); // Initial state (invisible and to the left)
      tl.to(image, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.inOut' }); // Animation when the text becomes visible
      tl.to(image, { y: 50, duration: 1, ease: 'power3.inOut' }, '-=0.5'); // Scroll animation with the text
      tl.to(image, { opacity: 0, x: -100, duration: 0.5, ease: 'power3.inOut' }, '-=0.5'); // Animation when the text leaves the screen
    });
  }, []);
  
  // Loads the images and descriptions for the current project
  const LoadItems = () => {
    const itemList = Array.from({ length: 3 }, (_, index) => index + 1);
    return itemList.map((index) => (
      <div key={index} className="gallery-item">
        <div className="gallery-image">
          <img
            src={`${process.env.PUBLIC_URL}/images/${project.name}/picture-${index}.png`}
            alt={`project-${index}`}
          />
        </div>
        <div className="gallery-text">
          <p>{project[`gallery_text_${index}`]}</p>
        </div>
      </div>
    ));
  };
  
  // Styles the description text
  // const DescriptionStyling = () => {
  //   var elements = document.querySelectorAll('.gallery-text p');
  //   elements.forEach(function(element) {
  //     // Replace the first period with an empty string
  //     var textContent = element.textContent;
  //     var newHtml = textContent.replace('.', '');
  //     // Split the modified string at the first space
  //     var spaceIndex = newHtml.indexOf(' ');
  //     var parts = spaceIndex !== -1 ? [newHtml.substring(0, spaceIndex), newHtml.substring(spaceIndex + 1)] : [newHtml];
  //     // Create a new HTML with the first part wrapped in a span and concatenate the second part
  //     var finalHtml = '<span class="description-title">' + parts[0] + '</span>' + (parts[1] ? ' ' + parts[1] : '');
  //     element.innerHTML = finalHtml;
  //   });
  // }
  //DescriptionStyling();

  return (
    <div id='Single'>
      <motion.div
        onAnimationComplete={() => setCanScroll(true)}
        className='single'
        initial='initial'
        animate='animate'
        exit='exit'
        >
        
        {/* Top Row */}
        <div className='container fluid'>
          <div className='row center top-row'>
            <div className='top'>
              {/* Project Detail */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 1.2, ...transition },
                }}
                className='details'>
                <span className="subject">{project.subject}</span>
                <span className="date">{project.date}</span>
              </motion.div>
              {/* Project Name */}
              <motion.div className='model'>
                <motion.span className='first' variants={firstWord}>
                  {firstLetters}
                </motion.span>
                <motion.span className='last' variants={secondWord}>
                  {secondLetters}
                </motion.span>
              </motion.div>
            
            </div>
          </div>
          <div className='row bottom-row'>
            <div className='bottom'>
              <motion.div className='image-container-single'>
              <motion.div
                  initial={{
                    y: "-50%",
                    x: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  animate={{
                    y: 0,
                    x: 0,
                    width: "100%",
                    height: 500,
                    transition: { delay: 0.2, ...transition },
                  }}
                  className='thumbnail-single'>
                  <motion.div
                    className='frame-single'
                    whileHover='hover'
                    transition={transition}>
                    <motion.img
                      src={process.env.PUBLIC_URL + `/images/${project.name}/picture-0.png`}
                      alt='project image'
                      style={{ scale: scale }}
                      initial={{ scale: 1.0 }}
                      animate={{
                        transition: { delay: 0.2, ...transition },
                        // y: window.innerWidth > 1440 ? -1200 : -600,
                        y: 10
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className='detailed-information'>
          <div className='container'>
            <div className='row'>
              <h2 className='title'>
                {project.title}
              </h2>
              <p>
                {project.description}
                <a href={project.downloadLink || project.link} 
                  target={project.downloadLink ? undefined : '_blank'}
                  rel={project.downloadLink ? undefined : 'noreferrer'}
                  className="button" 
                  style={{ backgroundColor: project.color }}
                  download={project.downloadLink ? true : undefined}>{project.linktext}
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Gallery */}
        <div className="gallery-rows">
          {LoadItems()}
        </div>
        
      </motion.div>
    </div>
  );
};

export default Project;