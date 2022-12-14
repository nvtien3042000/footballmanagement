import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import './listUser.css'
import Pagination from '../Paganation/Pagination';
import adminApi from '../../api/adminApi';
import UtilsPaginations from '../../utils/UtilsPagination'

ListUser.propTypes = {

};

function ListUser(props) {

    const [filter, setFilter] = useState({
        page: 1,
        limit: 5,
        searchByNameOrPhone: "",
        roleId: 1,
    })

    const [pageTotal, setPageTotal] = useState({})

    const [checkLock, setCheckLock] = useState(true)

    const [users, setUsers] = useState([])

    function handleSearch(formValues) {
        const filterNew = filter
        const searchByNameOrPhone = formValues.searchTerm
        setFilter({
            ...filterNew,
            page: 1,
            searchByNameOrPhone
        })
    }

    function handleClickPagination(type) {
        const filterNew = filter
        let page = filter.page
        if (type === 'next') {
            if (users.length === filter.limit && page < pageTotal) {
                page = page + 1
            }
        } else {
            if (filter.page !== 1) {
                page = filter.page - 1
            }
        }
        console.log(page + " --- " + users.length)
        setFilter({
            ...filterNew,
            page
        })
    }

    function handleToggleLock(userId) {
        const updateStatusUser = async () => {
            const response = await adminApi.updateStatusAccount(userId);
            if (response.success) {
                const isCheck = !checkLock
                setCheckLock(isCheck)
            }
        }
        updateStatusUser();
    }

    function handleChangeRole(e) {
        const filterNew = filter
        const roleId = e.target.value
        setFilter({
            ...filterNew,
            roleId
        })
    }

    useEffect(() => {
        const fetchUserssList = async () => {
            const response = await adminApi.getListUsers(filter);
            setUsers(response.data.users)
            console.log(response.data.users)
            setPageTotal(UtilsPaginations.getPageTotalCondition(response.usersTotal, filter.limit))
        }
        fetchUserssList();
    }, [filter, checkLock])

    return (
        <div className='main-container mb-20'>
            <div className="container mf-30 p-0" >

                <div class="row">
                    <div class="col-xs-0 col-sm-4 col-md-6 col-lg-6">
                    </div>
                    <div class="col-xs-10 col-sm-6 col-md-4 col-lg-4">
                        <Search onFilterSubmit={handleSearch} />
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <select className='select' value={filter.role} onChange={handleChangeRole}>
                            <option value="1">Ch??? s??n</option>
                            <option value="2">Ng?????i d??ng</option>
                        </select>
                    </div>
                </div>

                <div class="table-hover">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className='title-list'>T??n ng?????i d??ng</th>
                                <th className='title-list'>S??? ??i???n tho???i</th>
                                <th className='title-list'>Email</th>
                                <th className='title-list'>?????a ch???</th>
                                <th className='title-list'>Tr???ng th??i</th>
                                <th className='title-list'>H??nh ?????ng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log("=====" + users.length)
                            }
                            {
                                users.map((user) => (
                                    <tr key={user.userId}>
                                        <td className='center line-44'>{user.fullname}</td>
                                        <td className='center line-44'>{user.phone}</td>
                                        <td className='center line-44'>{user.email}</td>
                                        <td className='center line-44'>Qu???ng Nam</td>
                                        <th className='center line-44'><span className={(user.status) ? 'accept' : 'cancel'}>{(user.status) ? 'M???' : '???? kh??a'}</span></th>
                                        <td className='center'>
                                            {
                                                (user.status) ? <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#modelLockUnLock${user.userId}`}>Kh??a</button>
                                                    : <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#modelLockUnLock${user.userId}`}>M??? kh??a</button>
                                            }
                                        </td>
                                        <div className="modal fade" id={`modelLockUnLock${user.userId}`} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">{(user.status) ? "Kh??a t??i kho???n"
                                                            : "M??? kh??a t??i kho???n"}</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {
                                                            (user.status) ? <div>B???n c?? mu???n kh??a t??i kho???n n??y kh??ng ?</div>
                                                                : <div>B??n c?? mu???n m??? kh??a t??i kho???n n??y kh??ng ?</div>
                                                        }
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">????ng</button>
                                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => handleToggleLock(user.userId)}>C??</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination pageTotal={pageTotal} currentPage={filter.page} onClickPagination={handleClickPagination} />
            </div>
        </div>
    );
}

export default ListUser;