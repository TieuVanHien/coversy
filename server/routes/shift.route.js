const router = require('express').Router();
const { Router } = require('express');
const {
	createShift,
	getAllShifts,
	getShiftById,
} = require('../controllers/shift.controller');

// CREATE
router.post('/', createShift);

// READ
router.get('/', getAllShifts);
router.get('/:id', getShiftById);

// UPDATE

// DELETE

module.exports = router;
