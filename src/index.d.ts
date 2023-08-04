type PARENT_INDEX = {
  categories: {
    key: string
    name: string
  }[]
}

type LABEL = 'chord' | 'lua'

type RECIPE = {
  repo: string
  branch?: string
  name: string
  labels?: LABEL[]
  schemas: string[]
  dependencies?: string[]
  reverseDependencies?: string[]
  license?: string
}

type CHILD_INDEX = {
  recipes: RECIPE[]
}

export {
  PARENT_INDEX,
  LABEL,
  RECIPE,
  CHILD_INDEX
}
