export const categories = ['Tech', 'Marketing', 'Product', 'Design', 'General'] as const
export type Category = typeof categories[number]
