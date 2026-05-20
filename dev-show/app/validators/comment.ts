import vine from '@vinejs/vine'

/**
 * Validates the comment's creation form
 */
export const createCommentValidator = vine.create({
  content: vine.string().trim().minLength(1),
})
