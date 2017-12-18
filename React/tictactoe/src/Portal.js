import React from 'react';

// An abstract Portal. Concrete descendents will render a React Component
// into a specified DOM node.
//
// This is basically an abstraction around the React16 createPortal API...
//
// @prop {portalRoot} - The root DOM node into which we render this Portal.
class Portal extends React.Component {
    constructor(props) {
        super(props);
        let {portalRoot} = props;

        // Create an element into which to render this portal
        this.container = document.createElement('div');
        this.portalRoot = portalRoot;
        console.debug(`constructed Portal`);
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

    // ----------------------------------------------------------------------
    // render() to be implemented by concrete  descendents,
    // depending on what class will be rendered into the portal. Example:
    //
    // render() { return ReactDOM.createPortal(<Modal {...this.props} />, this.container); }
    // ----------------------------------------------------------------------

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
