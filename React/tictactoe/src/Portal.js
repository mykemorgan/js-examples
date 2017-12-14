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
        console.log(`Portal::componentDidMount() - appending container to portalRoot`);
        // Stick our rendered portal into the specified modal root component
        this.portalRoot.appendChild(this.container);
    }
    componentWillUnmount() {
        console.log(`Portal::componentWillUnmount() - removing child from portalRoot`);
        this.portalRoot.removeChild(this.container);
    }

    render() {
        console.log(`Portal::render()`);
        return ReactDOM.createPortal(<Modal {...this.props} />, this.container);
    }

    // ----------------------------------------------------------------------
    // Below is just stuff I'm curious about
    // ----------------------------------------------------------------------
    componentWillUpdate() {
        console.debug(`Portal::componentWillUpdate()`);
    }
    componentWillMount() {
        console.debug(`Portal::componentWillMount()`);
    }
}

export default Portal;
