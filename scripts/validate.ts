import { readFileSync } from 'fs'
import joi from 'joi'

const INDEX = 'index.json'
const repoPattern = /^[-_a-zA-Z0-9]+\/[-_a-zA-Z0-9]+$/
const branchPattern = /^[-_a-zA-Z0-9]+$/
const schemaPattern = /^[-_a-zA-Z0-9]+$/
const labels = ['chord', 'lua']

const parent = joi.object({
  date: joi.string().pattern(/\d+-\d+-\d+/),
  categories: joi.array().items(
    joi.object({
      key: joi.string().required(),
      name: joi.string().required()
    })
  ).required()
})

const child = joi.object({
  recipes: joi.array().items(
    joi.object({
      repo: joi.string().pattern(repoPattern).required(),
      branch: joi.string().pattern(branchPattern),
      name: joi.string().required(),
      labels: joi.array().items(joi.string().valid(...labels)).unique(),
      schemas: joi.array().items(joi.string().pattern(schemaPattern)).required().unique(),
      dependencies: joi.array().items(joi.string().pattern(repoPattern)).unique(),
      reverseDependencies: joi.array().items(joi.string().pattern(repoPattern)).unique(),
      license: joi.string()
    })
  )
})

const repos: string[] = []
const deps: string[] = []

function validate (path: string) {
  const file = `${path}/${INDEX}`
  console.log(`Validating ${file}`)
  const content = JSON.parse(readFileSync(file) as unknown as string)
  const isParent = 'categories' in content
  const { error } = (isParent ? parent : child).validate(content)
  if (error) {
    throw error
  }
  if (isParent) {
    for (const category of content.categories) {
      validate(`${path}/${category.key}`)
    }
  } else {
    for (const recipe of content.recipes) {
      const { repo, dependencies, reverseDependencies } = recipe
      if (repos.includes(repo)) {
        throw new Error(`Duplicated repo: ${repo}`)
      }
      repos.push(repo)
      dependencies && deps.push(...dependencies)
      reverseDependencies && deps.push(...reverseDependencies)
    }
  }
}

validate('.')

for (const dependency of deps) {
  if (!repos.includes(dependency)) {
    throw new Error(`Unknown dependency ${dependency}`)
  }
}
