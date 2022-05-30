import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { readMenu } from '../api/menu'
import { MenuType } from "../types/menu";
import { useForm, SubmitHandler } from "react-hook-form";
import { TableType } from '../types/table';
import { list, read, update } from '../api/table';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type MenuPageProps = {
  menu: MenuType[],
  onSearch: (key: string ) => void,
  getAll: () => void
}


type ipOder = {
  number: number,
  name:string
}

const Order = (props: MenuPageProps) => {
  toast.configure();
  function formatCash(str: string) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }
  const [show, setShow] = useState(false);
  const [food, setFood] = useState<MenuType>();
  const [table, setTable] = useState<TableType>();
  const [count, setCount] = useState<number>();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ipOder>();
  const { id } = useParams();
  const [indextable, setindextable] = useState<number>();

  const handleClose = () => setShow(false);
  const handleShow = async (e: any) => {
    const FoodId = e.target.getAttribute("data-set");
    const { data } = await readMenu(FoodId);
    setFood(data);
    setShow(true);
    reset({ number: 1 });
    setCount(1)
  }
  useEffect(() => {
    const getTable = async () => {
      const { data } = await read(id)
      setTable(data)

    }
    getTable();
    const getAllTable = async () => {
      const { data } = await list();
      data.map((item: TableType, index: number) => {
        if (item._id == id) {
          setindextable(++index)
        }
      })
    }
    getAllTable()
  }, [])
  console.log(id)
  const chageValue = (e: any) => {
    const quantity = e.target.value;
    if (quantity < 1) {
      e.target.value = 1
      toast.warning('Không thể nhỏ hơn 1')
    }
    else if (quantity > 49) {
      e.target.value = 49
      toast.warning('Không thể lớn hơn 49')
    }
    setCount(e.target.value)
  }
  const submitOrder = async () => {
    const ipQuantity: any = document.getElementById("ipQuantity");
    if (ipQuantity.value < 1) {
      toast.warning('Chưa nhập số lượng')
      return
    }
    const { data } = await read(id);
    const orderTable = data?.order;

    const Order: any = {
      _id: table?._id,
      status: table?.status,
      name: table?.name,
      timestar: table?.timestar,
      order: [{
        quantity: ipQuantity.value,
        food: {
          food
        }
      }]
    }
    console.log("order", orderTable, "food", food)
    if (orderTable == undefined) {
      const { data } = await update(Order)
      setTable(data)
      toast.success('Thêm thành công')
    } else {
      let flag: boolean = false;
      const arrNew = orderTable.map((item: any) => {
        if (item.food.food._id == food?._id) {
          console.log(item)
          flag = true;
          const order = {
            quantity: parseInt(item.quantity) + parseInt(ipQuantity.value),
            food: {
              food
            }
          }
          return order;
        } else {
          return item;
        }
      })
      if (flag == true) {
        const tableUpdate: any= {
          _id: table?._id,
          status: table?.status,
          name: table?.name,
          timestar: table?.timestar,
          order: arrNew
        }
        const { data } = await update(tableUpdate)
        setTable(data)
        toast.success(`Sản phẩm đã thêm trước đó, tăng số lượng lên ${ipQuantity.value}`)
      } else {
        const arrNew = [...orderTable, {
          quantity: ipQuantity.value,
          food: {
            food: food
          }
        }];
        console.log(arrNew);
        const tableUpdate: any = {
          _id: table?._id,
          status: table?.status,
          name: table?.name,
          timestar: table?.timestar,
          order: arrNew
        }
        const { data } = await update(tableUpdate);
        setTable(data)
        toast.success('Thêm thành công')
      }
    }
    setShow(false)
  }

  const onSubmit: SubmitHandler<ipOder> = async result => {
   props.onSearch(result.name)
  }
  return (
    <div className='p-5'>
      <h2 style={{ color: 'blue' }}>Gọi món</h2>
       <form onSubmit={handleSubmit(onSubmit)} action="">
        <div style={{ display: 'flex', justifyItems: 'center' }}>
          <input {...register('name')} className="form-control form-control-dark" type="text" placeholder="Tên món ăn" aria-label="Search" />
          <Button type='submit' variant="outline-primary">Search</Button>{' '}
        </div>
      </form>
      <div>
      <Button onClick={props.getAll} className='mt-3' type='submit' variant="outline-primary">Tất cả món</Button>{' '}
      <div className='row row-cols-4'>
        {props.menu.map((item, index) => {
          return <div data-set={item._id} onClick={handleShow} style={{ marginTop: '5%', cursor: 'pointer' }}>
            <img width='200px' height='200px' data-set={item._id} src={item.img} alt="" />
            <h4 data-set={item._id} >{item.name}</h4>
            <h5 data-set={item._id} style={{ color: 'red' }}>{formatCash(`${item.price}`)}</h5>
          </div>

        })}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <img style={{ width: '100px', height: '100px' }} src={food?.img} alt="" />
            <div>
              <h4 style={{ marginLeft: '20px' }}>{food?.name}</h4><br />
              <h5 style={{ marginLeft: '20px', color: 'red' }}>{formatCash(`${food?.price}`)}</h5></div>
          </Modal.Header>
          <Modal.Body>
            <form id="submitOrder" action="">
              <input {...register('number')} onChange={chageValue} id='ipQuantity' type="number" placeholder='Nhap so luong' />
            </form>
            <h3 style={{ marginTop: '20px' }}>Thêm <span className='text-danger'>{count}</span> {food?.name} vào bàn {indextable}  </h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={submitOrder}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      </div>
    </div>
  )
}

export default Order