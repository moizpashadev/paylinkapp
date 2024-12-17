'use client';

import React, { useState } from 'react';
import Image from 'next/image';




const Header = ({Heading,logo}) => {
    return (
        <div className="">
            {/* Logo Section */}
           
            <nav className=" flex justify-between">

                <div className="ml-3 flex justify-start p-2 sm:ml-5 sm:p-2 md:p-2 lg:p-2">
                    <Image src={logo} alt="Logo" className="responsive-logo" />
                </div>
               
                <div className="border-2 border-green-600 text-green-600 rounded-md px-2 m-4 sm:ml-5 md:ml-5 ">
                <p className='flex justify-end '>0335-8425729</p>
                    </div>
                    
                    </nav>


            {/* Payment Link Section */}
            <div style={{ backgroundColor: '#E3EBF2' }}
                className="rounded-md p-3 py-3 ml-5 mr-5 sm:p-2 sm:py-2 sm:ml-5 sm:mr-5 md:p-4 md:py-4 lg:p-5 lg:py-5  flex justify-center items-center">
                <h2 className="font-outfit text-base md:text-2xl lg:text-3xl text-center">
                    <div>
                        <p className="heading tracking-widest">{Heading}</p>
                    </div>
                </h2>
            </div>
        </div>
    );
};

export default Header;
