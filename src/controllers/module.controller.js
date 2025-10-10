const db = require('../models');
const Module = db.Module;

exports.findAll = async (req, res) => {
  try {
    const modules = await Module.findAll();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);
    if (!module) return res.status(404).json({ message: 'Module not found' });
    res.json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, content, coverUrl } = req.body;
    const module = await Module.create({ title, content, coverUrl });
    res.status(201).json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, content, coverUrl } = req.body;
    const module = await Module.findByPk(req.params.id);
    if (!module) return res.status(404).json({ message: 'Module not found' });
    await module.update({ title, content, coverUrl });
    res.json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);
    if (!module) return res.status(404).json({ message: 'Module not found' });
    await module.destroy();
    res.json({ message: 'Module deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};