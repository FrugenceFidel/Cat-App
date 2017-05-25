var Cat = require('./models/cat'),
		Comment = require('./models/comment');

var seeds = [
	{
		name: 'Mamba',
		image: 'https://farm4.staticflickr.com/3769/9513521298_410ca8977b.jpg',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo mmdmd ddndnyaa yeeeoos ahahhhaa'
	},
	{
		name: 'Cute',
		image: 'https://farm5.staticflickr.com/4067/4615211501_f0cee1c22b.jpg',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo mmdmd ddndnyaa yeeeoos ahahhhaa'
	},
	{
		name: 'Simba',
		image: 'https://farm4.staticflickr.com/3769/9513521298_410ca8977b.jpg',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo mmdmd ddndnyaa yeeeoos ahahhhaa'
	}
];

function seedDB () {
	Cat.remove({}, function (err, cat) {
		if (err) {
			console.log(err);
		} else {
			console.log('Cats removed');
			seeds.forEach(function (seed) {
				Cat.create(seed, function (err, cat) {
					if (err) {
						console.log(err);
					} else {
						Comment.remove({}, function (err, comment) {
							Comment.create({
								author: 'Fidel',
								content: 'Lorem ipsum dolor sit amet'
							}, function (err, comment) {
								if (err) {
									console.log(err);
								} else {
									cat.comments.push(comment);
									cat.save();
									console.log(cat);
								}
							});
						});
						
					}
				});
			});
		}
	});
}

module.exports = seedDB;