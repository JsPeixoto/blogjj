import Post from 'App/Models/Post'

export default class PostService {
  public static async createPost(
    post: string,
    texto: string | null,
    userId: number,
    categoryId: number | null
  ) {
    const quest = new Post()
    quest.post = post
    quest.texto = texto
    quest.userId = userId
    quest.categoryId = categoryId

    await quest.save()
    return quest
  }

  public static async destroyPost(id: number) {
    const quest = await Post.findOrFail(id)
    quest.delete()
  }
}
