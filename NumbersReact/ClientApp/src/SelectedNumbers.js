import React from 'react';

class SelectedNumberRow extends React.Component {
    render() {
        const { number, key, isLocked, unlockButton, lockButton  } = this.props
        return (
            <li key={key} className='list-group-item'>
                {number}
                <button className='btn btn-success'
                onClick={isLocked ? unlockButton : lockButton}>
                    {isLocked ? 'Unlock' : 'Lock'}
                </button>
            </li>
        );
    }
}

export default SelectedNumberRow;