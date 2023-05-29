import _ from 'lodash'

export const serialize = (obj) => transform(obj, _.snakeCase)
export const deserialize = (obj) => transform(obj, _.camelCase)

const transform = (obj, transform_fn) => {
  if (!obj) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((obj) => transform(obj, transform_fn))
  }

  if (typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [k, v]) => ({
      ...acc,
      [transform_fn(k)]: transform(v, transform_fn),
    }), {})
  }

  return obj
}
