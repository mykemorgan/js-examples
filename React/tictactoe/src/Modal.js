import React from 'react';
import ReactDOM from 'react-dom';

// A Modal that's an abstraction around the React16 createPortal API.
// Accepts the root DOM node into which we render this modal.
class Modal extends React.Component {
    constructor({modalRoot}, ...props) {
        super(props);

        // Create an element into which to render this portal
        this.el = document.createElement('div');
        this.modalRoot = modalRoot;
    }
    componentDidMount() {
        // Stick our rendered portal into the specified modal root component
        this.modalRoot.appendChild(this.el);
    }
    componentWillUnount() {
        this.modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

export default Modal;
