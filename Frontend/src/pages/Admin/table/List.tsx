import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listMenu, readMenu } from '../../../api/menu'
import { MenuType } from "../../../types/menu";
import { remove } from '../../../api/table';
import { useForm, SubmitHandler } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { Table, Tag, Space, Button, Modal } from 'antd';
import { TableType } from '../../../types/table';
import { LaptopOutlined } from '@ant-design/icons';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { add } from '../../../api/table';
import moment from "moment";

type TbalePageProps = {
  table: TableType[],
  // onRemove: (table: TableType) => void,
  onUpdate: () => void
}

const TableAdmin = (props: TbalePageProps) => {
  function formatCash(str: string) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }
  toast.configure();

  const [quantityTable, setquantityTable] = useState<any>();
  const [quantityTableHAndle, setquantityTableHAndle] = useState<any>();
  const [whatTableHandle, setwhatTableHandle] = useState<boolean>();
  const [quantityTableOnl, setquantityTableOnl] = useState<any>();
  const [quantityTableOff, setquantityTableOff] = useState<number>();
  const navigate = useNavigate();

  useEffect(() => {
    setquantityTable(props.table.length)
    const tableOnl = () => {
      let count = 0;
      props.table.map((item) => {
        if (item.status == 2) {
          count = ++count;
        }
      })
      setquantityTableOnl(count)
      setquantityTableOff(quantityTable - quantityTableOnl)
    }
    tableOnl();
  })
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState<string>();

  const showModal = async (e: any) => {
    setModalText('Nếu chắc chắn hãy nhấn OK');
    const isHandle = e.target.getAttribute('set-data');
    if (isHandle == 'add') {
      setwhatTableHandle(true)
    } else {
      setwhatTableHandle(false)
    }
    setVisible(true);
  };

  
  const handleOk = async () => {
    const quantity: any = document.getElementById('quamtityIp').value;
    if(quantity == '') {
      toast.warning('Chưa nhập số lượng')
    }else{
      if(whatTableHandle == true) {
        let count = 0;    
        for(let i = 0; i < quantityTableHAndle; i++ ) {
          let time = moment().format('MMMM Do YYYY, h:mm:ss a');    
          ++count;
          time += count;
          const tableAdd: any = {
            name: time,
            status: 1
          }
          add(tableAdd)
        }
        props.onUpdate(); 
        toast.success(`Thêm thành công ${quantityTableHAndle} bàn`)
      }else{
        for(let i = 0; i < quantityTableHAndle; i++ ) {
          const {_id}: any = props.table.pop();
          remove(_id)
        }
        toast.success(`Xóa thành công ${quantityTableHAndle} bàn`)
      }
      setConfirmLoading(true);
      setVisible(false);
      setConfirmLoading(false);
    }
    
  };


  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const handleChageIp = (e: any) => {
    const value = e.target.value;
    setquantityTableHAndle(value)
    if (value < 1) {
      e.target.value = 1;
      toast.warning('Số lượng không thể nhỏ hơn 1');
      return
    }
    if(whatTableHandle == false) {
      if(value >= props.table.length) {
        e.target.value = props.table.length;
        toast.warning(`Hiện tại chỉ có ${props.table.length} bàn`);
      }
    }
    if (value > 50) {
      if (whatTableHandle == true) {
        e.target.value = 50
        toast.warning(`Mỗi lần chỉ có thể thêm tối đa 50 bàn`);
      } else {
        e.target.value = 50;
        toast.warning(`Mỗi lần chỉ có thể xóa tối đa 50 bàn`);
      }
    }
  }

  const isHandle = () => {
    if (whatTableHandle == true) {
      return 'Thêm bàn'
    } else {
      return 'Xóa bàn'
    }
  }

  return (
    <div className='p-3'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Table</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }} className='mt-2'>
          <Button set-data='add' onClick={showModal} type="primary"><span set-data='add' onClick={showModal}>Thêm bàn</span></Button>
          <Button set-data='dell' onClick={showModal} type="danger"><span set-data='dell' onClick={showModal}>Xóa bàn</span></Button>
        </div>
      </div>
      <div className="row mt-3 p-3">
        <div style={{ backgroundColor: 'blue' }} className="col-lg-4 col-sm-6"><div className="card-stats card"><div className="card-body"><div className="row"><div className="col-5">{<LaptopOutlined style={{ fontSize: '40px', color: 'blue' }} />}</div><div className="col-7"><div className="numbers"><p className="card-category">Số lượng bàn</p><h4 className="card-title">{quantityTable}</h4></div></div></div></div><div className="card-footer"></div></div>
        </div>
        <div className="col-lg-4 col-sm-6"><div className="card-stats card"><div className="card-body"><div className="row"><div className="col-5"><p style={{ marginLeft: '15%', color: `red`, fontSize: '30px' }}><i className="fas fa-circle"></i></p></div><div className="col-7"><div className="numbers"><p className="card-category">Bàn đang chờ</p><h4 className="card-title">{quantityTableOff}</h4></div></div></div></div><div className="card-footer"></div></div>
        </div>
        <div style={{ backgroundColor: 'green' }} className="col-lg-4 col-sm-6"><div className="card-stats card"><div className="card-body"><div className="row"><div className="col-5"><p style={{ marginLeft: '15%', color: `green`, fontSize: '30px' }}><i className="fas fa-circle"></i></p></div><div className="col-7"><div className="numbers"><p className="card-category">Bàn đang hoạt động</p><h4 className="card-title">{quantityTableOnl}</h4></div></div></div></div><div className="card-footer"></div></div>
        </div>

      </div>
      <Button onClick={props.onUpdate} style={{ width: '100%' }} type="primary">Update now</Button>
      <Modal
        title={isHandle()}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form.Group className="mb-3">
          <Form.Label htmlFor="quamtityIp">Số lượng</Form.Label> <br />
          <Form.Control onChangeCapture={handleChageIp} type="number" id="quamtityIp" />
        </Form.Group>
        <p>{modalText}</p>
      </Modal>
    </div>

  )
}

export default TableAdmin