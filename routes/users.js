const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

	const {limit, offset} = req.query;
	if(limit && offset) {
		res.json({
			limit,
			offset
		});
	} else {
		res.send('You sent a request without limit or offset');
	}
});

module.exports = router;
