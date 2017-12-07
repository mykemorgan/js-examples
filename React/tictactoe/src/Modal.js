import React from 'react';
import ReactDOM from 'react-dom';

// A Modal that's an abstraction around the React16 createPortal API.
// Need the root DOM node to which we attach this modal.
// TODO - Hack that for now by grabbing it directly. Really should be passed in props?
// TODO - Probably is time to split all these Components into their own files?
const modalRoot = document.getElementById('modal-root');
class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.el = document.createElement('div');
    }
    componentDidMount() {
        modalRoot.appendChild(this.el);
    }
    componentWillUnount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

export default Modal;
