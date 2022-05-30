import Table from '../models/table';

export const create = async (req, res) => {
    try {
        const table = await new Table(req.body).save();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Không thêm được bàn"
        })
    }
}
export const list = async (req, res) => {
    try {
        const table = await Table.find({}).exec();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Không có bàn"
        })
    }
}

export const get = async (req, res) => {
    try {
        const table = await Table.findOne({_id: req.params.id}).exec();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Không có bàn"
        })
    }
}

export const fillter = async (req, res,) => {
    const key = req.query.q;
    try {
        const table = await Table.find({status: key}).exec();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Không có bàn"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const table = await Table.findOneAndDelete({_id: req.params.id}).exec();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Xóa bàn không thành công"
        })
    }
}

export const update = async (req, res) => {
    const condition = { _id: req.params.id }
    const update = req.body;
    try {
        const table = await Table.findOneAndUpdate(condition, update).exec();
        res.json(table);
    } catch (error) {
        res.status(400).json({
            error: "Xóa bàn không thành công"
        })
    }
}