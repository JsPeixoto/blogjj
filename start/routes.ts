import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'UserController.create').as('create')
  Route.post('/', 'UserController.store').as('store')
})
  .prefix('/cadastro')
  .as('user')

Route.group(() => {
  Route.get('/perfil', 'UserController.show').as('user.show')
  Route.get('/perfil/editar', 'UserController.edit').as('user.edit')
  Route.post('/perfil/editar', 'UserController.update').as('user.update')
}).middleware('auth:web')

Route.group(() => {
  Route.get('/login', 'AuthController.create').as('create')
  Route.post('/login', 'AuthController.store').as('store')
  Route.get('/logout', 'AuthController.destroy').as('destroy')
}).as('auth')

Route.get('/', 'HomeController.index').as('home.index').middleware('silentAuth')

Route.group(() => {
  Route.get('/post', 'PostsController.create').as('post.create')
  Route.post('/post', 'PostsController.store').as('post.store')
  Route.get('/post/:id', 'PostsController.show').as('post.show')
  Route.get('/post/:id/delete', 'PostsController.destroy').as('post.destroy')
}).middleware('auth')
