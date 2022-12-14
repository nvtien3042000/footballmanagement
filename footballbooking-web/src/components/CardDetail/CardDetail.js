import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './cardDetail.css'
import '../../assets/css/base.css';
import { Link, useNavigate } from 'react-router-dom';
import ReactDatePicker from '../DayPicker/ReactDayPicker';
import pitchApi from '../../api/pitchApi';

CardDetail.propTypes = {
    pitchDetail: PropTypes.object
};

CardDetail.defaultProps = {
    pitchDetail: null
}


function CardDetail(props) {

    const { pitchDetail } = props
    const [pitch, setPitch] = useState(pitchDetail)
    const [paramesFilter, setParamesFilter] = useState({})
    const [freeTimeSlot, setFreeTimeSlot] = useState([])
    const [orderTime, setOrderTime] = useState('');
    const [pitchName, setPitchName] = useState('');
    const [miniPitchId, setMiniPitchId] = useState([]);
    const [miniPitch, setMiniPitch] = useState([]);
    const [booking, setBooking] = useState({

    })
    const navigate = useNavigate();




    function handleFindPitchByDate(d) {
        console.log("a: " + d)
        let bookingDate = d.getFullYear() + "/" + ((parseInt((d.getMonth()) + 1) < 10) ? `0${(d.getMonth()) + 1
            }` : ((d.getMonth()) + 1)) + "/" + ((parseInt((d.getDate())) < 10) ? `0${(d.getDate())
                }` : ((d.getDate())))
        console.log(bookingDate)
        let params = paramesFilter
        setParamesFilter({
            ...params,
            bookingDate
        })
    }

    function handleCheckedTime(id) {
        console.log(document.getElementById(id).innerHTML)
    }

    function handleFreeTimeSlot(pitchId, pitchTypeId, bookingDate, timeStart, timeEnd, pitchDetailId) {
        setParamesFilter({
            pitchId,
            pitchTypeId,
            bookingDate,
            timeStart,
            timeEnd,
            pitchDetailId
        })
    }

    useEffect(() => {
        const fetchFreeTimeSlot = async () => {
            if (paramesFilter.pitchTypeId != null) {
                const response = await pitchApi.getFreeTimeSlot(paramesFilter);
                setFreeTimeSlot(response.data)
            }
        }
        fetchFreeTimeSlot();
    }, [paramesFilter])

    useEffect(() => {
        const fetchFreeTimeSlot = async () => {
            if (miniPitchId.length > 0) {
                const resp = await pitchApi.getMiniPitchById({ 'miniPitchId': miniPitchId });
                console.log("AAAAAAAAAAAAAA")
                console.log(resp.data)
                setMiniPitch(resp.data)
            }
        }
        fetchFreeTimeSlot();
    }, [miniPitchId])

    function handleOnClickDetail(idType, cost, pitchId, pitchName, timeStart, timeEnd, pitchDetailId) {
        let pitch = idType
        let status = hidden.status
        if (hidden.pitch === pitch && hidden.cost === cost) {
            status = !hidden.status
        } else {
            status = true
        }
        setHidden({
            pitch: pitch,
            cost: cost,
            status: status
        })
        setOrderTime("")
        let d = new Date()
        let date = d.getFullYear() + "/" + ((parseInt((d.getMonth()) + 1) < 10) ? `0${(d.getMonth()) + 1
            }` : ((d.getMonth()) + 1)) + "/" + ((parseInt((d.getDate())) < 10) ? `0${(d.getDate())
                }` : ((d.getDate())))
        handleFreeTimeSlot(pitchId, idType, date, timeStart, timeEnd, pitchDetailId)
        setPitchName(pitchName)
        setMiniPitchId(miniPitchId)
        const bookingCur = booking
        setBooking({
            ...bookingCur,
            "bookingDate": date
        })
    }

    function handleClickTime(time, miniPitchId) {
        console.log("Time: " + miniPitchId + ":::" + miniPitchId[0])
        setOrderTime(time)
        setMiniPitchId(miniPitchId)
        const bookingCur = booking
        console.log("=aaaa=")
        console.log(paramesFilter)
        setBooking({
            ...bookingCur,
            "hourStart": time,
            "miniPitchId": miniPitchId[0],
            bookingDate: paramesFilter.bookingDate
        })
    }

    function handleOnClickOrderPitch() {


        const pitchBooking = async () => {
            if (localStorage.getItem('token') != null) {
                const response = await pitchApi.booking(booking)
                if (response.success === true) {
                    navigate('/bookingdetail')
                } else {
                    document.getElementById('notification').classList.remove('hide')
                    document.getElementById('notification').classList.add('show')
                    function hideMessage() {
                        document.getElementById('notification').classList.add('hide')
                        document.getElementById('notification').classList.remove('show')

                    }
                    setTimeout(hideMessage, 5000)
                }
            }
        }
        if (localStorage.getItem('token') != null) {
            pitchBooking();
        } else {
            navigate('/login')
            console.log("HAHA")
        }

    }

    function handleOnChangeMiniPitch(e) {
        console.log(e.target.value + "jjjjjjjjjjjjjjj")
        const bookingCur = booking
        setBooking({
            ...bookingCur,
            "miniPitchId": e.target.value
        })
    }

    const [hidden, setHidden] = useState({
        pitch: '0',
        cost: 0,
        status: false
    })

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                <div className='card-detail'>
                    <div className="row">
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 card-information">
                            <div className='name b-b card-info-item'>
                                {pitchDetail.name}
                                <span style={{ color: 'red' }}>{(hidden.status == true) ? "(" + hidden.cost + ")VN??" : ''}</span>
                            </div>
                            <div className='address b-b card-info-item'>
                                {(pitchDetail.address != undefined) ? pitchDetail.address.number + " " + pitchDetail.address.street + ", " + pitchDetail.address.commune + ", " + pitchDetail.address.district + ", " + pitchDetail.address.city : ''}
                            </div>
                            {(pitchDetail.detail != undefined) ?
                                pitchDetail.detail.map((p, index) => (
                                    <div key={index}>
                                        {console.log(p.pitchTypeName)}
                                        <div className='category b-b'>

                                            <div className='info-pitch-title'>
                                                <span className='time time-detail'>Gi?? thu?? {p.pitchTypeName}</span>
                                            </div>
                                            <div className={(hidden.pitch == p.pitchTypeId && hidden.status == true) ? '' : 'hidden-time-order'} id={pitch.pitchTypeId}>
                                                <div className='info-pitch-detail'>
                                                    <ReactDatePicker onSubmitFind={handleFindPitchByDate} />
                                                    <div className='time-order'>
                                                        {freeTimeSlot.map((t, index) => {
                                                            if (t.hasPitch) {
                                                                if (t.timeStart === orderTime) {
                                                                    return (
                                                                        <div key={index} className='time-order-free'
                                                                            style={{ background: '#999' }}
                                                                            onClick={() => handleClickTime(t.timeStart, t.miniPitchId)}>
                                                                            {t.timeStart}
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <div key={index} className='time-order-free' onClick={() => handleClickTime(t.timeStart, t.miniPitchId)}>
                                                                            {t.timeStart}
                                                                        </div>
                                                                    )
                                                                }
                                                            } else {
                                                                return (
                                                                    <div key={index} className='time-order-free' style={{ background: 'red', color: 'white' }}>
                                                                        {t.timeStart}
                                                                    </div>
                                                                )
                                                            }

                                                        })}
                                                    </div>
                                                </div>
                                                <button className='button-detail button1 view-search-detail' data-toggle="modal" data-target="#exampleModal">
                                                    <span>?????t s??n</span>
                                                </button>
                                            </div>
                                        </div>
                                        {
                                            p.timeSlots?.map((t, index) => (
                                                <div key={index} className='price-time b-b detail-time-order'>
                                                    <div className='info-pitch-title'>
                                                        <span className='time time-detail'>{t.timeStart} - {t.timeEnd} Th??? {t.dayOfWeekStart + 1} - {(t.dayOfWeekEnd + 1) == 8 ? 'CN' : (t.dayOfWeekEnd + 1)}</span>
                                                        <span>
                                                            <span className='price mr-30'>{t.cost}VN??</span>
                                                            <button className='button-detail button1'
                                                                onClick={() => handleOnClickDetail(p.pitchTypeId, t.cost, pitchDetail.pitchId, p.pitchTypeName, t.timeStart, t.timeEnd, t.pitchDetailId)}>
                                                                <span>Chi ti???t ?????t s??n</span>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )) : ''}
                            <div className='phone-number b-b card-info-item'>
                                <span className='phone-number-title'>S??? ??i???n tho???i:</span>
                                <span className='phone-number-value'>0356112087</span>
                            </div>
                        </div>

                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 card-image">
                            <div className=''>
                                {console.log(pitchDetail.coverAvatar)}
                                <img className='card-image-link' src={pitchDetail.coverAvatarLink} />
                            </div>
                            <div>
                                <h1>{pitchDetail.name}</h1>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Th??ng tin ?????t s??n ( {pitchDetail.name} )</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>Lo???i s??n</div>
                            <div>{pitchName}</div>
                        </div>
                        <div className="modal-body">
                            <div>Gi?? ti???n</div>
                            <div>{hidden.cost}</div>
                        </div>
                        <div className="modal-body">
                            <div>Th???i gian b???t ?????u(1h)</div>
                            <div>{orderTime}</div>
                        </div>
                        <div className="modal-body">
                            S??n s???
                            <select onChange={handleOnChangeMiniPitch}>
                                {miniPitch?.map(s => (
                                    <option key={s.miniPitchId} value={s.miniPitchId}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">????ng</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleOnClickOrderPitch}>?????t s??n</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CardDetail;