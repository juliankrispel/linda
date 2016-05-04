import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import IT from 'react-immutable-proptypes';

class PackageJson extends Component {
  static propTypes = {
    hasPackageJson: T.bool.isRequired,
    packageJson: IT.map,
    deletePackageJson: T.func.isRequired,
    createPackageJson: T.func.isRequired,
    isMalformed: T.bool.isRequired,
  };

  renderSettings() {
    if (this.props.isMalformed === true) {
      return (
        <div>
          The <pre>package.json</pre> file is malformed. Please fix it by hand or <button onClick={this.props.deletePackageJson}>remove it.</button>
        </div>
      );
    }

    return (
      <div>
        {JSON.stringify(this.props.packageJson.toJS(), null, 2)}
      </div>
    );
  }

  renderCreatePackageJson() {
    return (
      <div>
        <h3>This folder has no <pre>package.json</pre>, would you like to create one?</h3>
        <button onClick={this.props.createPackageJson}>Create package.json</button>
      </div>
    );
  }

  render() {
    if (this.props.hasPackageJson === false) {
      return this.renderCreatePackageJson();
    }

    return this.renderSettings();
  }
}

export default PackageJson;
