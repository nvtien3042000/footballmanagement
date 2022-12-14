import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './bookingDetail.css'
import { Link } from 'react-router-dom';
import pitchApi from '../../api/pitchApi';
import Pagination from '../Paganation/Pagination';
import UtilsPagination from '../../utils/UtilsPagination';

BookingDetail.propTypes = {

};

function BookingDetail(props) {

    const [listBooking, setListBooking] = useState([])
    const [status, setStatus] = useState(true)
    const [pageTotal, setPageTotal] = useState({})
    const [filter, setFilter] = useState({
        page: 1,
        limit: 5
    });
    const [currentListBooking, setCurrentListBooking] = useState([])

    function handleClickPagination(type) {
        const filterNew = filter
        let page = filter.page
        if (type === 'next') {
            if (currentListBooking.length === filter.limit) {
                page = page + 1
            }
        } else {
            if (filter.page !== 1) {
                page = filter.page - 1
            }
        }
        console.log(page + "---")
        setFilter({
            ...filterNew,
            page
        })
        setCurrentListBooking(listBooking.slice((page - 1) * 5, page * 5))
    }

    const handleOnClickDeletePitch = async (bookingId) => {
        const response = await pitchApi.cancelBooking(bookingId)
        if (response.success === true) {
            let statusnew = !status
            setStatus(statusnew)
        }

        console.log(bookingId)
        console.log("==")
        console.log(response)
    }

    useEffect(() => {
        const bookingInfor = async () => {
            const response = await pitchApi.bookingInfor()
            const bookingAccept = response.data.filter(e => e.status !== 'Chờ xác nhận').map(e => e.bookingId)
            console.log(bookingAccept + "+++")
            const newBooking = response.data.filter(e => (bookingAccept.includes(e.bookingId) && e.status !== 'Chờ xác nhận') || !bookingAccept.includes(e.bookingId))
            newBooking.reverse()
            setListBooking(newBooking)
            setCurrentListBooking(newBooking.slice(0, 5))
            setPageTotal(UtilsPagination.getPageTotalCondition(newBooking.length, 5))
        }
        bookingInfor();
        console.log("bookingInfor")

    }, [status])

    return (
        <div className='container mt-50'>
            <div className="card-booking-detail">
                <h2 style={{ marginBottom: '30px' }}>Danh sách sân đặt</h2>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className='title-booking'>Tên sân</th>
                            <th className='title-booking'>Thời gian</th>
                            <th className='title-booking'>Loại sân</th>
                            <th className='title-booking'>Tiền</th>
                            <th className='title-booking'>Trạng thái</th>
                            <th className='title-booking'>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentListBooking?.map((e, index) => (
                            <tr key={index}>
                                <td className='item-booking'>{e.pitchName}</td>
                                <td className='item-booking'>{e.time}</td>
                                <td className='item-booking'>{e.pitchTypeName}</td>
                                <td className='item-booking'>{e.cost}VNĐ</td>
                                <td className='item-booking'><span className={(e.status === 'Chờ xác nhận') ? 'warning' : (e.status === 'Đã hủy') ? 'cancel' : (e.status === 'Từ chối yêu cầu') ? 'exit' : 'accept'}>{e.status}</span></td>
                                <td>
                                    <button className={(e.status === 'Chờ xác nhận') ? 'btn btn-large btn-block btn-danger' : 'btn btn-large btn-block btn-danger disabled'} data-toggle="modal" data-target={`#exampleModalDetail${e.bookingId}`} >
                                        <span>Hủy</span>
                                    </button>
                                    {(e.status === "Chờ xác nhận") ?
                                        <div className="modal fade" id={`exampleModalDetail${e.bookingId}`} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Hủy Sân</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div>Bạn có muốn hủy sân {e.bookingId} không?</div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => handleOnClickDeletePitch(e.bookingId)}>Hủy sân</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : ""}
                                </td>

                            </tr>

                        ))}
                    </tbody>
                </table>
                <Pagination pageTotal={pageTotal} currentPage={filter.page} onClickPagination={handleClickPagination} />


            </div>

        </div >
    );
}

export default BookingDetail;