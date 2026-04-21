import type { Prompt } from '../types';

export function filterPrompts(
  prompts: Prompt[],
  category: string,
  search: string,
  showFavorites: boolean,
  favorites: string[]
): Prompt[] {
  let filtered = prompts.filter((prompt) => {
    const matchesCategory = category === 'All' || prompt.category === category;
    const matchesSearch =
      prompt.title.toLowerCase().includes(search.toLowerCase()) ||
      prompt.content.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (showFavorites) {
    filtered = filtered.filter((p) => favorites.includes(p.id));
  }

  return filtered;
}
