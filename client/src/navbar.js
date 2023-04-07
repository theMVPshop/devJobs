import femaleDev from './programmer_female.svg'
import maleDev from './programmer_male.svg'
import React, { Component }  from 'react';

const Navbar = () => {
  return ( 
    <nav className="navbar">
      <img src={femaleDev}alt='' className='dev'/>
      <h1 className="navh1">D<span>ev</span>J<span>obs</span>D<span>aily</span>.c<span>om</span></h1>
      <img src={maleDev}alt='' className='dev'/>
    </nav>
   );
}
 
export default Navbar;