import { useNavigate } from "react-router-dom";

export const checkLogin = () => {
    const navigate = useNavigate();
    const isLogin = localStorage.getItem('user');
    console.log(isLogin)
    if (isLogin == null) {
        navigate('/login');
    }
}