import React, { useCallback, useState } from 'react';
import './App.scss';
import Resume from './resume/Resume';
import AboutMe from './about/AboutMe';
import Projects from './projects/Projects';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

type KennyPage = 'projects' | 'about' | 'resume';
export type VisualTheme = 'light' | 'dark';

function App() {
  const [page, setPage] = useState<KennyPage>('about');
  const [theme, setTheme] = useState<VisualTheme>(window.localStorage.getItem('theme') as VisualTheme ?? 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log(newTheme);
    window.localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
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

  return (
    <div className={`app-container ${theme}`}>
      <div className='app-topbar'>
        <div className='app-topbar-left'>
          <div className='app-header'>Welcome to my page!</div>
          <div className='app-theme-icon' onClick={toggleTheme}>{theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}</div>
        </div>
        <div className='app-navigation'>
          <div className={`navigation-button ${page === 'about' ? ' selected' : ''}`} onClick={() => { setPage('about') }}>About</div>
          <div className={`navigation-button ${page === 'resume' ? ' selected' : ''}`} onClick={() => { setPage('resume') }}>Resume</div>
          <div className={`navigation-button ${page === 'projects' ? ' selected' : ''}`} onClick={() => { setPage('projects') }}>Projects</div>
        </div>
      </div>
      <div className="app-page">
        {renderPage()}
      </div>
      <div className='home-footer-text'>
            <div className='footer-line'>
                This page is a work in progress.&nbsp;
                {`Development started ${(Math.floor((Date.now() - new Date('May 7, 2023').getTime()) / (1000 * 60 * 60 * 24)))} days ago.`}
            </div>
        </div>
    </div>
  );
}

export default App;
