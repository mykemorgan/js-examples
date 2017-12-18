import React from 'react';
import './Game.css';

import ModalPortal from './ModalPortal';
import GameOver from './GameOver';
import Board from './Board';

// Determine if anyone has won yet.
// Returns 'X' or 'O' if one of them a winner, null otherwise.
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function calculateGameOver(squares) {
    return squares.indexOf(null) === -1;
}

// TicTacToe master game controller Component
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialGameState();
    }

    initialGameState() {
        return {
            history: [ {
                squares: Array(9).fill(null)
            }],
            moveNumber: 0,
            xIsNext: true,
            showGameOver: false
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.moveNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            // Don't let people go in an occupied square, or go anywhere after there is a winner.
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState(
            {
                history: history.concat([{
                    squares: squares
                }]),
                moveNumber: history.length,
                xIsNext: !this.state.xIsNext
            }
        );
    }

    jumpToMove(move) {
        this.setState({
            moveNumber: move,
            xIsNext: (move % 2) === 0
        });
    }

    resetGame() {
        console.log(`Game::resetGame()`);
        this.setState(this.initialGameState());
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.moveNumber];
        const winner = calculateWinner(current.squares);
        const draw = calculateGameOver(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? `Go to move ${move}` : `Go to game start`;
            return (
                    <li key={`move${move}`}>
                    <button onClick={() => this.jumpToMove(move)}>{desc}</button>
                    </li>
            );
        });

        console.log(`Game::render()`);

        let status;
        if (winner) {
            status = `We have a winner! Congrats to: ${winner}`;
        } else if (draw) {
            status = `Game over with no winner!`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }
        let { showGameOver } = this.state;
        if (winner || draw) {
            showGameOver = true;
        }

        // New style Modal WIP to get animations to work
        return (
            <div className="game">
            <div className="game-board">
              <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
            <div>
              <button className="show-portal"
                      onClick={() => this.setState({showGameOver: !showGameOver})}>
              Test Show Portal
              </button>
            </div>
            <ModalPortal open={showGameOver}
                    portalRoot={document.getElementById('modal-root')}
            >
              <GameOver header="Game Status Update" closeMsg="Reset Game Portal" onClose={() => this.resetGame()}>
                <span>Game Over!</span><br />
                <span>{status}</span><br />
                <button onClick={() => this.resetGame()}>Reset Game Portal Button</button>
              </GameOver>
            </ModalPortal>
            </div>
        );
    }
}

export default Game;
