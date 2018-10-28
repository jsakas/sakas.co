import React from 'react';
import ResumeMD from '@docs/Resume.md';

import './Resume.scss';

const Resume = () => {
  return (
    <div className="Resume page page--padded">
      <h1>Resume</h1>
      <div className="Resume__body">
        <ResumeMD />
      </div>
    </div>
  );
};

export default Resume;
