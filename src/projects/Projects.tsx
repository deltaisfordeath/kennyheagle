import React, { useState } from 'react';
import SearchForm from './stack-api/SearchForm';
import AmortizationSchedule from './loan-amortization/AmortizationSchedule';
import './Projects.scss';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState('searchForm');

  function getSelectedProject() {
    switch (selectedProject) {
      case 'searchForm':
        return <SearchForm />;
      case 'loanAmortization':
        return <AmortizationSchedule />;
    }
  }

  return <div className="project-container">
    <div className="project-navigation">
      <div className="project-navigation-button" onClick={() => setSelectedProject('searchForm')}>Stack API</div>
      <div className="project-navigation-button" onClick={() => setSelectedProject('loanAmortization')}>Loan Calculator</div>
    </div>
    <div className="page-container">
      {getSelectedProject()}
    </div>
  </div>;
}