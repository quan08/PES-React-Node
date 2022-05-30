import User from '../models/staff';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { email ,name, password} = req.body;
    try {
        const existUser = await User.findOne({email}).exec();
        if(existUser){
            return res.status(400).json({
                message: "Email đã tồn tại"
            })
        }
        const user = await new User({email, name, password, role}).save();
        return  res.json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        return  res.status(400).json({
            message: "Đăng ký thất bại"
        })
    }
}
export const login = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email}).exec();
        if(!user){
            return res.status(400).json({
                message: "Email không tồn tại"
            })
        }
        if(!user.authenticate(password)){
            return res.status(400).json({
                message: "Mật khẩu không đúng"
            })
        }
        const token = jwt.sign({_id: user._id}, "123456", { expiresIn: '12h'})
        return res.json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    } catch (error) {
        return res.status(400).json({
            message: "Đăng nhập thất bại"
        })
    }
}
