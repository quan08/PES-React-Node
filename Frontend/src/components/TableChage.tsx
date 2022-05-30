import React, { useEffect, useState } from "react";
import { TableType } from "../types/menu";
import { Link, useParams, useNavigate } from "react-router-dom";
import { list, read, update } from "../api/table";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { listSetting } from "../api/setting";

const TableChage = () => {
    const [table, setTable] = useState<TableType>();
    const [indexTable, setindexTable] = useState<number>();
    const [indexTableHis, setindexTableHis] = useState<number>();
    const [tableChage, setTableChage] = useState<TableType>();
    const [show, setShow] = useState(false);
    const [tableChageNew, setTableChageNew] = useState<TableType>();
    const { id } = useParams();
    const [imgTable, setimgTable] = useState<string>();
    const navigame = useNavigate();
    toast.configure();
    function formatCash(str: string) {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }
    useEffect(() => {
        const getTable = async () => {
            const { data } = await list();
            setTable(data)
        }
        getTable();
        const getTableChage = async () => {
            const { data } = await read(id);
            setTableChage(data)
        }
        getTableChage();

        const ImgtableTable = async () => {
            const { data } = await listSetting();
            setimgTable(data[0].imgTable)
          }
          ImgtableTable();
    }, [])

    function MouseOver(e: any): void {
        e.target.style.color = 'red';
    }
    function MouseOut(e: any) {
        e.target.style.color = "white";
    }
    const warningF = () => {
        let flag = false;
        for (let i = 0; i < table?.length; i++) {
            if (table[i].status == 1) {
                flag = true;
                break;
            }
        }
        if (flag == false) {
            return (
                <h2>Không còn bàn trống !</h2>
            )
        }
    }
    const handleClose = () => setShow(false);
    const handleShow = async (e: any) => {
        setShow(true);
        const id = e.target.getAttribute('data-set');
        const { data } = await read(id)
        const res = await list();
        res.data.map((item: TableType, index: any) => {
            if(item._id == tableChage._id) {
                setindexTableHis(index)
            }
            if(item._id == data._id) {
                setindexTable(index)
            }
        })
        setTableChageNew(data);

    }
    const handleChageTable = async () => {

        const timeUpdate = tableChage?.timestar;
        const orderUpdate = tableChage?.order;
        const tableChageUpdate = {
            _id: tableChage?._id,
            status: 1,
            name: tableChage?.name,
            img: tableChage?.img
        }
        update(tableChageUpdate);
        toast.success("Chuyển bàn thanh cong");
        setTimeout(() => {
            navigame(`/table/${tableChageNew?._id}`);
        },1000)
        if (orderUpdate == undefined) {
            const tableChagenewUpdate = {
                _id: tableChageNew?._id,
                status: 2,
                name: tableChageNew?.name,
                img: tableChageNew?.img,
                timestar: timeUpdate,
            }
            update(tableChagenewUpdate)
        } else {
            const tableChagenewUpdate = {
                _id: tableChageNew?._id,
                status: 2,
                name: tableChageNew?.name,
                img: tableChageNew?.img,
                timestar: timeUpdate,
                order: orderUpdate
            }
            update(tableChagenewUpdate)
        }

        setShow(false);
        console.log(tableChageNew?._id)
    }

    return (
        <div className='p-5'>
            <h2 style={{ color: 'blue' }}>Chuyển đến bàn</h2>
            <div style={{ color: 'red' }}>{warningF()}</div>
            <div className="row row-cols-4 mt-5">
                {table?.map((item: any, index: number) => {
                    if (item.status == 1)
                        return (
                            <Link variant="primary" onClick={handleShow} onMouseOut={MouseOut} onMouseEnter={MouseOver} className='Table mt-3 ml-1' data-set={item._id} key={index} style={{
                                backgroundImage: `url(${imgTable})`,
                                backgroundSize:'100%',
                                width:'20%',
                                fontSize: '20px',
                                color: "white",
                                fontWeight: "bold",
                                backgroundRepeat: 'no-repeat',
                            }} to=''>
                                <div data-set={item._id} style={{ marginLeft: '30%', marginTop: '100%' }}><span className="mb-2">Bàn</span> {index}</div>
                            </Link>
                        );
                })}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >Chuyển từ <span style={{ color: 'blue' }}>{indexTableHis}</span> tới <span style={{ color: 'blue' }}>{indexTable}</span> </Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Hãy chắc chắn trước khi nhấn chuyển !</h5></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleChageTable}>
                        Chuyển
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};

export default TableChage;
