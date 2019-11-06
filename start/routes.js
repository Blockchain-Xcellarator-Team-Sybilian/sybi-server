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

/** Token */
Route.group(() => {
  // Request
  Route.post('/request', 'RequestController.request').validator('Token/RequestTokenValidator')
  // Refresh
  Route.post('/refresh', 'RefreshController.refresh').validator('Token/RefreshTokenValidator')
}).namespace('Token').prefix('token').middleware('guest')

/** Register */
Route.group(() => {
  // Student
  Route.post('/student', 'StudentController.student')
  // Guarantor
  Route.post('/guarantor', 'GuarantorController.guarantor')
  // Lender
  Route.post('/school', 'SchoolController.school')
  // Lender
  Route.post('/lender', 'LenderController.lender')
}).namespace('Register').prefix('register').middleware('auth')

/** Users */
Route.group(() => {
  // Browse users
  Route.get('/', 'BrowseController.browse')
  // Read user
  Route.get('/:id', 'ReadController.read')
  // Edit user
  Route.put('/:id', 'EditController.edit').validator('User/EditUserValidator')
  // Add user
  Route.post('/', 'AddController.add').validator('User/AddUserValidator')
  // Delete user
  Route.delete('/:id', 'DeleteController.delete')
}).namespace('User').prefix('users').middleware('auth')
