import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

// A Portal abstraction around a Modal. Rendered into a specified DOM node.
// An abstraction around the React16 createPortal API...

// @prop {portalRoot} - The root DOM node into which we render this Portal.
class Portal extends React.Component {
    constructor(props) {
        super(props);
        let {portalRoot} = props;

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

    render() {
        console.log(`Portal::render()`);
        return ReactDOM.createPortal(<Modal {...this.props} />, this.container);
    }

    // ----------------------------------------------------------------------
    // Below is just stuff I'm curious about
    // ----------------------------------------------------------------------
    componentWillUpdate() {
        console.log(`Portal::componentWillUpdate()`);
    }
}

export default Portal;
