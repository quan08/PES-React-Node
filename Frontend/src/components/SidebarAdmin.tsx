import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/admin">
                <h5>Thống kê</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="staff">
                <h5>Nhân viên</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="table">
                <h5>Bàn</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="menu">
                <h5>Thực đơn</h5>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
  )
}

export default Sidebar