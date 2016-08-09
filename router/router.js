/**
 * Created by emi on 8/08/16.
 */
Router.route('/register');


Router.route('/login');

Router.route('/',{
    template:'home',
    name:'home'
});

//Se configura el template pruncipal de la pagina
Router.configure({
    layoutTemplate: 'main'
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
    }
});
