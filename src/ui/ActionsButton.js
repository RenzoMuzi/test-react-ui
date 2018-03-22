import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import PrimaryButton from 'ui/forms/PrimaryButton';
import Modal from './Modal';

class ActionsButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: false,
      isModalOpen: false,
      modalMessage: '',
    };
  }

  render() {
    const { isDropdownOpen, isModalOpen } = this.state;

    return (
      <div className="inline-block relative fs12 width-100px">
        {isModalOpen && this.renderAlertModal()}
        <div
          className="flex flex-center justify-between pc-btn bg-gradiant-white-gray border border-gray p1 pointer"
          onClick={this.toggleDropdown}
        >
          Actions
          <i className="inline-block fa fa-caret-down fa-lg gray pl1" />
        </div>
        {isDropdownOpen && (
          <div className="absolute bg-white z3 border border-gray rounded full-width">
            <div
              className="p1 custom-select-option pointer"
              onClick={this.printSelected}
            >
              Print selected
            </div>
            <div
              className="p1 custom-select-option pointer"
              onClick={this.printAll}
            >
              Print all
            </div>
          </div>
        )}
      </div>
    );
  }

  renderAlertModal() {
    const { modalMessage } = this.state;
    return (
      <Modal isOpen onClose={this.closeModal}>
        <div className="p2 m1 flex justify-between">
          <span className="fs20 weight-700 gray-primary">Alert!</span>
          <i
            className="fa fa-times gray-primary opacity-80 right pointer"
            onClick={this.closeModal}
          />
        </div>
        <div className="center border-top border-gray-50">
          <div className="mt3 fs16 weight-700 gray-primary opacity-80 px1">
            {modalMessage}
          </div>
          <div className="pb1 pt2 my3 flex justify-around">
            <PrimaryButton label="OK" onClick={this.closeModal} />
          </div>
        </div>
      </Modal>
    );
  }

  handleClickOutside() {
    this.setState({ isDropdownOpen: false });
  }

  toggleDropdown = () => {
    this.setState(state => ({ isDropdownOpen: !state.isDropdownOpen }));
  };

  printAll = () => {
    const { allEncounters } = this.props;

    if (allEncounters.length === 0) {
      this.setState({
        isModalOpen: true,
        isDropdownOpen: false,
        modalMessage: 'There are no encounters to print',
      });
      return;
    }
    this.setState({ isDropdownOpen: false });
    this.pwPrint(allEncounters);
  };

  printSelected = () => {
    const { checkedEncounters, allEncounters } = this.props;
    const selectedEncounters = allEncounters.filter(
      (encounter, index) => checkedEncounters[index],
    );

    if (selectedEncounters.length === 0) {
      this.setState({
        isModalOpen: true,
        isDropdownOpen: false,
        modalMessage: 'Please select at least one encounter',
      });
      return;
    }
    this.setState({ isDropdownOpen: false });
    this.pwPrint(selectedEncounters);
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  pwPrint(encounters) {
    // eslint-disable-next-line no-undef
    pw.App.Print.Pdf.CreateCustomEncounterPDF(
      encounters.map(encounter => encounter.EncounterId),
    );
  }
}

ActionsButton.defaultProps = {
  checkedEncounters: [],
  allEncounters: [],
};

ActionsButton.propTypes = {
  checkedEncounters: PropTypes.array,
  allEncounters: PropTypes.array,
};

export default enhanceWithClickOutside(ActionsButton);
