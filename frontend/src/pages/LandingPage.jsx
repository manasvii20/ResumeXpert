import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { landingPageStyles } from '../assets/dummystyle'
import { LayoutTemplate,X,Menu } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { ProfileInfoCard } from '../components/Cards';


const LandingPage=()=>{
    const {user}=useContext(UserContext)
    const navigate=useNavigate()
    const [openAuthModal,setOpenAuthModal]=useState(false)

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
                    <div className='hidden md:flex items-center'>
                        {user ? (
                            <ProfileInfoCard/>
                        ):(
                            <button className={landingPageStyles.desktopAuthButton} onClick={()=> setOpenAuthModal(true) }>
                                <div className={landingPageStyles.desktopAuthButtonOverlay}></div>
                                <span className={landingPageStyles.desktopAuthButtonText}>Get Started</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* MOBILE MENU*/}
                {mobileMenuOpen && (
                    <div className={landingPageStyles.mobileMenu}>
                        <div className={landingPageStyles.mobileMenuContainer}>
                            {user ?(
                                <div className={landingPageStyles.mobileUserInfo}>
                                    <div className={landingPageStyles.mobileUserWelcome}>
                                        Welcome Back
                                    </div>
                                    <button className={landingPageStyles.mobileDashboardButton}
                                        onClick={()=>{
                                            navigate('/dashboard');
                                            setMobileMenuOpen(false)
                                        }}>
                                        Go to Dashboard
                                    </button>
                                </div>
                            ) :(
                                <button className={landingPageStyles.mobileAuthButton}
                                onClick={()=>{
                                    setOpenAuthModal(true)
                                    setMobileMenuOpen(false)
                                }}>
                                    Get Started
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* MAIN CONTENT*/}
            <main className={landingPageStyles.main}>
                <section className={landingPageStyles.heroSection}>
                    <div className={landingPageStyles.heroGrid}>
                        {/* LEFT CONTENT */}
                        <div className={landingPageStyles.heroLeft}>
                            <div className={landingPageStyles.tagline}>
                                Professional Resume Builder
                            </div>

                            <h1 className={landingPageStyles.heading}>
                                <span className={landingPageStyles.headingText}>Craft</span>
                                <span className={landingPageStyles.headingGradient}>Professional</span>
                                <span className={landingPageStyles.headingText}>Resumes</span>
                            </h1>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default LandingPage