Todos = new Mongo.Collection('todos');

Lists = new Mongo.Collection('lists');


if (Meteor.isServer) {
	Meteor.publish('lists',function(){
		var currentUser = this.userId;
		return Lists.find({createdBy:currentUser});
	});
	Meteor.publish('todos',function(currentList){
		var currentUser = this.userId;
		return Todos.find({createdBy:currentUser,listId:currentList});
	});
} 

if (Meteor.isClient) {

}



