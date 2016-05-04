import React, { PropTypes as T } from 'react';

const Path = ({path, chooseFolder}) => {
  if (path.trim() === '') {
    return (<button onClick={chooseFolder}>Please choose a folder</button>);
  }
  return (<button onClick={chooseFolder}>{path}</button>);
};

Path.prototype.propTypes = {
  path: T.string.isRequired,
  chooseFolder: T.func.isRequired,
};

export default Path;
