export default [
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
    component: () => import('@components/Grid'),
    description: 'Web Audio & Canvas Experiment',
  },
  {
    id: 3,
    type: 'component',
    slug: 'eclipse',
    title: 'Eclipse',
    component: () => import('@components/Eclipse'),
    description: 'Web Audio & Canvas Experiment',
  },
  {
    id: 4,
    type: 'component',
    slug: 'space-doughnut',
    title: 'Space Doughnut',
    component: () => import('@components/Galaxy'),
    description: 'JavaScript Particles',
  },
  {
    id: 5,
    type: 'component',
    slug: 'crypto-typer',
    title: 'Crypto Typer',
    component: () => import('@components/CryptoTyper'),
    description: 'A possible page intro',
  }
];
