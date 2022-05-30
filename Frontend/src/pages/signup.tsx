import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "../api/auth";
import { toast } from "react-toastify";

type formSignup = {
  name: string,
  email: string,
  password: string
}

const SignupPage = () => {
  toast.configure();
  const { register, handleSubmit, formState: { errors } } = useForm<formSignup>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<formSignup> = async data => {
    try {
      await signup(data)
      navigate("/login")
      toast.success('Đăng ký thành công')
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

                  <h3 className="mb-5">Đăng ký</h3>
                  <div className="form-outline mb-4">
                    <input type="text" id="typeEmailX-2" className="form-control form-control-lg" placeholder="Name" {...register('name')} />
                  </div>
                  <div className="form-outline mb-4">
                    <input type="email" id="typeEmailX-2" className="form-control form-control-lg" placeholder="Email" {...register('email')} />
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" placeholder="Password" {...register('password')} />
                  </div>

                  <button className="btn btn-primary btn-lg btn-block" type="submit">Đăng ký</button>

                  <hr className="my-4" />
                  <Link to='/login'> Đăng nhập</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignupPage;