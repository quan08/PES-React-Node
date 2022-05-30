import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { list, read, update } from "../api/table";
import { TableType } from "../types/table";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { listSetting } from "../api/setting";
import { MenuType } from "../types/menu";
const TableDetail = () => {
    const { id } = useParams();
    const [table, setTablet] = useState<TableType>();
    const [time, setTime] = useState<any>();
    const [order, setOrder] = useState<any>();
    const [orderRemove, setOrderRemove] = useState<MenuType>();
    const [btnStart, setBtnStart] = useState<string>();
    const [isOrder, setisOrder] = useState<string>();
    const [indexRe, setindexRe] = useState<number>();
    const [pricePlay, setPricePlay] = useState<any>();
    const [isBlock, setisBlock] = useState<string>();
    const [indextable, setindextable] = useState<number>();

    function formatCash(str: string) {
        return str
            .split("")
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + ",") + prev;
            });
    }
    useEffect(() => {
        const getTable = async () => {
            console.log(id);
            const { data } = await read(id);
            console.log(data);
            setTablet(data);
            if (data.status == 1) {
                setBtnStart("Tính giờ");
            } else {
                setBtnStart("Thanh toán");
            }
            const Order = data?.order;
            if (Order == undefined) {
                setisOrder("Trống");
            } else {
                setOrder(Order);
            }
        };
        getTable();

        const getPricePlay = async () => {
            const { data } = await listSetting();
            setPricePlay(data[0].pricePlay);
        };
        getPricePlay();

        getTable();
        const getAllTable = async () => {
            const { data } = await list();
            data.map((item: TableType, index: number) => {
                if (item._id == id) {
                    setindextable(index);
                }
            });
            showTime()
        };
        getAllTable();
    }, [id]);
    const option = document.querySelectorAll("#option");
    const ShowStatus = () => {
        if (table?.status == 1) {
            return "Đang chờ";
        } else {
            return "Đang hoạt động";
        }
    };
    const flag = table?.status;
    console.log("falg", flag);
    const showTime = async () => {
        const { data } = await read(id);
        const timeHistory = data?.timestar;
        if (timeHistory) {
            const timeStar = new Date(
                timeHistory.year,
                timeHistory.month,
                timeHistory.date,
                timeHistory.hours,
                timeHistory.minute
            );
            const now = new Date();
            const result = Math.ceil(
                (now.getTime() - timeStar.getTime()) / (60 * 1000)
            );
            setTime(result);
        }
    };
    setInterval(() => {
        showTime();
    }, 60000);

    const showTimeStart = () => {
        const getTime: any = table?.timestar;
        const value = `Lúc ${getTime?.hours}:${getTime?.minute}(${getTime?.date}/${parseInt(`${getTime?.month}`) + 1
            }) `;
        return value;
    };

    async function StartTime() {
        const today = new Date();
        const time = {
            year: today.getFullYear(),
            month: today.getMonth(),
            date: today.getDate(),
            hours: today.getHours(),
            minute: today.getMinutes(),
        };
        // localStorage.setItem(`${table?.name}`, JSON.stringify(time));
        const tableNew: any = {
            _id: table?._id,
            status: 2,
            name: table?.name,
            timestar: time,
        };

        const { data } = await update(tableNew);
        console.log(data);
        setTablet(tableNew);
        setBtnStart("Thanh toán");
        option.forEach((item) => {
            item.setAttribute("style", "display:block");
        });
        setOrder([]);
        setisOrder("Trống");
        showTime();
    }

    const EndTime = async () => {
        const tableNew: any = {
            _id: table?._id,
            status: 1,
            name: table?.name,
            order: [],
            timestar: {},
        };
        const data2 = await update(tableNew);
        const { data } = await read(id);
        setTablet(data);
        setBtnStart("Tính giờ");
        option.forEach((item) => {
            item.setAttribute("style", "display:none");
        });
    };
    const [show1, setShow2] = useState(false);
    const [show3, setShow4] = useState(false);
    const handleBtn = (e: any) => {
        const status = e.target.getAttribute("set-status");
        if (status == 1) {
            StartTime();    
        } else {
            setShow4(true);
        }
    };

    const handleBtnPay = (e: any) => {
        const status = e.target.getAttribute("set-status");
        setShow4(false);
        EndTime();
        toast.success(`Đã thanh toán ${indextable}`);
    };

    const handleClose2 = () => setShow4(false);
    const handleShow2 = () => setShow4(true);

    const handleClose = () => setShow2(false);
    const handleShow = (index: number) => {
        setOrderRemove(order[index].food.food);
        setindexRe(index);
        setShow2(true);
    };
    const handleRemove = async () => {
        const res = await read(id);
        const Order = res.data?.order;
        Order.splice(indexRe, 1);
        setOrder(Order);
        const tableNew: any = {
            _id: table?._id,
            status: table?.status,
            name: table?.name,
            timestar: table?.timestar,
            order: Order,
        };
        const { data } = await update(tableNew);
        setTablet(data);
        if (Order?.length < 1) {
            setisOrder("trống");
        }
        handleClose();
    };

    const renHtml = () => {
        if (flag != 1) {
            return (
                <div
                    style={{ marginTop: "5%" }}
                    className="d-flex justify-content-between"
                >
                    <div style={{ textAlign: "center", width: "50%" }}>
                        <h4 style={{ color: "blue" }}>Thời gian chơi</h4>
                        <div className="container">
                            <h1 className="timer">{time} phút</h1>
                            <h5> {showTimeStart()}</h5>
                            <ol className="lapContainer"></ol>
                            <div className="bottomPart"></div>
                        </div>
                    </div>
                    <div style={{ textAlign: "left", width: "50%" }}>
                        <h4 style={{ color: "blue" }}>Gọi món</h4>
                        <div>
                            {order?.map((item: any, index: number) => {
                                return (
                                    <div style={{ marginTop: "20px" }}>
                                        <img
                                            style={{ width: "60px", height: "60px" }}
                                            src={item.food.food.img}
                                            alt=""
                                        />{" "}
                                        <strong>
                                            <span style={{ fontSize: "20px" }}>
                                                {" "}
                                                {item.food.food.name}
                                            </span>
                                        </strong>{" "}
                                        <span style={{ color: "gray", fontSize: "19px" }}>
                                            X{item.quantity}
                                        </span>{" "}
                                        <button
                                            onClick={() => handleShow(index)}
                                            type="button"
                                            className="btn btn-primary ml-2"
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                );
                            })}
                            <h5>{isOrder}</h5>
                        </div>

                        <Modal show={show1} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Hủy {orderRemove?.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <img width='150px' height='150px'  src={orderRemove?.img} alt="" /> <br />
                                * Nhấn OK để hủy {orderRemove?.name}
                                </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={handleRemove}>
                                    OK
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            );
        }
    };

    const moneyProvince = () => {
        const resule = (time / 60) * pricePlay;
        return resule.toFixed();
    };

    const moneyProvinceOrder = (Quantity: number, priceNb: number) => {
        const resule = Quantity * priceNb;
        return resule.toFixed();
    };
    const toTalOrder = () => {
        let count = 0;
        order?.forEach((item: any) => {
            count += item.food.food.price * item.quantity;
        });
        const result = parseInt(moneyProvince()) + count;
        return result;
    };
    return (
        <div className='p-5'>
            <h2 style={{ color: "blue" }}>Tổng Quan </h2>
            <div className="d-flex justify-content-between">
                <h3>
                    Trạng thái: <span style={{ color: "green" }}>{ShowStatus()}</span>
                </h3>
                <button
                    onClick={handleBtn}
                    set-status={table?.status}
                    type="button"
                    className="btn btn-outline-primary"
                >
                    <h4 onClick={handleBtn} set-status={table?.status}>
                        {btnStart}
                    </h4>
                </button>
                <Modal size="lg" show={show3} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thanh toán bàn {indextable}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>
                            <span className="text-primary">Thời gian chơi:</span> {time} phút
                            x{" "}
                            <span style={{ color: "Gray" }}>
                                {formatCash(`${pricePlay}`)}/giờ
                            </span>{" "}
                            ={" "}
                            <span className="text-danger">
                                {formatCash(moneyProvince())}đ
                            </span>{" "}
                        </h5>
                        <h5>
                            <span className="text-primary">Oder:</span>
                        </h5>
                        {order?.map((item: any, index: number) => {
                            return (
                                <div style={{ marginTop: "20px" }}>
                                    <img
                                        style={{ width: "60px", height: "60px" }}
                                        src={item.food.food.img}
                                        alt=""
                                    />{" "}
                                    <strong>
                                        <span style={{ fontSize: "20px" }}>
                                            {" "}
                                            {item.food.food.name}: {item.quantity} x{" "}
                                            <span style={{ color: "gray" }}>
                                                {formatCash(`${item?.food.food.price}`)}
                                            </span>{" "}
                                            ={" "}
                                            <span className="text-danger">
                                                {formatCash(
                                                    `${moneyProvinceOrder(
                                                        item.quantity,
                                                        item?.food.food.price
                                                    )}`
                                                )}
                                                đ
                                            </span>
                                        </span>
                                    </strong>
                                </div>
                            );
                        })}
                        <h5>{isOrder}</h5>
                        <div style={{ float: "right", width: "40%", color: "green" }}>
                            <h4>
                                Tổng hóa đơn:{" "}
                                <span className="text-danger">
                                    {formatCash(`${toTalOrder()}`)}đ
                                </span>
                            </h4>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleBtnPay}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            {renHtml()}
        </div>
    );
};

export default TableDetail;
