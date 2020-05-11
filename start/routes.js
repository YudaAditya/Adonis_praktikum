'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.get('logout', 'LoginController.logout').as('logout')

Route.group(() => { 
    Route.get('register', 'RegisterController.index').as('register')
    Route.post('register', 'RegisterController.store').as('register.store')
    Route.get('login', 'LoginController.index').as('login')
    Route.post('login', 'LoginController.store').as('login.store')
}).middleware(['guest'])

Route.group(()=>{
  Route.get('home', 'HomeController.index').as('home')
  Route.post('home','HomeController.create').as('home.post')
  Route.get('listMhs','HomeController.listMhs').as('home.listMhs')
  Route.post('update','HomeController.update').as('home.update')
  Route.post('delete','HomeController.delete').as('home.delete')
}).middleware(['auth'])



