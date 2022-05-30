import Menu from '../models/menu';

export const create = async (req, res) => {
    try {
        const table = await new Menu(req.body).save();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Không thêm được món ăn"
        })
    }
}
export const list = async (req, res) => {
    try {
        const seting = await Menu.find({}).exec();
        res.json(seting);
    } catch (error) {
        res.status(400).json({
            error: "Không có món ăn"
        })
    }
}

export const get = async (req, res) => {
    try {
        const table = await Menu.findOne({_id: req.params.id}).exec();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Không có món ăn"
        })
    }
}

export const search = async (req, res) => {
    const keyword = req.query.q
    console.log(keyword);
    try {
        if (keyword == "") {
            return res.status(400).json({
                message: "Vui lòng nhập từ khoá"
            })
        }
        if (keyword) {
            const product = await Menu.find({ name: { $regex: keyword, $options: "i" } })
            if (product == "") {
                return res.status(400).json({
                    message: `Không có món ăn phù hợp với từ khoá : ${keyword}`
                })
            }
            return res.json(product)
        }

    } catch (error) {
        res.status(400).json({
            message: "Không thể tìm kiếm"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const table = await Menu.findOneAndDelete({_id: req.params.id}).exec();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Xóa món ăn không thành công"
        })
    }
}
export const update = async (req, res) => {
    const condition = { _id: req.params.id }
    const update = req.body;
    try {
        const table = await Menu.findOneAndUpdate(condition, update).exec();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Xóa món ăn không thành công"
        })
    }
}