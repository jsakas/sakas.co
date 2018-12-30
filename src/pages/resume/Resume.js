import React from 'react';
import Tooltip from '@components/tooltip/Tooltip';
import ResumeMD from '@docs/Resume.md';
import IconPrint from '@icons/Print';

import './Resume.scss';

const Resume = () => {
  return (
    <div className="Resume">
      <div className="Resume__print">
        <Tooltip render={() => (<span>Printer friendly version 😎</span>)}>
          <IconPrint className="Resume__print-icon" onClick={() => window.print()} />
        </Tooltip>
      </div>
      <div className="Resume__body">
        <ResumeMD />
      </div>
    </div>
  );
};

export default Resume;
