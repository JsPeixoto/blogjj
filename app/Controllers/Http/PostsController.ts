import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Post from 'App/Models/Post'
import User from 'App/Models/User'
import PostService from 'App/Services/PostService'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  public async create({ view }: HttpContextContract) {
    const categories = await Category.all()

    return view.render('posts/create', { categories })
  }

  public async store({ response, request, auth }: HttpContextContract) {
    const data = await request.validate(PostValidator)

    const categoryId = data.categoryId ? data.categoryId : null

    const quest = await PostService.createPost(data.post, data.texto, auth.user!.id, categoryId)

    return response.redirect().toRoute('post.show', { id: quest.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const quest = await Post.findOrFail(params.id)
    const user = await User.findOrFail(quest.userId)
    const categ = (await Category.find(quest.categoryId)) || null
    const date = quest.createdAt.toFormat("dd 'de' MMM'.' yyyy '-' hh':'mm")

    return view.render('posts/show', { post: quest, user, date, category: categ })
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    const quest = await Post.findOrFail(params.id)

    if (quest.userId == auth.user!.id) {
      await PostService.destroyPost(quest.id)
    }

    return response.redirect().toRoute('user.show')
  }
}
