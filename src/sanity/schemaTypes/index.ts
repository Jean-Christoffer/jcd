import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './categoryType'
import { workType } from './workType'
import { projectType } from './projectType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [workType, projectType, categoryType],
}
