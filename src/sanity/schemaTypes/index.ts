import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './categoryType'
import { workType } from './workType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [workType, categoryType],
}
