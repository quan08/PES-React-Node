import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listMenu, readMenu, remove } from '../../../api/menu'
import { MenuType } from "../../../types/menu";
import { useForm, SubmitHandler } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { Table, Tag, Space, Button, Modal, Input } from 'antd';

type MenuPageProps = {
  menu: MenuType[],
  onRemove: (food: MenuType) => void,
  onSearch: (key: string ) => void,
  getAll: () => void
}

type ip = {
  name: string
}

const MenuAdmin = (props: MenuPageProps) => {
  function formatCash(str: string) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }
  const {Search} = Input;
  const [food, setFood] = useState<MenuType>();
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState<string>();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ip>();
  const navigate = useNavigate();

  const showModal = async (e: any) => {
    const id = e.target.getAttribute('set-data');
    setModalText('Nhấn OK để xóa');
    const { data } = await readMenu(id)
    setFood(data)
    setVisible(true);
  };

  const handleOk = async () => {
    setModalText('Xóa thành công' + food?.name);
    // const res = await listMenu();
    setConfirmLoading(true);
    props.onRemove(food);
    navigate("/admin/menu")
    setVisible(false);
    setConfirmLoading(false);
  };


  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const columns = [
    {
      title: 'Stt',
      dataIndex: 'index',
      key: 'index',
      render: (index: any) => <a>{index}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'image',
      dataIndex: 'image',
      key: 'image',
      render: (record: any) => (
        <img width="100px" src={record} alt="" />
      ),
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button type="primary"><Link to={`${record}/edit`}>Edit</Link></Button>
          <Button set-data={record} onClick={showModal} type="danger"><span set-data={record}>Dell</span></Button>
        </Space>
      ),
    },
  ];

  const data = props.menu.map((item, index) => {
    return {
      index: ++index,
      key: index + 1,
      image: item.img,
      name: item.name,
      price: formatCash(`${item.price}`),
      action: item._id
    }
  })

   const onSearch = (value: string) =>{
    props.onSearch(value)
  }
  return (
    <div className='p-3'>
      <div  ><h2 style={{ float: 'left' }} >MENU</h2> <Button className='mt-2' style={{ float: 'right' }} type="primary"><Link to={`add`}>Add</Link></Button></div>
      <Search  placeholder="Tìm tên món ăn" onSearch={onSearch} enterButton />
      <Button className='mt-2' onClick={props.getAll} type="primary">Tất cả món ăn</Button>
      <Table className='mt-2' columns={columns} dataSource={data} />
      <Modal
        title={food?.name}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <img src={food?.img} width='150px' height='150px' alt="" /> <br />
        <p> * {modalText}</p>
      </Modal>
    </div>

  )
}

export default MenuAdmin