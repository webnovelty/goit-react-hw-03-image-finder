import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalWrapper, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
	componentDidMount() {
		window.addEventListener('keydown', this.keyDown);
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.keyDown);
	}

	keyDown = e => {
		if (e.code === 'Escape') {
			this.props.onClose();
		}
	};

	handleOverlayClick = ({ currentTarget, target }) => {
		if (currentTarget.nodeName === target.nodeName) {
			this.props.onClose();
		}
		
	};

	render() {
		return createPortal(
			<Overlay onClick={this.handleOverlayClick}>
				<ModalWrapper>
					<img src={this.props.src} alt={this.props.alt} />
				</ModalWrapper>
			</Overlay>,
			modalRoot
		);
	}
}

export default Modal;

Modal.propTypes = {
	alt: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
};