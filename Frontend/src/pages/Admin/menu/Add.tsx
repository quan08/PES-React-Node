import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listMenu } from '../../../api/menu'
import { readMenu } from '../../../api/menu'
import { MenuType } from "../../../types/menu";
import { useForm, SubmitHandler } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import { Table, Tag, Space } from 'antd';

type MenuEditProps = {
    onAdd: (food: MenuType, file: object) => void
}

type FormInputs = {
    name: string,
    price: number,
    img: string
}

const MenuAdd = (props: MenuEditProps) => {
    toast.configure();
    function formatCash(str: string) {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    }
    const [img, setImg] = useState<MenuType>();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormInputs> = data => {
        console.log(data)
        props.onAdd(data, handleChangeImg());
        navigate("/admin/menu")
    }

    const handleChangeImg = () => {
        const imgIP = document.querySelector('#imgIp').files[0];
        return imgIP;
    }

    return (
        <div className='p-3'>
            <h2 style={{ color: 'black' }}>Thêm Menu</h2>
            <Form className='p-3' onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: 'white' }}>
                <fieldset >
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">Name</Form.Label>
                        <Form.Control {...register('name', { required: true })} id="disabledTextInput" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">Price</Form.Label>
                        <Form.Control {...register('price', { required: true })} id="disabledTextInput" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">image</Form.Label> <br />
                        <img width='100px' src={img} alt="" />
                        <Form.Control onChangeCapture={handleChangeImg} className='mt-2' type="file" {...register('img', { required: true })} id="imgIp" placeholder="Disabled input" />
                    </Form.Group>
                    <Button type="submit">Add</Button>
                </fieldset>
            </Form>

        </div>
    )
}

export default MenuAdd