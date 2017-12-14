import React from 'react';


class GameOver extends React.Component {
    // XXX/mm Why componentDidMount() get called here but in Modal componentWillUpdate() gets called?
    // Thus if we set set an animation timeout it has to be here.
    // This gets called after render().
    componentDidMount() {
        console.log(`GameOver::componentDidMount()`);
    }
    componentWillUpdate() {
        console.log(`GameOver::componentWillUpdate()`);
    }

    render() {
        console.log(`GameOver::render()`);
        return (
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
        );
    }
}

export default GameOver;
