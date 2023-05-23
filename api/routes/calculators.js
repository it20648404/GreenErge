const router = require('express').Router();
const Calculator = require('../models/Calculator');

//CREATE Calculator
router.post('/', async (req, res) => {
  const newCalculator = new Calculator(req.body);

  let code = 1;
  try {
    const calculator = await Calculator.find().sort({ _id: -1 }).limit(1);
    if (calculator.length > 0) code += calculator[0].code;
    newCalculator.cal_id = 'CID00' + code;
    newCalculator.code = code;

    try {
      const savedCalculator = await newCalculator.save();
      res.status(200).json(savedCalculator);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    console.log(error);
  }
});

//UPDATE Calculator
router.put('/update/:cal_id', async (req, res) => {
  try {
    const updatedCalculator = await Calculator.findOneAndUpdate(
      { cal_id: req.params.cal_id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCalculator);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Calculator
router.delete('/delete/:cal_id', async (req, res) => {
  try {
    const calculator = await Calculator.findOneAndDelete({
      cal_id: req.params.cal_id,
    });
    if (!calculator) {
      return res.status(404).json({ error: 'Food collection not found' });
    }
    res.status(200).json('Calculator has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Calculator
router.get('/:cal_id', async (req, res) => {
  try {
    const calculator = await Calculator.findOne({
      cal_id: req.params.cal_id,
    });
    res.status(200).json(calculator);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Calculator
router.get('/', async (req, res) => {
  try {
    const calculator = await Calculator.find();
    res.status(200).json(calculator);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
