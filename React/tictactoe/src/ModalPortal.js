import React from 'react';
import ReactDOM from 'react-dom';
import Portal from './Portal';
import Modal from './Modal';

// ModalPortal: a specialized portal, which is a modal dialog rendered into a portal.

// @prop {portalRoot} - The root DOM node into which we render this ModalPortal.
class ModalPortal extends Portal {
    render() {
        console.debug(`ModalPortal::render()`);
        return ReactDOM.createPortal(<Modal {...this.props} />, this.container);
    }

    // ----------------------------------------------------------------------
    // Below is just stuff I'm curious about
    // ----------------------------------------------------------------------
    componentWillUpdate() {
        console.debug(`ModalPortal::componentWillUpdate()`);
    }
    componentWillMount() {
        console.debug(`ModalPortal::componentWillMount()`);
    }
}

export default ModalPortal;
