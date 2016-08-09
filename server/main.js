
Meteor.startup(() => {
  // code to run on server at startup
});

function defaultName(currentUser) {
    var nextLetter = 'A'
    var nextName = 'List ' + nextLetter;
    while (Lists.findOne({ name: nextName, createdBy: currentUser })) {
        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        nextName = 'List ' + nextLetter;
    }
    return nextName;
}




Meteor.methods({
'createNewList':function(listName){
	  var currentUser = Meteor.userId();
	  check(listName,String);
	  if(listName == ""){
    	listName = defaultName(currentUser);
		}	  
      var data={
            name: listName,
            createdBy:currentUser
        }; 
        if (!currentUser) {
        	throw new Meteor.Error("not-logged-in", "You're not logged-in.");        	
        } 
       return Lists.insert(data);
        
	},
'createListItem': function(todoName, currentList){
	check(todoName, String);
    check(currentList, String);
    var currentUser = Meteor.userId();
    var data = {
        name: todoName,
        completed: false,
        createdAt: new Date(),
        createdBy: currentUser,
        listId: currentList
    }

    if(!currentUser){
        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    }

    var currentList = Lists.findOne(currentList);
    if(currentList.createdBy != currentUser){
        throw new Meteor.Error("invalid-user", "You don't own that list.");
    }

    return Todos.insert(data);
	},
'updateListItem': function(documentId, todoItem){
	check(todoItem, String);
	var currentUser = this.userId;
	 if(!currentUser){
        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    }
    Todos.update({ _id: documentId,createdBy:currentUser }, {$set: { name: todoItem }});
	},
'changeItemStatus': function(documentId, status){
    check(status, Boolean);
    var currentUser = Meteor.userId();
    var data = {
        _id: documentId,
        createdBy: currentUser
    }
    if(!currentUser){
        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    }
    Todos.update(data, {$set: { completed: status }});
},
'removeListItem': function(documentId){
    var currentUser = Meteor.userId();
    var data = {
        _id: documentId,
        createdBy: currentUser
    }
    if(!currentUser){
        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    }
    Todos.remove(data);
}



});