import React from 'react';
import './Modal.css';

// @prop bool {open} - true to show the modal, false to hide
// @prop string {header} - header text to show in the modal
// @prop string {onClose} - callback to call when close() button pressed.
// @prop string {closeMsg} - close button text
class Modal extends React.Component {
    render() {
        return this.props.open ? (
            <div>
                <div className="modal-background" />
                <div role="dialog" className="modal-dialog">
                    <header>
                        <span>{this.props.header}</span>
                        <button
                            onClick={() => this.props.onClose()}
                            type="button"
                            aria-label="close"
                        >
                            {this.props.closeMsg ? this.props.closeMsg : 'CLOSE'}
                        </button>
                    </header>
                <div className="modal-content">{this.props.children}</div>
                </div>
                </div>
        ) : null;
    }
}


// Old style Modal
// Where the modal was handling the portal creation.

// A Modal that's an abstraction around the React16 createPortal API.
// Accepts the root DOM node into which we render this modal.
/* class OldModal extends React.Component {
 *     constructor({modalRoot}, ...props) {
 *         super(props);
 *
 *         // Create an element into which to render this portal
 *         this.el = document.createElement('div');
 *         this.modalRoot = modalRoot;
 *     }
 *     componentDidMount() {
 *         // Stick our rendered portal into the specified modal root component
 *         this.modalRoot.appendChild(this.el);
 *         console.log(`OldModal::componentDidMount()`);
 *         // Hmm, maybe here need to trigger the actual animation somehow?
 *     }
 *     componentWillUpdate() { // XXX/mm
 *         console.log(`OldModal::componentWillUpdate()`);
 *     }
 *     componentWillUnmount() {
 *         this.modalRoot.removeChild(this.el);
 *         console.log(`OldModal::componentWillUnmount()`);
 *     }
 *     componentDidUnmount() { // XXX/mm
 *         console.log(`OldModal::componentDidUnmount()`);
 *     }
 *
 *     render() {
 *         console.log(`OldModal::render()`);
 *         return ReactDOM.createPortal(this.props.children, this.el);
 *     }
 * }
 * */
export default Modal;
