Meteor.publish('students', function(){
	return Students.find();
});

Meteor.publish('lsoas',function(){
	return LSOAs.find();
});

Meteor.publish('schools',function(){
	return Schools.find();
});