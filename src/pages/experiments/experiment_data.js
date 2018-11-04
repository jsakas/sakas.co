import Grid from '@components/Grid';
import Galaxy from '@components/Galaxy';
import Eclipse from '@components/Eclipse';

module.exports = [
  {
    id: 1,
    type: 'iframe',
    slug: 'subtractor',
    title: 'Subtractor',
    description: 'A polyphonic synthesizer built with JavaScript',
    iframe: 'https://subtractor.netlify.com',
    source_code: 'https://github.com/jsakas/Subtractor/'
  },
  {
    id: 2,
    type: 'component',
    slug: 'grid',
    title: 'Grid',
    component: Grid,
    description: 'Web Audio & Canvas Experiment',
  },
  {
    id: 3,
    type: 'component',
    slug: 'eclipse',
    title: 'Eclipse',
    component: Eclipse,
    description: 'Web Audio & Canvas Experiment',
  },
  {
    id: 4,
    type: 'component',
    slug: 'space-doughnut',
    title: 'Space Doughnut',
    component: Galaxy,
    description: 'JavaScript Particles',
  }
];
