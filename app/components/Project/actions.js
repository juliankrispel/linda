import {
  READ_PACKAGES_FROM_FOLDER,
  FETCH_PACKAGE_INFO,
  FETCH_AVAILABLE_PACKAGES,
  UPDATE_PACKAGE,
  SEARCH_PACKAGES,
  MALFORMED_PACKAGE_JSON,
  CREATED_PACKAGE_JSON,
  SET_PACKAGE_FOLDER,
  LOADED_PACKAGE_JSON,
  CHOOSE_PROJECT_FOLDER,
  DELETED_PACKAGE_JSON,
  HAS_PACKAGE_JSON,
  HAS_NO_PACKAGE_JSON,
  INSTALL_PACKAGE,
  INSTALL_PACKAGES,
} from '../../constants';
import { remote } from 'electron';
import path from 'path';
const { dialog } = remote;
import fs from '../../utils/fs';
import { createAction } from 'redux-actions';
import { packageJsonTemplate } from'../../utils/npmHelper';

export const readPackagesFromFolder = createAction(
  READ_PACKAGES_FROM_FOLDER
);

export const deletePackageJson = () => (dispatch, getState) => {
  const { project } = getState();
  const folderPath = project.get('path');
  if(confirm('Are you sure that you want to delete this package.json')) {
    fs.unlinkAsync(path.join(folderPath, 'package.json'))
    .then(() => (dispatch({type: DELETED_PACKAGE_JSON})));
  }
}

export const setFolder = createAction(SET_PACKAGE_FOLDER);

export const createPackageJson = () => (dispatch, getState) => {
  const { project } = getState();
  const folderPath = project.get('path');
  const packageJsonContent = packageJsonTemplate(path.basename(folderPath))
  fs.writeFileAsync(path.join(folderPath, 'package.json'), JSON.stringify(packageJsonContent, null, 2))
  .then(() => {
    dispatch({ type: HAS_PACKAGE_JSON });
    dispatch({ type: CREATED_PACKAGE_JSON });
    dispatch({ type: LOADED_PACKAGE_JSON, payload: packageJsonContent });
  });
}

export const readPackage = (folderPath) => (dispatch) => {
  fs.readFileAsync(path.join(folderPath, 'package.json'))
  .then((buffer) => {
    try {
      dispatch({ type: LOADED_PACKAGE_JSON, payload: JSON.parse(buffer.toString()) });
    } catch(e) {
      dispatch({ type: MALFORMED_PACKAGE_JSON });
    }
  });
}

export const setFolderAndLoadPackage = (folderPath) => (dispatch) => {
  dispatch(setFolder(folderPath));
  fs.readdirAsync(path.join(folderPath))
  .then((files) => {
    dispatch(readPackage(folderPath));
    if (files.indexOf('package.json') > -1) {
      dispatch({type: HAS_PACKAGE_JSON});
    } else {
      dispatch({type: HAS_NO_PACKAGE_JSON});
    }
  });
}

export const chooseFolder = () => (dispatch) => {
  dialog.showOpenDialog({
    defaultPath: process.env.HOME,
    title: 'Choose a folder',
    properties: ['openDirectory', 'createDirectory'],
  }, (folderPaths) => (dispatch(setFolderAndLoadPackage(folderPaths[0]))));
};
