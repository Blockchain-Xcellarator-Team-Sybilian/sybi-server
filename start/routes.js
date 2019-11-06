'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Home
Route.get('/', 'HomeController.index')

/** Auth */
// Register
Route.post('/auth/register', 'Auth/RegisterController.register').validator('Auth/RegisterUserValidator')
// Login
Route.post('/auth/login', 'Auth/LoginController.login').validator('Auth/LoginUserValidator')

/** Users */
// Browse users
Route.get('/users', 'User/BrowseController.browse')