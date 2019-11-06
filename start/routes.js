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
Route.group(() => {
  // Register
  Route.post('/register', 'RegisterController.register').validator('Auth/RegisterUserValidator')
  // Login
  Route.post('/login', 'LoginController.login').validator('Auth/LoginUserValidator')
}).namespace('Auth').prefix('auth')

/** Users */
Route.group(() => {
  // Browse users
  Route.get('/', 'BrowseController.browse')
  // Read user
  Route.get('/:id', 'ReadController.read')
  // Edit user
  Route.put('/:id', 'EditController.edit')
  // Add user
  Route.post('/', 'AddController.add')
  // Delete user
  Route.delete('/:id', 'DeleteController.delete')
}).namespace('User').prefix('users')
