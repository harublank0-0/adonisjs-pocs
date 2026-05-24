import vine from '@vinejs/vine'

/*
 * validates the post's creation form
 */
export const createPostValidator = vine.create({
  title: vine.string().minLength(3).maxLength(255),
  url: vine.string().url(),
  summary: vine.string().minLength(80).maxLength(500),
})

/**
 * Same validation rules as creating a post
 */
export const updatePostValidator = vine.create(createPostValidator.schema.clone())
