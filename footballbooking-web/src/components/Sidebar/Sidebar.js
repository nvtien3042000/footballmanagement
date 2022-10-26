import React from 'react';
import './sidebar.css'
import PropTypes from 'prop-types';

Sidebar.propTypes = {
    onClickPitchType: PropTypes.func,
    onClickPrice: PropTypes.func
}

Sidebar.defaultProps = {
    onClickPitchType: null,
    onClickPrice: null
}

function Sidebar(props) {
    function handleClickPitch(pitchTypeId) {
        if (onClickPitchType) {
            onClickPitchType(pitchTypeId)
        }
    }

    function handleClickPrice(costMin, costMax) {
        if (onClickPrice) {
            onClickPrice(costMin, costMax)
        }
    }

    const { onClickPitchType, onClickPrice } = props
    return (
        <div className="collapse navbar-collapse navbar-ex1-collapse">
            <ul className="nav navbar-nav side-nav nav-pitch">
                <li>
                    <div className='side-title'>Sân</div>
                </li>
                <li>
                    <div className='link-sidebar-item' onClick={() => handleClickPitch('1')}><i className="fa fa-angle-double-right icon-right" /> Sân 5</div>
                </li>
                <li>
                    <div className='link-sidebar-item' onClick={() => handleClickPitch('2')}><i className="fa fa-angle-double-right icon-right" /> Sân 7</div>
                </li>
                <li>
                    <div className='link-sidebar-item' onClick={() => handleClickPitch('3')}><i className="fa fa-angle-double-right icon-right" /> Sân 11</div>
                </li>
            </ul>

            <ul className="nav navbar-nav side-nav nav-price">
                <li>
                    <div className='side-title'>Giá</div>
                </li>
                <li>
                    <div className='link-sidebar-item' onClick={() => handleClickPrice(100000, 200000)}><i className="fa fa-angle-double-right icon-right" /> 100.000-200.000 VNĐ</div>
                </li>
                <li>
                    <div className='link-sidebar-item' onClick={() => handleClickPrice(200000, 300000)}><i className="fa fa-angle-double-right icon-right" /> 200.000-300.000 VNĐ</div>
                </li>
                <li>
                    <div className='link-sidebar-item' onClick={() => handleClickPrice(300000, 400000)}><i className="fa fa-angle-double-right icon-right" /> 300.000-400.000 VNĐ</div>
                </li>
                <li>
                    <div className='link-sidebar-item' onClick={() => handleClickPrice(400000, 500000)}><i className="fa fa-angle-double-right icon-right" /> 400.000-300.000 VNĐ</div>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;