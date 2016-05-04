import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions'
import Path from './Path';
import PackageJson from './PackageJson';

export class Project extends Component {
  static propTypes = {
    path: T.string.isRequired,
    setFolder: T.func.isRequired,
    chooseFolder: T.func.isRequired,
    deletePackageJson: T.func.isRequired,
    createPackageJson: T.func.isRequired,
    isMalformed: T.bool.isRequired,
    hasPackageJson: T.bool.isRequired,
    readPackagesFromFolder: T.func.isRequired,
    setFolder: T.func.isRequired,
  };

  renderPackageJson() {
    const {
      createPackageJson,
      packageJson,
      deletePackageJson,
      path,
      isMalformed,
      hasPackageJson,
    } = this.props;

    if (path !== '') {
      return (<PackageJson {...{createPackageJson, deletePackageJson, isMalformed, packageJson, hasPackageJson}} />);
    }
  }

  render() {
    return (
      <div>
        <div>
          <Path path={this.props.path} chooseFolder={this.props.chooseFolder}/>
          {this.renderPackageJson()}
        </div>
      </div>);
  }
}

function mapStateToProps({ project }) {
  return {
    path: project.get('path'),
    isMalformed: project.get('isMalformed'),
    hasPackageJson: project.get('hasPackageJson'),
    packageJson: project.get('packageJson'),
  };
}

export default connect(mapStateToProps, actions)(Project);
