import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/base.css';
import './pagination.css'

Pagination.propTypes = {
    onClickPagination: PropTypes.func
};

Pagination.defaultProps = {
    onClickPagination: null
};

function Pagination(props) {
    const { pageTotal, currentPage, onClickPagination } = props
    function handleClickPage(type) {
        if (onClickPagination) {
            onClickPagination(type)
            console.log(type)
        }

    }
    return (
        <div className='pagination'>
            {console.log(currentPage + " - " + pageTotal)}
            <button className="button button--skoll pagination-left pagination-right" onClick={() => handleClickPage('pre')}>
                <span className='glyphicon glyphicon-arrow-left'>
                </span>
            </button>
            {(currentPage == pageTotal && currentPage - 2 > 0) ?
                <button className="button button--skoll">
                    <span className='glyphicon'>{currentPage - 2}
                    </span>
                </button>
                : ""}
            {(currentPage - 1) > 0 ?
                <button className="button button--skoll">
                    <span className='glyphicon'>{currentPage - 1}
                    </span>
                </button>
                : ""}
            <button className="button button--skoll color-defaul">
                <span className='glyphicon'>{currentPage}
                </span>
            </button>
            {(currentPage + 1) <= pageTotal ?
                <button className="button button--skoll">
                    <span className='glyphicon'>{currentPage + 1}
                    </span>
                </button>
                : ""
            }
            {(currentPage == 1 && currentPage + 2 <= pageTotal) ?
                <button className="button button--skoll">
                    <span className='glyphicon'>{currentPage + 2}
                    </span>
                </button>
                : ""}

            <button className="button button--skoll pagination-left" onClick={() => handleClickPage('next')}>
                <span className='glyphicon glyphicon-arrow-right'>
                </span>
            </button>
        </div>
    );
}

export default Pagination;