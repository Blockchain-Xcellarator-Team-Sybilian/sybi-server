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
  Route.post('/request', 'RequestController.request').validator('Token/RequestValidator')
  // Refresh
  Route.post('/refresh', 'RefreshController.refresh').validator('Token/RefreshValidator')
}).namespace('Token').prefix('token').middleware('guest')

/** Users */
Route.group(() => {
  // Browse users
  Route.get('/', 'BrowseController.browse')
  // Read user
  Route.get('/:id', 'ReadController.read')
  // Edit user
  Route.put('/:id', 'EditController.edit').validator('User/EditValidator')
  // Add user
  Route.post('/', 'AddController.add').validator('User/AddValidator')
  // Delete user
  Route.delete('/:id', 'DeleteController.delete')
}).namespace('User').prefix('users').middleware('auth')

/** School */
Route.group(() => {
  // Browse schools
  Route.get('/', 'BrowseController.browse')
  // Read school
  Route.get('/:id', 'ReadController.read')
  // Edit school
  Route.put('/:id', 'EditController.edit').validator('School/EditValidator')
  // Add school
  Route.post('/', 'AddController.add').validator('School/AddValidator')
  // Delete school
  Route.delete('/:id', 'DeleteController.delete')
}).namespace('School').prefix('schools').middleware('auth')

/** Lender */
Route.group(() => {
  // Browse lenders
  Route.get('/', 'BrowseController.browse')
  // Read lender
  Route.get('/:id', 'ReadController.read')
  // Edit lender
  Route.put('/:id', 'EditController.edit').validator('Lender/EditValidator')
  // Add lender
  Route.post('/', 'AddController.add').validator('Lender/AddValidator')
  // Delete lender
  Route.delete('/:id', 'DeleteController.delete')
}).namespace('Lender').prefix('lenders').middleware('auth')

/** Student */
Route.group(() => {
  // Browse students
  Route.get('/', 'BrowseController.browse')
  // Read student
  Route.get('/:id', 'ReadController.read')
  // Edit student
  Route.put('/:id', 'EditController.edit').validator('Student/EditValidator')
  // Add student
  Route.post('/', 'AddController.add').validator('Student/AddValidator')
  // Delete student
  Route.delete('/:id', 'DeleteController.delete')
}).namespace('Student').prefix('students').middleware('auth')

/** Guarantor */
Route.group(() => {
  // Browse guarantors
  Route.get('/', 'BrowseController.browse')
  // Read guarantor
  Route.get('/:id', 'ReadController.read')
  // Edit guarantor
  Route.put('/:id', 'EditController.edit').validator('Guarantor/EditValidator')
  // Add guarantor
  Route.post('/', 'AddController.add').validator('Guarantor/AddValidator')
  // Delete guarantor
  Route.delete('/:id', 'DeleteController.delete')
}).namespace('Guarantor').prefix('guarantors').middleware('auth')

/** Loan */
Route.group(() => {
  // Browse loans
  Route.get('/', 'BrowseController.browse')
  // Read loan
  Route.get('/:id', 'ReadController.read')
  // Apply loan
  Route.post('/apply', 'ApplyController.apply').validator('Loan/ApplyValidator')
  // Endorse loan
  Route.post('/endorse', 'EndorseController.endorse').validator('Loan/EndorseValidator')
  // Approve loan
  Route.post('/approve', 'ApproveController.approve').validator('Loan/ApproveValidator')
  // Accept loan
  Route.post('/accept', 'AcceptController.accept').validator('Loan/AcceptValidator')
  // Release loan
  Route.post('/release', 'ReleaseController.release').validator('Loan/ReleaseValidator')
  // Receive loan
  Route.post('/receive', 'ReceiveController.receive').validator('Loan/ReceiveValidator')
  // Pay loan
  Route.post('/pay', 'PayController.pay').validator('Loan/PayValidator')
  // Cancel loan
  Route.post('/cancel', 'CancelController.cancel').validator('Loan/CancelValidator')
  // Deny loan
  Route.post('/deny', 'DenyController.deny').validator('Loan/DenyValidator')
}).namespace('Loan').prefix('loans').middleware('auth')

/** Document */
Route.group(() => {
  // Browse
  Route.get('/', 'BrowseController.browse')
  // Upload PDF document
  Route.post('/pdf/upload', 'PDF/UploadController.upload')
  // Upload PNG document
  Route.post('/png/upload', 'PNG/UploadController.upload')
  // Download PDF document
  Route.get('/pdf/download/:loanCode/:documentName', 'PDF/DownloadController.download')
  // Download PNG document
  Route.get('/png/download/:loanCode/:documentName', 'PNG/DownloadController.download')
}).namespace('Document').prefix('documents').middleware('auth')
