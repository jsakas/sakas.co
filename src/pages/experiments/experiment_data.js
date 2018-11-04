import AudioViz1 from '@components/AudioViz1';
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
    slug: 'audio-visual-1',
    title: 'Audio Visual 1',
    component: AudioViz1,
    description: 'Web Audio & Canvas Experiment',
    source_code: 'https://github.com/jsakas/Subtractor/'
  },
  {
    id: 3,
    type: 'component',
    slug: 'audio-visual-2',
    title: 'Audio Visual 2',
    component: Eclipse,
    description: 'Web Audio & Canvas Experiment',
    source_code: 'https://github.com/jsakas/Subtractor/'
  },
  {
    id: 4,
    type: 'component',
    slug: 'space-doughnut',
    title: 'Space Doughnut',
    component: Galaxy,
    description: 'JavaScript Particles',
    source_code: 'https://github.com/jsakas/Subtractor/'
  }
];
