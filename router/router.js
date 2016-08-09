/**
 * Created by emi on 8/08/16.
 */
Router.route('/register');


Router.route('/login');

Router.route('/',{
    template:'home',
    name:'home'
});

Router.configure({
    layoutTemplate: 'main'
});

Router.route('/list/:_id',{
    template:'listPage',
    name:'listPage',
    data:function(){
        var currentList = this.params._id;
        return Lists.findOne({_id:currentList});
    }
});
