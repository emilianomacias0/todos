/**
 * Created by emi on 8/08/16.
 */
Router.route('/register');


Router.route('/login');

Router.route('/',{
    template:'home',
    name:'home',
    waitOn:function(){
    	return Meteor.subscribe('lists');
    }
});


//Se configura el template pruncipal de la pagina
Router.configure({
    layoutTemplate: 'main',
    loadingTemplate: 'loading'
});



Router.route('/list/:_id',{
    template:'listPage',
    name:'listPage',
    data:function(){
        var currentList = this.params._id;
        var currentUser=Meteor.userId();
        return Lists.findOne({_id:currentList,createdBy:currentUser});
    },
    onBeforeAction:function(){
    	var currentUser = Meteor.userId();
    	if (currentUser) {
    		//Continue with the normal process
    		this.next();
    	} else {
    		//Dibuja el tamplate llamado "login" en la pantalla
    		this.render("login");
    	}
    },
    waitOn:function(){
    	var currentList = this.params._id;
    	return [ Meteor.subscribe('lists'), Meteor.subscribe('todos', currentList) ]
    }
});


