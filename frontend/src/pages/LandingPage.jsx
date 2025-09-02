import React, { useState } from 'react'
import { landingPageStyles } from '../assets/dummystyle'
import { LayoutTemplate,X,Menu } from 'lucide-react';

const LandingPage=()=>{

    const [mobileMenuOpen,setMobileMenuOpen]=useState(false)

    return (
        <div className={landingPageStyles.container}>
            {/*HEADDER*/}
            <header className={landingPageStyles.header}>
                <div className={landingPageStyles.headerContainer}>
                    <div className={landingPageStyles.logoContainer}>
                        <div className={landingPageStyles.logoIcon}>
                            <LayoutTemplate className={landingPageStyles.logoIconInner}/>
                        </div>
                        <span className={landingPageStyles.logoText}>
                            ResumeXpert
                        </span>
                    </div>
                    
                    {/* MOBILE MENU BTN */}
                    <button className={landingPageStyles.mobileMenuButton}
                        onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ?
                                <X size={24} className={landingPageStyles.mobileMenuIcon}/>:
                                <Menu size={24} className={landingPageStyles.mobileMenuIcon}/>}
                    </button>

                    {/* DESKTOP NAVIGATION */}
                    
                </div>
            </header>
        </div>
    )
}

export default LandingPage