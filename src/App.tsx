import React, { useEffect, useState } from 'react';
import './App.scss';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AboutMe from './about/AboutMe';
import { DarkTooltip } from './components/DarkTooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import AmortizationSchedule from './projects/loan-amortization/AmortizationSchedule';
import SearchForm from './projects/stack-api/SearchForm';
import Verizon from './experience/verizon/Verizon';
import Resume from './experience/resume/Resume';

export type VisualTheme = 'light' | 'dark';

function App() {
  const [theme, setTheme] = useState<VisualTheme>(window.localStorage.getItem('theme') as VisualTheme ?? 'dark');
  const [showNav, setShowNav] = useState<Boolean>(false);
  const [showExperienceMenu, setShowExperienceMenu] = useState(false);
  const [showProjectsMenu, setShowProjectsMenu] = useState(false);

  const location = useLocation();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  }

  const toggleNavMenu = () => {
    setShowNav(val => !val);
  }

  const toggleExperienceMenu = () => {
    setShowProjectsMenu(false);
    setShowExperienceMenu(val => !val)
  }

  const toggleProjectsMenu = () => {
    setShowExperienceMenu(false);
    setShowProjectsMenu(val => !val);
  }

  useEffect(() => {

    function handleResize() {
      setShowExperienceMenu(false);
      setShowProjectsMenu(false);

      if (window.innerWidth >= 680 && showNav) {
        setShowNav(false);
      }
    }

    function handleClick(e) {
      if (e.target.id === 'nav-menu-button') {
        setShowExperienceMenu(false);
        setShowProjectsMenu(false);
        return;
      }
      if (['nav-experience-button', 'nav-projects-button'].includes(e.target.id)) return;
      setShowNav(false);
      setShowExperienceMenu(false);
      setShowProjectsMenu(false);
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
        <Link to="/"><div className='app-header'>Kenny <div className={`kenny-heagle-logo ${theme}`} /> Heagle</div></Link>
        <div className='app-theme-icon' onClick={toggleTheme}>{theme === 'light' ? <LightModeIcon fontSize='large' /> : <DarkModeIcon fontSize='large' />}</div>
        <div id='nav-menu-button' className="app-navigation-menu-button" onClick={toggleNavMenu}>
          <MenuIcon fontSize='large' sx={{ pointerEvents: 'none' }} />
        </div>
        <div className={`app-navigation ${theme} ${showNav ? 'expanded' : ''}`}>
          <DarkTooltip
            className="navigation-dropdown-submenu"
            title={
              <>
                <Link to="/"><div className={`navigation-dropdown-button ${location.pathname === '/' ? ' selected' : ''}`}>Verizon</div></Link>
                <hr />
                <Link to="/resume"><div className={`navigation-dropdown-button ${location.pathname === '/resume' ? ' selected' : ''}`}>Resume</div></Link>
              </>
            }
            open={showExperienceMenu}
            placement={showNav ? 'left-start' : 'bottom'}
          >
            <div id="nav-experience-button" onClick={toggleExperienceMenu} className="navigation-button">
              Experience
            </div>
          </DarkTooltip>

          <DarkTooltip
            className="navigation-dropdown-submenu"
            title={
              <>
                <Link to="/stackApi"><div className={`navigation-dropdown-button ${location.pathname === '/stackApi' ? ' selected' : ''}`}>Stack API</div></Link>
                <hr />
                <Link to="/loanAmortization"><div className={`navigation-dropdown-button ${location.pathname === '/loanAmortization' ? ' selected' : ''}`}>Mortgage Calculator</div></Link>
              </>
            }
            open={showProjectsMenu}
            placement={showNav ? 'left-start' : 'bottom'}
          >
            <div id="nav-projects-button" onClick={toggleProjectsMenu} className="navigation-button">
              Projects
            </div>
          </DarkTooltip>
          <Link to="/about"><div className={`navigation-button ${location.pathname === '/about' ? ' selected' : ''}`}>About</div></Link>
        </div>
      </div>
      <div className="app-page">
        <Routes>
          <Route path="/" element={<Verizon theme={theme} />} />
          <Route path="/resume" element={<Resume theme={theme} />} />
          <Route path="/stackApi" element={<SearchForm theme={theme} />} />
          <Route path="/loanAmortization" element={<AmortizationSchedule theme={theme} />} />
          <Route path="/about" element={<AboutMe theme={theme} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
