import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

class NumberRow extends React.Component {
    render() {
        const { number, isSelected, removeSelectClick, selectClick, isLocked } = this.props;
        return (
            <tr>
                <td>{number}</td>
                <td>
                    {isLocked ?
                        (<button className={`btn btn-${isSelected ? 'danger' : 'primary'}`}
                            disabled
                            onClick={isSelected ? removeSelectClick : selectClick}>
                            {isSelected ? 'Remove from selection' : 'Add to selection'}
                        </button>) :
                        (<button className={`btn btn-${isSelected ? 'danger' : 'primary'}`}
                            onClick={isSelected ? removeSelectClick : selectClick}>
                            {isSelected ? 'Remove from selection' : 'Add to selection'}
                        </button>)}
                </td>
            </tr>
        );
    }
};

export default NumberRow;