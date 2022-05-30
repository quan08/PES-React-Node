import Setting from '../models/settings';

export const create = async (req, res) => {
    try {
        const table = await new Setting(req.body).save();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Không thành công"
        })
    }
}
export const list = async (req, res) => {
    try {
        const table = await Setting.find({}).exec();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Không có setting"
        })
    }
}

export const get = async (req, res) => {
    try {
        const table = await Setting.findOne({_id: req.params.id}).exec();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Không có sản phẩm"
        })
    }
}
export const remove = async (req, res) => {
    try {
        const table = await Setting.findOneAndDelete({_id: req.params.id}).exec();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Xóa sản phẩm không thành công"
        })
    }
}
export const update = async (req, res) => {
    const condition = { id: req.params.id }
    const update = req.body;
    try {
        const table = await Setting.findOneAndUpdate(condition, update).exec();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Xóa sản phẩm không thành công"
        })
    }
}