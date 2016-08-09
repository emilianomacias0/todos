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
