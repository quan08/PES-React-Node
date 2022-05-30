import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listMenu, readMenu, remove } from '../../../api/menu'
import { MenuType } from "../../../types/menu";
import { useForm, SubmitHandler } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { Table, Tag, Space, Button, Modal } from 'antd';
import { AuthType } from '../../../types/auth';
import { getStaff } from '../../../api/auth';

type MenuPageProps = {
  staffs: AuthType[],
  onRemove: (StaffData: any) => void
}


const StaffList = (props: MenuPageProps) => {
  function formatCash(str: string) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }
  console.log(props)
  const [staff, setStaff] = useState<AuthType>();
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState<string>();
  const navigate = useNavigate();

  const showModal = async (e: any) => {
    const id = e.target.getAttribute('set-data');
    console.log(id)
    const { data } = await getStaff(id)
    setStaff(data)      
    setModalText(`*Nếu chắc chắn hãy nhấn ok`);    
    setVisible(true);
    setConfirmLoading(false);
  };

  const handleOk = async () => {
    setModalText('Xóa thành công ' + staff?.name);
    // const res = await listMenu();
    setConfirmLoading(true);
    props.onRemove(staff);
    // navigate("/admin/menu")
    setVisible(false);
    // setConfirmLoading(false);
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
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button set-data={record} onClick={showModal} type="danger"><span set-data={record}>Dell</span></Button>
        </Space>
      ),
    },
  ];

  const data = props.staffs.map((item, index) => {
    return {
      index: ++index,
      name: item.name,
      email: item.email,
      action: item._id
    }
  })


  return (
    <div className='p-3'>
      <div ><h2 style={{ float: 'left' }} >Nhân viên</h2></div>
      <Table columns={columns} dataSource={data} />
      <Modal
        title={staff?.name}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <h4>{staff?.name}</h4>
        <strong className='text-danger'>{modalText}</strong>
      </Modal>
    </div>

  )
}

export default StaffList