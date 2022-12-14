import React, { useEffect, useState } from 'react';
import pitchApi from '../api/pitchApi';
import Card from '../components/Card/Card';
import PropTypes from 'prop-types';
import Search from '../components/Search/Search';
import { Route, Routes } from 'react-router-dom';
import Pagination from '../components/Paganation/Pagination';
import Sidebar from '../components/Sidebar/Sidebar';
import UtilsPaginations from '../utils/UtilsPagination'

Home.propTypes = {
    // pitchs: PropTypes.array,
    // onPitchClick: PropTypes.func,
    onPitchDetail: PropTypes.func,
};

Home.defaultProps = {
    // pitchs: [],
    // onPitchClick: null,
    onPitchDetail: null
}

function Home(props) {

    const { onPitchDetail } = props

    const [pitchs, setPitchs] = useState([]);
    const [filter, setFilter] = useState({
        page: 1,
        limit: 3
    });
    const [pageTotal, setPageTotal] = useState({})

    function handleFilterSubmit(formValues) {
        const filterNew = filter
        const searhByNameOrAddress = formValues.searchTerm
        setFilter({
            ...filterNew,
            page: 1,
            searhByNameOrAddress,
        })
    }

    function handlePitchClick(pitch) {
        if (onPitchDetail) {
            onPitchDetail(pitch.pitchId)
            console.log(pitch.pitchId + " :: ")
        }
        console.log(pitch.pitchId + " : ")
    }

    function handleClickPrice(costMin, costMax) {
        console.log(costMin + " : " + costMax)
        const filterNew = filter
        setFilter({
            ...filterNew,
            costMin,
            costMax
        })
    }

    function handleClickPitch(pitchTypeId) {
        const filterNew = filter
        setFilter({
            ...filterNew,
            pitchTypeId
        })
    }

    function handleClickPagination(type) {
        const filterNew = filter
        let page = filter.page
        if (type === 'next') {
            if (pitchs.length === filter.limit && page < pageTotal
            ) {
                page = page + 1
            }
        } else {
            if (filter.page !== 1) {
                page = filter.page - 1
            }
        }
        console.log(page)
        setFilter({
            ...filterNew,
            page
        })
    }

    useEffect(() => {
        const fetchPitchsList = async () => {
            const response = await pitchApi.getAll(filter);
            setPitchs(response.data)
            setPageTotal(UtilsPaginations.getPageTotal(response.itemTotal))
        }
        fetchPitchsList();
    }, [filter])
    return (
        <div className='main-container'>
            <Sidebar pitchTypeId={filter?.pitchTypeId} costMin={filter?.costMin} onClickPitchType={handleClickPitch} onClickPrice={handleClickPrice} />
            < div className="container mf-30 p-0" >
                <Search onFilterSubmit={handleFilterSubmit} />
                {pitchs.map(p => (
                    <Card key={p.pitchId} pitch={p} onPitchClick={handlePitchClick} />
                ))}
                <Pagination pageTotal={pageTotal} currentPage={filter.page} onClickPagination={handleClickPagination} />
            </div>
        </div>
    );
}

export default Home;