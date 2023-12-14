import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class HomeController {
  public async index({ auth, view }: HttpContextContract) {
    if (auth.use('web').isLoggedIn) {
      const posts = await Post.query().orderBy('created_at', 'desc').paginate(1, 10)

      return view.render('home/loggedInHome', { posts: posts })
    } else {
      return view.render('home/notLoggedInHome')
    }
  }
}
