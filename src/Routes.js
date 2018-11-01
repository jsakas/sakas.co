import About from '@pages/about/About';
import Experiments from '@pages/experiments/Experiments';
import ExperimentView from '@pages/experiments/ExperimentView';
import Resume from '@pages/resume/Resume';
import Archive from '@pages/archive/Archive';
import Audio from '@pages/audio/Audio';
import User from '@icons/User';
import Share1 from '@icons/Share1';
import Menu1 from '@icons/Menu1';
import Layers from '@icons/Layers';
import PlayButton1 from '@icons/PlayButton1';

const ROUTES = {
  about: {
    path: '/',
    component: About,
    title: 'About',
    showTitle: false,
    Icon: User,
    menu: true,
  },
  experiments: {
    path: '/code',
    component: Experiments,
    title: 'Code',
    showTitle: true,
    Icon: Share1,
    menu: true,
  },
  experiment: {
    path: '/code/:e?',
    component: ExperimentView,
    title: 'Code',
    showTitle: true,
    menu: false,
  },
  resume: {
    path: '/resume',
    component: Resume,
    title: 'Resume',
    showTitle: true,
    Icon: Menu1,
    menu: true,
  },
  archive: {
    path: '/archive',
    component: Archive,
    title: 'Archive',
    showTitle: true,
    Icon: Layers,
    menu: true,
  },
  audio: {
    path: '/audio',
    component: Audio,
    title: 'Audio',
    showTitle: true,
    Icon: PlayButton1,
    menu: true,
  },
};

export default ROUTES;
