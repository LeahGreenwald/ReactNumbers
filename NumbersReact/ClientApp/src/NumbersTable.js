import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { produce } from 'immer';
import NumberRow from './NumberRow';
import SelectedNumberRow from './SelectedNumbers';

class NumbersTable extends React.Component {
    state = {
        numbers: [],
        selectedNumbers: [],
        lockedNumbers: []
    }

    AddNumber = () => {
        const number = (this.generateRandomNumber(1, 1000));
        const nextState = produce(this.state, draftState => {
            draftState.numbers.push(number)
        });
        this.setState(nextState);


    }

    generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    isSelected = num => {
        const selected = this.state.selectedNumbers.find(n => n === num);
        return !!selected;
    }

    selectClick = num => {
        const nextState = produce(this.state, draftState => {
            draftState.selectedNumbers.push(num)
        });
        this.setState(nextState);
    }

    removeSelectClick = num => {
        const selected = this.state.selectedNumbers.filter(n => n !== num)
        const nextState = produce(this.state, draftState => {
            draftState.selectedNumbers = selected
        });
        this.setState(nextState);
    }

    ShowSelectedNumbers = () => {
        return (<div className='row jumbotron'>
            <div className='col-md-6 col-md-offset 3'>
                <h3>Selected numbers</h3>
                <ul className='list-group'>
                    {this.state.selectedNumbers.map((num, i) => {
                        return (<SelectedNumberRow
                            number={num}
                            key={i}
                            lockButton={() => this.lockButton(num)}
                            unlockButton={() => this.unlockButton(num)}
                            isLocked={this.isLocked(num)}
                        />)
                    })}
                </ul>
            </div>
        </div>)
    }

    lockButton = (num) => {
        const nextState = produce(this.state, draftState => {
            draftState.lockedNumbers.push(num);
        });
        this.setState(nextState);
    }

    unlockButton = (num) => {
        const locked = this.state.lockedNumbers.filter(n => n !== num)
        const nextState = produce(this.state, draftState => {
            draftState.lockedNumbers = locked
        });
        this.setState(nextState);
    }

    isLocked = (num) => {
        const locked = this.state.lockedNumbers.find(n => n === num);
        return !!locked;
    }

    render() {
        return (
            <div className='container'>
                <button className='btn btn-primary' onClick={this.AddNumber}>Add</button>
                <table className='table table-hover table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Add/Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.numbers.map((num, i) => {
                            return <NumberRow
                                key={i}
                                number={num}
                                isSelected={this.isSelected(num)}
                                selectClick={() => this.selectClick(num)}
                                removeSelectClick={() => this.removeSelectClick(num)}
                                isLocked={this.isLocked(num)}
                            />
                        })}
                    </tbody>
                </table>
                {!!this.state.selectedNumbers.length && this.ShowSelectedNumbers()}
            </div>
        );
    }
}

export default NumbersTable;