import femaleDev from './programmer_female.svg'
import maleDev from './programmer_male.svg'
import React, { Component }  from 'react';

const Navbar = () => {
  return ( 
    <nav className="navbar">
        <section className="bx bx4">
        <img src={femaleDev}alt='' className='Dev'/>
          <h1 className="navh1">
             DevJobsDaily.com </h1>
         <img src={maleDev}alt='' className='Dev'/>
        </section>
          {/* <div className="links">
            <a href="./"> Link </a>
            <a href="./"> Link1 </a>
            <a href="./"> Link2 </a>
            <a href="./"> Link3 </a>
            <a href="./"> Link4 </a>
          </div> */}


    </nav>
   );
}
 
export default Navbar;