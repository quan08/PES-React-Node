import React, { useEffect, useState } from 'react'
import { TableType } from "../types/table";
import { Link } from "react-router-dom"
import { list, read, fillter } from "../api/table"
import { listSetting } from "../api/setting"
import { checkLogin } from '../utils/checkLogin';
import { Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// import {create} from '../node/controllers/table'

type FormInputs = {
  number: string
}

type TablePageProps = {
  table: TableType[],
  length: number,
  map: any
}
const TablePage = () => {
  const [table, setTable] = useState<TablePageProps>();
  const [imgTable, setimgTable] = useState<string>();
  const [tableSearch, settableSearch] = useState<TablePageProps>();
  const [tableFillter, settableFillter] = useState<TablePageProps>();
  const [isFilter, setisFilter] = useState<number>();
  const { register, handleSubmit, formState: { errors },  reset } = useForm<FormInputs>();
  useEffect(() => {
    const getTable = async () => {
      const { data } = await list();
      setTable(data);
      settableFillter(data)
      setisFilter(3)
    }
    getTable();

    const ImgtableTable = async () => {
      const { data } = await listSetting();
      setimgTable(data[0].imgTable)
    }
    ImgtableTable();
  }, [])

  checkLogin();

  const showStatus = (index: number): string => {
    const status = table[index].status;
    if (status == 1) {
      return `red`
    } else {
      return `#00FF00`
    }
  }

  const onSubmit: SubmitHandler<FormInputs> = async result => {
    const { data } = await list();
    let arrTable: any = [];
    const key: any = result.number; 
    data?.map((item: TableType, index: number) => {
      if(isFilter != 3) {
        if(item.status == isFilter) {
          const indexTable = index.toString();  
          if (indexTable.indexOf(key) != -1) {
            console.log(indexTable, result.number)
            arrTable.push(item)
          }
        }
      }else{
          const indexTable = index.toString();  
          if (indexTable.indexOf(key) != -1) {
            console.log(indexTable, result.number)
            arrTable.push(item)
          }
      }
      
    })
    console.log(arrTable)
    settableSearch(arrTable)
    if (arrTable.length == 0) {
      toast.warning('Không có số bàn phù hợp')
      settableSearch(data)
    }
    setTable(data);
  }

  const handleChage = (e: any) => {
    const number = e.target.value;
    console.log(number)
    if (number < 0) {
      e.target.value = 0;
      toast.warning('Số bàn tình từ 0')
    }
  }

  const handleFilter = async (e: any) => {
    const value = e.target.value;
    const { data } = await list();
    if (value == 3) {
      settableFillter(data)
      setisFilter(3)
    } else if (value == 1) {
      const {data} = await fillter(1)
      setisFilter(1)
      settableFillter(data)
    } else {
      const {data} = await fillter(2)
      setisFilter(2)
      settableFillter(data)
    }
  }

  const handleCanceSearch = async () => {
    const {data} = await list();
    settableSearch(data)
    reset({number: ''})
  }

  return (
    <div className='p-5'>
      <Form.Select onChangeCapture={handleFilter} size="lg" aria-label="Default select example">
        <option value="3">Tất cả</option>
        <option value="1">Đang chờ</option>
        <option value="2">Đang hoạt động</option>
      </Form.Select>
      <form className='mt-3' onSubmit={handleSubmit(onSubmit)} action="">
        <h2 style={{ width: '100%', textAlign: 'center', color: 'blue' }}>{tableFillter?.length} bàn</h2>
        <div style={{ display: 'flex', justifyItems: 'center' }}>
          <input onChangeCapture={handleChage} {...register('number')} className="form-control form-control-dark" type="number" placeholder="Nhập số bàn" aria-label="Search" />
          <Button type='submit' variant="outline-primary">Search</Button>{' '}
        </div>
      </form>
      <Button className='mt-2' onClick={handleCanceSearch} type='submit' variant="outline-primary">Bỏ tìm kiếm</Button>{' '}
      <div className='row row-cols-4 mt-5'>
        {table?.map((item: TableType, index: number) => {
          if (isFilter != 1 && isFilter != 2) {
            if (tableSearch != undefined) {
              for (let i = 0; i < tableSearch?.length; i++) {
                if (item._id == tableSearch[i]._id) {
                  return <Link className='Table' key={index} style={{
                    backgroundImage: `url(${imgTable})`, height: '40vh',
                    fontSize: '20px',
                    color: "white",
                    fontWeight: "bold",
                    backgroundRepeat: 'no-repeat',
                    textDecoration: 'none'
                  }} to={`/table/${item._id}`}>
                    <p style={{ marginLeft: '20%', marginTop: '9%', color: `${showStatus(index)}` }}><i className="fas fa-circle"></i></p>
                    <div set-Is='1' style={{ marginLeft: '30%', marginTop: '40%' }}>Bàn {index}</div>
                  </Link>
                }
              }
            } else {
              return <Link className='Table' key={index} style={{
                backgroundImage: `url(${imgTable})`, height: '40vh',
                fontSize: '20px',
                color: "white",
                fontWeight: "bold",
                backgroundRepeat: 'no-repeat',
                textDecoration: 'none'
              }} to={`/table/${item._id}`}>
                <p style={{ marginLeft: '20%', marginTop: '9%', color: `${showStatus(index)}` }}><i className="fas fa-circle"></i></p>
                <div set-Is='1' style={{ marginLeft: '30%', marginTop: '40%' }}>Bàn {index}</div>
              </Link>
            }

          } else {
            if (item.status == isFilter) {
              if (tableSearch != undefined) {
                for (let i = 0; i < tableSearch?.length; i++) {
                  if (item._id == tableSearch[i]._id) {
                    return <Link className='Table' key={index} style={{
                      backgroundImage: `url(${imgTable})`, height: '40vh',
                      fontSize: '20px',
                      color: "white",
                      fontWeight: "bold",
                      backgroundRepeat: 'no-repeat',
                      textDecoration: 'none'
                    }} to={`/table/${item._id}`}>
                      <p style={{ marginLeft: '20%', marginTop: '9%', color: `${showStatus(index)}` }}><i className="fas fa-circle"></i></p>
                      <div set-Is='1' style={{ marginLeft: '30%', marginTop: '40%' }}>Bàn {index}</div>
                    </Link>
                  }
                }
              } else {
                return <Link className='Table' key={index} style={{
                  backgroundImage: `url(${imgTable})`, height: '40vh',
                  fontSize: '20px',
                  color: "white",
                  fontWeight: "bold",
                  backgroundRepeat: 'no-repeat',
                  textDecoration: 'none'
                }} to={`/table/${item._id}`}>
                  <p style={{ marginLeft: '20%', marginTop: '9%', color: `${showStatus(index)}` }}><i className="fas fa-circle"></i></p>
                  <div set-Is='1' style={{ marginLeft: '30%', marginTop: '40%' }}>Bàn {index}</div>
                </Link>
              }
            }
          }

        })}
      </div>
    </div>
  )
}

export default TablePage