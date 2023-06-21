import React, { useCallback, useState } from 'react';
import './App.scss';
import KennyButton from './KennyButton';
import Resume from './resume/Resume';

type KennyPage = 'default' | 'resume';

function App() {
  const [page, setPage] = useState<KennyPage>('default');

  const renderPage = useCallback(() => {
    switch (page) {
      case 'default':
        return <>
          <h5>I have a lot to learn, which is very exciting!</h5>
          <KennyButton callback={() => { console.log("Just kidding, I logged.") }} text="I DO NOTHING" />
        </>
      case 'resume':
        return <Resume />
    }
  }, [page]);

  return (
    <div className="app-container">
      <div className="app-topbar">
        <div className='app-header'>Welcome to Kenny Heagle's Page!</div>
        <div className="app-navigation">
          <div onClick={() => { setPage('default') }}>Home</div>
          <div onClick={() => { setPage('resume') }}>Resume</div>
        </div>
      </div>
      <div className="app-page">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
