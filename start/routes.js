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

// Auth
Route.post('/auth/register', 'Auth/AuthController.register').validator('Auth/RegisterUser')
Route.post('/auth/login', 'AuthController.login').validator('LoginUser')
