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

type ip = {
  name: string
}
const Menu = (props: MenuPageProps) => {
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
  const { id } = useParams();
  const [indextable, setindextable] = useState<number>();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ip>();

  const onSubmit: SubmitHandler<ip> = async result => {
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
          return <div data-set={item._id} style={{ marginTop: '5%', cursor: 'pointer' }}>
            <img width='200px' height='200px' data-set={item._id} src={item.img} alt="" />
            <h4 data-set={item._id} >{item.name}</h4>
            <h5 data-set={item._id} style={{ color: 'red' }}>{formatCash(`${item.price}`)}</h5>
          </div>

        })}
        
      </div>
      </div>
    </div>
  )
}

export default Menu