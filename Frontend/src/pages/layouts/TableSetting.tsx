import React, { useEffect, useState } from 'react'
import { TableType } from '../../types/table';
import { Link, useParams, NavLink } from "react-router-dom"
import { list, read } from '../../api/table';
import { Outlet } from 'react-router-dom';
type Props = {}

function TableSettingPage() {
    const { id } = useParams();
    const [table, setTable] = useState<TableType>();
    const [status, setStatus] = useState<string>();
    const [indextable, setindextable] = useState<number>();
    useEffect(() => {
        const getTable = async () => {
            const { data } = await read(id);
            if(data.status == 2) {
                setStatus('block')
            }else{
                setStatus('none')
            }
            setTable(data);
        };
        getTable();

        const getAllTable = async () => {
            const {data} = await list();
            data.map((item: TableType, index: number) => {
                if(item._id == id) {
                    setindextable(index)
                }
            })
        }

        getAllTable()
    }, [id]);
    return (
        <div>
            <div className="container-fluid">
                <div className="row">

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className='' /></div><div className="chartjs-size-monitor-shrink"><div className='' /></div></div>
                        <Outlet />
                    </main>
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3">
                            <h1 style={{color:'red'}}>Bàn {indextable}</h1>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="">
                                        Tổng quan
                                    </NavLink>
                                </li>
                                <li id='option' style={{display:`${status}`}} className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="order">
                                        Gọi món
                                    </NavLink>
                                </li>
                                <li id='option' style={{display:`${status}`}} className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="chage">
                                        Chuyển bàn
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>

    );
}

export default TableSettingPage;