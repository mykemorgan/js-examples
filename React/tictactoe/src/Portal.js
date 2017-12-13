import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

// A Portal for a the WIP Modal, hopefully with animations
// An abstraction around the React16 createPortal API...

// @prop {portalRoot} - The root DOM node into which we render this Portal.
class Portal extends React.Component {
    constructor({portalRoot}, ...props) {
        super(props);

        // Create an element into which to render this portal
        this.container = document.createElement('div');
        this.portalRoot = portalRoot;
    }
    componentDidMount() {
        // Stick our rendered portal into the specified modal root component
        this.portalRoot.appendChild(this.container);
        console.log(`Portal::componentDidMount()`);
        // Hmm, maybe here need to trigger the actual animation somehow?
    }
    componentWillUnmount() {
        this.portalRoot.removeChild(this.container);
        console.log(`Portal::componentWillUnmount()`);
    }

    componentDidUnmount() {
        console.log(`Portal::componentDidUnmount()`);
    }

    componentWillUpdate() {
        console.log(`Portal::componentWillUpdate()`);
    }

    render() {
        console.log(`Portal::render()`);
        return ReactDOM.createPortal(<Modal {...this.props} />, this.container);
    }
}

export default Portal;
