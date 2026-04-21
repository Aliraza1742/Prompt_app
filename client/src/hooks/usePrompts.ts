import { useEffect, useState } from 'react';
import { PromptService } from '../services/promptService';
import type { Prompt } from '../types';

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await PromptService.getAll();
      setPrompts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load prompts');
    } finally {
      setLoading(false);
    }
  };

  const deletePrompt = async (id: string) => {
    try {
      await PromptService.delete(id);
      setPrompts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete prompt');
      throw err;
    }
  };

  return {
    prompts,
    loading,
    error,
    fetchPrompts,
    deletePrompt,
  };
}
