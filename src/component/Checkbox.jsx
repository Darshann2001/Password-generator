import React from 'react';

const Checkbox = (props) => {
    const { value, onChange } = props;

    const checkboxStyle = {
        color: 'white',
        
    }
    return (
        <div>
            <input className={checkboxStyle} type="checkbox" checked={value} onChange={onChange} />
        </div>
    );
}

export default Checkbox;
