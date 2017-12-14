import React from 'react';
import './GameOver.css';

class GameOver extends React.Component {
    // React point: why in
    // GameOver, componentDidMount() gets called but in
    // Modal, componentDidUpdate() gets called only?
    //
    // Remember: componentDidMount() is called (after render()) after component was created.
    // componentDidMount actually is called in Modal, but at the Game Componenent creation, and only once.
    // componentDidUpdate() is called if the component existed already and say, is being re-rendered.
    // The dialog is open or closed, and once closed GameOver disappears from the React tree
    // since Modal only _conditionally_ renders its children.
    // The difference between GameOver and Modal is Modal is always render()'ed (ie in the React tree)
    // but sometimes returns null as the JSX for what to put in the DOM.
    // Therefore Modal componentDidUpdate() gets called on updates since it never leaves the React tree.
    //
    // Check: looks like components don't ever get both {Will,Did}Mount and {Will,Did}Update in the same cycle?
    //
    // Therefore if we set set an animation timeout it has to be:
    // in DidMount in GameOver, called after render().
    // in DidUpdate in Model, also called after render().
    componentDidMount() {
        console.log(`GameOver::componentDidMount()`);
    }

    render() {
        console.log(`GameOver::render()`);
        return (
            <div className="game-over">
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
        );
    }

    componentWillMount() {
        console.debug(`GameOver::componentWillMount()`);
    }
    componentWillUpdate() {
        console.debug(`GameOver::componentWillUpdate()`);
    }
    componentDidUpdate() {
        console.debug(`GameOver::componentDidUpdate()`);
    }
    componentWillUnmount() {
        console.debug(`GameOver::componentWillUnmount()`);
    }
}

export default GameOver;
