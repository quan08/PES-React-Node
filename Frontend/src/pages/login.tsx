import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form";
import { signin } from "../api/auth";
import { authenticated } from "../utils/localStorate";
import { toast } from "react-toastify";

type formSignin = {
  email: string,
  password: string
}

const LoginPage = () => {
  
  toast.configure();
  const { register, handleSubmit, formState: { errors } } = useForm<formSignin>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<formSignin> = async data => {
    // localstorage
    try {
      const { data: user } = await signin(data);
      authenticated(user, () => {
        navigate('/');
      })
      toast.success("Đăng nhập thành công")
    } catch (error: any) {
      toast.error(`${error.response.data.message}`)
    }

  }

  return (
    <div role="document">
      <form onSubmit={handleSubmit(onSubmit)} className="vh-100" method="get" style={{ backgroundColor: ' #508bfc' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">

                  <h3 className="mb-5">Đăng nhập </h3>

                  <div className="form-outline mb-4">
                    <input type="email" id="typeEmailX-2" className="form-control form-control-lg" placeholder="Email" {...register('email')} />
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" placeholder="Password" {...register('password')} />
                  </div>

                  <button className="btn btn-primary btn-lg btn-block" type="submit">Đăng nhập</button><br />
                  <hr className="my-4" />
                  <Link to='/signup'> Đăng ký</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginPage;