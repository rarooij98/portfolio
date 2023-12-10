import React from "react";
import { Link } from "react-router-dom";

function Card ({ item }) {

  // Format each project name
  const string = item.name;
  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  const title = capitalizeFirstLetter(string.replace(/-/g, ' '))

  return(
    <Link to={`${process.env.PUBLIC_URL}/${item.name}`} className='link'>
      <div className='project-container' id={item.name} key={item.name}>
      
      <p className='title'>
        {title}
      </p>
      
      <div className='metadata'>
        <p>{item.date}</p>
        <p>{item.subject}</p>
      </div>
        
      </div>
    </Link>
  )
};

export default Card;