import React, { useCallback, useState } from 'react';
import './App.scss';
import Resume from './resume/Resume';
import AboutMe from './about/AboutMe';
import Projects from './projects/Projects';

type KennyPage = 'projects' | 'about' | 'resume';

function App() {
  const [page, setPage] = useState<KennyPage>('about');

  const renderPage = useCallback(() => {
    switch (page) {
      case 'about':
        return <AboutMe />
      case 'projects':
        return <Projects />
      case 'resume':
        return <Resume />
    }
  }, [page]);

  return (
    <div className="app-container">
      <div className="app-topbar">
        <div className='app-header'>Welcome to my page!</div>
        <div className="app-navigation">
          <div className={`navigation-button ${page === 'about' ? ' selected' : ''}`} onClick={() => { setPage('about') }}>About</div>
          <div className={`navigation-button ${page === 'resume' ? ' selected' : ''}`} onClick={() => { setPage('resume') }}>Resume</div>
          <div className={`navigation-button ${page === 'projects' ? ' selected' : ''}`} onClick={() => { setPage('projects') }}>Projects</div>
        </div>
      </div>
      <div className="app-page">
        {renderPage()}
      </div>
      <div className="home-footer-text">
            <div className="footer-line">
                This page is a work in progress.&nbsp;
                {`Development started ${(Math.floor((Date.now() - new Date('May 7, 2023').getTime()) / (1000 * 60 * 60 * 24)))} days ago.`}
            </div>
        </div>
    </div>
  );
}

export default App;
