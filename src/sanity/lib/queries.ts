import { defineQuery } from 'next-sanity'

export const WORK_QUERY = defineQuery(`*[_type == "work"]{title, description, categories[]->{
    _id,
    title,
    slug,
  },from, to}`);

