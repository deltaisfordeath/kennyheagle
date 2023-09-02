import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import Resume from './resume/Resume';
import AboutMe from './about/AboutMe';
import Projects from './projects/Projects';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';

type KennyPage = 'projects' | 'about' | 'resume';
export type VisualTheme = 'light' | 'dark';

function App() {
  const [page, setPage] = useState<KennyPage>('about');
  const [theme, setTheme] = useState<VisualTheme>(window.localStorage.getItem('theme') as VisualTheme ?? 'light');
  const [showNav, setShowNav] = useState<Boolean>(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  }

  const toggleNavMenu = () => {
    setShowNav(val => !val);
  }

  const renderPage = useCallback(() => {
    switch (page) {
      case 'about':
        return <AboutMe theme={theme} />
      case 'projects':
        return <Projects theme={theme} />
      case 'resume':
        return <Resume theme={theme} />
    }
  }, [page, theme]);

  useEffect(() => {

    function handleResize() {
      if(window.innerWidth >= 680 && showNav) {
        setShowNav(false);
      }
    }

    function handleClick(e) {
      if (e.target.id === 'nav-menu-button') return;
      setShowNav(false);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  }, [showNav])

  return (
    <div className={`app-container ${theme}`}>
      <div className={`app-topbar ${theme}`}>
        <div className='app-header'>Kenny <div className={`kenny-heagle-logo ${theme}`} /> Heagle</div>
        <div className='app-theme-icon' onClick={toggleTheme}>{theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}</div>
        <div id='nav-menu-button' className="app-navigation-menu-button" onClick={toggleNavMenu}>
            <MenuIcon sx={{pointerEvents: 'none'}} />
        </div>
        <div className={`app-navigation ${theme} ${showNav ? 'expanded' : ''}`}>
          <div className={`navigation-button ${page === 'about' ? ' selected' : ''}`} onClick={() => { setPage('about') }}>About</div>
          <div className={`navigation-button ${page === 'resume' ? ' selected' : ''}`} onClick={() => { setPage('resume') }}>Resume</div>
          <div className={`navigation-button ${page === 'projects' ? ' selected' : ''}`} onClick={() => { setPage('projects') }}>Projects</div>
        </div>
      </div>
      <div className="app-page">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
