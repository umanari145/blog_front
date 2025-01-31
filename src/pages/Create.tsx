// BlogForm.tsx
import React, { useState } from 'react';
import Select from '../util/Select';
import CheckboxGroup from '../util/Checkbox';
import { categories, tags } from '../dummy/masters';

const Create: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category || !date) {
      alert('全ての必須項目を入力してください。');
      return;
    }
    console.log({
      title,
      content,
      category,
      selectedTags,
      date,
    });
    alert('ブログが正常に登録されました。');
  };

  return (
    <div>
      <h2>新規ブログ登録</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>本文:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>カテゴリ:</label>
          <Select
            options={categories}
            value={category}
            onChange={setCategory}
          />
        </div>
        <div>
          <label>タグ:</label>
          <CheckboxGroup
            options={tags}
            selectedValues={selectedTags}
            onChange={setSelectedTags}
          />
        </div>
        <div>
          <label>投稿日:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default Create;