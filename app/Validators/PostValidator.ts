import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    post: schema.string({}, [rules.trim(), rules.minLength(3), rules.maxLength(240)]),
    texto: schema.string.nullable({}, [rules.trim(), rules.maxLength(2048)]),
    categoryId: schema.number.nullableAndOptional([
      rules.exists({ table: 'categories', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    'required': 'A pergunta não pode ser vazia',
    'post.minLength': 'A pergunta deve ter pelo menos 3 caracteres',
    'post.maxLength': 'A pergunta deve ter no máximo 240 caracteres',
    'texto.maxLength': 'O texto deve ter no máximo 2048 caracteres',
    'categoryId.exists': 'Id de categoria inválido',
  }
}
