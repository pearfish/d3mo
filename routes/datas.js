var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	var demdatas = [],
		months = ['August', 'September', 'October', 'November'];

	for (var i = 0; i< months.length ; i++){
		var views = Math.floor(Math.random()*960);
		var prints = Math.floor(Math.random()*views);
		var transactions = Math.floor(Math.random()*views);
		var mobileViews = Math.floor(Math.random()*views);
		demdatas.push({
			month: months[i],
			stats: {
				Views: views,
				Prints: prints,
				Transactions: transactions,
				MobileViews: mobileViews
			}
		});
	}

	res.send(demdatas);
});

module.exports = router;
