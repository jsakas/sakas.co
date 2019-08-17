import About from '@pages/about/About';
import Experiments from '@pages/experiments/Experiments';
import Resume from '@pages/resume/Resume';
import Archive from '@pages/archive/Archive';
import Portfolio from '@pages/portfolio/Portfolio';
import ProjectView from '@pages/portfolio/ProjectView';
import _404 from '@pages/errors/404';
import Audio from '@pages/audio/Audio';
import User from '@icons/User';
import Share1 from '@icons/Share1';
import Menu1 from '@icons/Menu1';
import Layers from '@icons/Layers';
import PlayButton1 from '@icons/PlayButton1';

const ROUTES = {
  portfolio: {
    active: false,
    path: '/portfolio',
    component: Portfolio,
    title: 'Portfolio',
    showLogo: true,
    showTitle: true,
    Icon: Layers,
    menu: true,
  },
  experiment: {
    active: true,
    path: '/code/:id/:slug',
    title: 'Code',
    showLogo: true,
    showTitle: true,
  },
  experiments: {
    active: true,
    path: '/code',
    component: Experiments,
    title: 'Code',
    showLogo: true,
    showTitle: true,
    Icon: Share1,
    menu: true,
    menuOrder: 2,
  },
  project: {
    active: false,
    path: '/project/:id/:slug',
    component: ProjectView,
    title: 'Code',
    showLogo: true,
    showTitle: true,
    menu: false,
    mainView: false,
  },
  resume: {
    active: true,
    path: '/resume',
    component: Resume,
    title: 'Resume',
    showLogo: true,
    showTitle: true,
    Icon: Menu1,
    menu: true,
    menuOrder: 3,
  },
  archive: {
    active: true,
    path: '/archive',
    component: Archive,
    title: 'Archive',
    showLogo: true,
    showTitle: true,
    Icon: Layers,
    menu: true,
    menuOrder: 4,
  },
  audio: {
    active: true,
    path: '/audio',
    component: Audio,
    title: 'Audio',
    showLogo: true,
    showTitle: true,
    Icon: PlayButton1,
    menu: false,
  },
  about: {
    active: true,
    path: '/',
    component: About,
    title: 'About',
    showLogo: false,
    showTitle: false,
    Icon: User,
    menu: true,
    menuOrder: 1,
  },
  default: {
    active: true,
    path: '*',
    component: _404,
    title: 'Not Found',
    menu: false,
  }
};

export default Object.keys(ROUTES)
  .filter(r => ROUTES[r].active)
  .reduce((a, c) => {
    a[c] = ROUTES[c];
    return a;
  }, {});
