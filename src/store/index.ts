// store/index.js

import { createStore } from 'vuex';
import auth from './modules/auth';
import chartDataModule from './modules/chartDataModule';
import barInfo from './modules/barInfo';

export default createStore({
  modules: {
    auth,
    chartDataModule,
    barInfo,
  },
});
