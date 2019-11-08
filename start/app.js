'use strict'

const path = require('path')

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  // Adonis providers
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/drive/providers/DriveProvider',
  'adonis-bumblebee/providers/BumblebeeProvider',
  // Custom providers
  path.join(__dirname, '..', 'providers', 'RepositoryProvider'),
  path.join(__dirname, '..', 'providers', 'HelperProvider')
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  'adonis-bumblebee/providers/CommandsProvider'
]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  UserRepository: 'App/Repositories/UserRepository',
  SchoolRepository: 'App/Repositories/SchoolRepository',
  LenderRepository: 'App/Repositories/LenderRepository',
  StudentRepository: 'App/Repositories/StudentRepository',
  GuarantorRepository: 'App/Repositories/GuarantorRepository',
  LoanRepository: 'App/Repositories/LoanRepository',
  ResponseHelper: 'App/Helpers/ResponseHelper'
}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = []

module.exports = { providers, aceProviders, aliases, commands }
