import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import {
  READ_PACKAGES_FROM_FOLDER,
  FETCH_PACKAGE_INFO,
  FETCH_AVAILABLE_PACKAGES,
  UPDATE_PACKAGE,
  MALFORMED_PACKAGE_JSON,
  DELETED_PACKAGE_JSON,
  SEARCH_PACKAGES,
  HAS_PACKAGE_JSON,
  HAS_NO_PACKAGE_JSON,
  SET_PACKAGE_FOLDER,
  INSTALL_PACKAGE,
  LOADED_PACKAGE_JSON,
  INSTALL_PACKAGES,
} from '../../constants';

const initialState = fromJS({
  hasPackageJson: false,
  isMalformed: false,
  path: '',
  packageJson: {},
});

export default handleActions({
  [SET_PACKAGE_FOLDER](state, { payload }) {
    return state.set('path', payload);
  },

  [DELETED_PACKAGE_JSON](state) {
    return state.set('packageJson', fromJS({}));
  },

  [MALFORMED_PACKAGE_JSON](state) {
    return state.set('isMalformed', true);
  },

  [LOADED_PACKAGE_JSON](state, { payload }) {
    console.log('boom', payload);
    return state.set('packageJson', fromJS(payload));
  },

  [HAS_PACKAGE_JSON](state) {
    return state.set('hasPackageJson', true);
  },

  [HAS_NO_PACKAGE_JSON](state) {
    return state.set('hasPackageJson', false);
  },
}, initialState);
