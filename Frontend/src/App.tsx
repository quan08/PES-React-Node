import { useEffect, useState } from 'react'
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import logo from './logo.svg'
import "bootstrap/dist/css/bootstrap.min.css";
import StaffLayout from './pages/layouts/StaffLayout';
import PrivateRouter from './components/PrivateRouter';
import Home from './pages/Home';
import Menu from './pages/Menu';
import { TableType } from './frontend/types/Table';
import { list } from './api/table';
import { add, listMenu, remove, SearchOrder, update } from './api/menu';
import TableSettingPage from './pages/layouts/TableSetting';
import TableDetail from './components/TableDetail';
import TableOrder from './components/TableOrder';
import TableChage from './components/TableChage';
import { MenuType } from './frontend/types/menu';
import LoginPage from './pages/login';
import AdminLayout from './pages/layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import MenuEdit from './pages/Admin/menu/Edit';
import MenuAdmin from './pages/Admin/menu/List';
import 'antd/dist/antd.css';
import './App.css'
import MenuAdd from './pages/Admin/menu/Add';
import axios from 'axios';
import { toast } from 'react-toastify';
import TableAdmin from './pages/Admin/table/List';
import SignupPage from './pages/signup'
import StaffList from './pages/Admin/staff/List'
import { listStaff, removeStaff } from './api/auth';
import { AuthType } from './types/auth';
import Order from './pages/order';
function App() {
  const [table, setTable] = useState<TableType[]>([]);
  const [menu, setMenu] = useState<MenuType[]>([]);
  const [staff, setStaff] = useState<AuthType[]>([]);
  toast.configure();

  useEffect(() => {
    const getTable = async () => {
      const { data } = await list();
      setTable(data);
    };
    getTable();
    const getMenu = async () => {
      const { data } = await listMenu();
      setMenu(data);
    }
    getMenu();
    const getStaff = async () => {
      const { data } = await listStaff();
      setStaff(data);
    }
    getStaff();
  }, [])

  const handleUpdatetable = async () => {
    const { data } = await list();
    setTable(data);
    toast.success('Đã cập nhật dữ liệu mới nhất');
  }

  const handlegetAllMenu = async () => {
    const { data } = await listMenu();
    setMenu(data);
  }


  const handleUpdate = async (food: MenuType, file: object | any) => {
    const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/df7kkrfoe/image/upload";
    const CLOUDINARY_PRESET = "w4cc60qi";
    // tạo object và gắn giá trị vào các thuộc tính của formData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);
    console.log(food, file)
    // call API cloudinary để đẩy ảnh lên
    const { data } = await axios.post(CLOUDINARY_API, formData, {
      headers: {
        "Content-Type": "application/form-data",
      },
    });

    const foodAdd = {
      _id: food._id,
      name: food.name,
      price: food.price,
      img: data.url
    }

    try {
      const res = await update(foodAdd);
      const respons = await listMenu();
      setMenu(respons.data);
    } catch (error: any) {
      toast.warning(`${error.response.data.message}`)
    }

  }

  const handleRemoveFood = async (food: MenuType) => {
    try {
      const { data } = await remove(food._id);
      const res = await listMenu();
      toast.success(`Xóa thành công ${data.name}`)
      setMenu(res.data)
    } catch (error: any) {
      toast.warning(`${error.response.data.message}`)
    }
  }

  const handleRemoveStaff = async (StaffData: AuthType) => {
    try {
      const { data } = await removeStaff(StaffData._id);
      const res = await listStaff();
      toast.success(`Xóa thành công ${data.name}`)
      setStaff(res.data)
    } catch (error: any) {
      toast.warning(`${error.response.data.message}`)
    }
  }

  const handleSearchOrder = async (key: string) => {
    console.log(key)
    try {
      const { data } = await SearchOrder(key);
      console.log(data)
      setMenu(data)
    } catch (error: any) {
      toast.warning(`${error.response.data.message}`)
    }

  }

  const handleAddFood = async (food: MenuType, file: object | any) => {
    const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/df7kkrfoe/image/upload";
    const CLOUDINARY_PRESET = "w4cc60qi";
    // tạo object và gắn giá trị vào các thuộc tính của formData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);
    console.log(food, file)
    // call API cloudinary để đẩy ảnh lên
    const { data } = await axios.post(CLOUDINARY_API, formData, {
      headers: {
        "Content-Type": "application/form-data",
      },
    });

    const foodAdd = {
      name: food.name,
      price: food.price,
      img: data.url
    }

    try {
      const res = await add(foodAdd);
      toast.success(`thêm thành công ${res.data.name}`)
      setMenu([...menu, res.data])
    } catch (error: any) {
      toast.warning(`${error.response.data.message}`)
    }
    console.log(menu)
  }

  return (
    <div className="App">
      <main>
        <Routes>
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path="/" element={<PrivateRouter><StaffLayout /></PrivateRouter>}>
            <Route index element={<Navigate to="table" />} />
            <Route path='table'>
              <Route index element={<Home />} />
              <Route path=':id' element={<TableSettingPage />}>
                <Route index element={<TableDetail />} />
                <Route path='order' element={<Order getAll={handlegetAllMenu} onSearch={handleSearchOrder} menu={menu} />} />
                <Route path='chage' element={<TableChage />} />
              </Route>
            </Route>

            <Route path="menu" element={<Menu getAll={handlegetAllMenu} onSearch={handleSearchOrder} menu={menu} />} />
          </Route>
          <Route path='admin' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='menu'>
              <Route index element={<MenuAdmin getAll={handlegetAllMenu} onSearch={handleSearchOrder} onRemove={handleRemoveFood} menu={menu} />} />
              <Route path=':id/edit' element={<MenuEdit onUpdate={handleUpdate} />} />
              <Route path='add' element={<MenuAdd onAdd={handleAddFood} />} />
            </Route>
            <Route path='table'>
              <Route index element={<TableAdmin table={table} onUpdate={handleUpdatetable} />} />
              <Route path=':id/edit' element={<MenuEdit onUpdate={handleUpdate} />} />
              <Route path='add' element={<MenuAdd onAdd={handleAddFood} />} />
            </Route>
            <Route path='staff'>
              <Route index element={<StaffList onRemove={handleRemoveStaff} staffs={staff} />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App

