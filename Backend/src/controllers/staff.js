import Staff from '../models/staff';

export const userById = async (req, res, next, id) => {
    try {
        const user = await Staff.findById(id).exec();
        if(!user){
            res.status(400).json({
                message: "Không tìm thấy nhân viên"
            })
        }
        req.profile = user;
        req.profile.password = undefined;
        next();
    } catch (error) {
        console.log(error);
    }
}

export const listStaff = async (req, res) => {
    try {
        const staffs = await Staff.find({}).select("-password").exec();
        res.json(staffs);
    } catch (error) {
        res.status(400).json({
            error: "Không có nhân viên"
        })
    }
}

export const removeStaff = async (req, res) => {
    try {
        const staffs = await Staff.findOneAndRemove({_id: req.params.id}).exec();
        res.json(staffs);
        // next();
    } catch (error) {
        res.status(400).json({
            error: "Không có nhân viên"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const staffs = await Staff.findOne({_id: req.params.id}).exec();
        res.json(staffs);
        // next();
    } catch (error) {
        res.status(400).json({
            error: "Không có nhân viên"
        })
    }
}