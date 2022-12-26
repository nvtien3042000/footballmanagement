import React, { Component, useState } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import "react-datepicker/dist/react-datepicker.css";
import "./ReactDayPicker.css"

ReactDayPicker.propTypes = {
    onSubmitFind: PropTypes.func
};

ReactDayPicker.defaultProps = {
    onSubmitFind: null
}

function ReactDayPicker(props) {
    const [date, setDate] = useState(new Date())
    const { onSubmitFind } = props
    const minDate = new Date();
    function handleChange(date) {
        setDate(date)
    }
    function onFormSubmit(e) {
        e.preventDefault();
        onSubmitFind(date)

    }

    return (
        <form onSubmit={onFormSubmit}>
            <div className="form-group">
                <DatePicker
                    selected={date}
                    onChange={handleChange}
                    name="startDate"
                    dateFormat="MM/dd/yyyy"
                    minDate={minDate}
                />
            </div>

            <button type="button" className="btn btn-info btn-find" onClick={onFormSubmit}>Tìm</button>
        </form >
    );
}

export default ReactDayPicker;