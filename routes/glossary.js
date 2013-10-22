/** GET glossary Index **/

exports.index = function(req, res){
 	res.render('glossary', { title: 'Sailing For Dummies: Glossary' });
};