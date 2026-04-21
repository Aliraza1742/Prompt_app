const { getDatabase } = require('../config/database');

async function getAllPrompts(req, res) {
  try {
    const supabase = getDatabase();
    
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching prompts', error.message);
      return res.status(500).json({ error: 'Failed to fetch prompts' });
    }

    res.json({ prompts: data || [] });
  } catch (err) {
    console.error('Error in getAllPrompts:', err.message);
    res.status(500).json({ error: 'Database not configured' });
  }
}

async function createPrompt(req, res) {
  const { title, content, category } = req.body;
  
  if (!title || !content || !category) {
    return res.status(400).json({ error: 'title, content, and category are required' });
  }

  try {
    const supabase = getDatabase();

    const { data, error } = await supabase
      .from('prompts')
      .insert({ title, content, category })
      .select()
      .single();

    if (error) {
      console.error('Error creating prompt', error.message);
      return res.status(500).json({ error: 'Failed to create prompt' });
    }

    res.status(201).json({ prompt: data });
  } catch (err) {
    console.error('Error in createPrompt:', err.message);
    res.status(500).json({ error: 'Database not configured' });
  }
}

async function updatePrompt(req, res) {
  const { id } = req.params;
  const { title, content, category } = req.body;
  
  if (!title || !content || !category) {
    return res.status(400).json({ error: 'title, content, and category are required' });
  }

  try {
    const supabase = getDatabase();

    const { data, error } = await supabase
      .from('prompts')
      .update({ title, content, category })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating prompt', error.message);
      return res.status(500).json({ error: 'Failed to update prompt' });
    }

    res.json({ prompt: data });
  } catch (err) {
    console.error('Error in updatePrompt:', err.message);
    res.status(500).json({ error: 'Database not configured' });
  }
}

async function deletePrompt(req, res) {
  const { id } = req.params;

  try {
    const supabase = getDatabase();

    const { error } = await supabase.from('prompts').delete().eq('id', id);

    if (error) {
      console.error('Error deleting prompt', error.message);
      return res.status(500).json({ error: 'Failed to delete prompt' });
    }

    res.status(204).end();
  } catch (err) {
    console.error('Error in deletePrompt:', err.message);
    res.status(500).json({ error: 'Database not configured' });
  }
}

module.exports = {
  getAllPrompts,
  createPrompt,
  updatePrompt,
  deletePrompt,
};
