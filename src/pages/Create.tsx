// BlogForm.tsx
import React, { useEffect, useState } from 'react';
import Select from '../util/Select';
import CheckboxGroup from '../util/Checkbox';
import styled from 'styled-components';
import { Button, Input, InputGroup, Label, Box, Wrapper, Container } from '../components';
import axios from 'axios';
import _ from 'lodash';
import { Option } from '../class/Option';

const CustomWrapper = styled(Wrapper)`
  background-color: #f0f4f8;
`;

const CustomContainer = styled(Container)`
  background-color: #f0f4f8;
`;

const CustomBox = styled(Box)`
  padding: 30px;
  background-color: #f0f4f8;
`;

const CustomTitle = styled.h2`
  font-size: 26px;
  color: #007bff;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  min-height: 500px;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Create: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [date, setDate] = useState('');

  const [categories, setCategories] = useState<Option[]>([]);
  const [tags, setTags] = useState<Option[]>([]);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    try {
      let categories,  tags;
      const menus = window.sessionStorage.getItem('menus');
      if (menus === null) {
        const { data, status } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/menus`
        );
        if (status === 200) {
          ({ categories, tags } = JSON.parse(data.body));
          window.sessionStorage.setItem('menus', data.body);
        }
      } else {
        ({ categories, tags } = JSON.parse(menus));
      }
      console.log(categories);
      setCategories(categories);
      setTags(tags);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

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
    <>
    <CustomWrapper>
      <CustomContainer>
        <CustomBox>
          <CustomTitle>新規ブログ登録</CustomTitle>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>タイトル:</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>本文:</Label>
              <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>カテゴリ:</Label>
              <Select
                options={categories}
                value={category}
                onChange={setCategory}
              />
            </InputGroup>
            <InputGroup>
              <Label>タグ:</Label>
              <CheckboxGroup
                options={tags}
                selectedValues={selectedTags}
                onChange={setSelectedTags}
              />
            </InputGroup>
            <InputGroup>
              <Label>投稿日:</Label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </InputGroup>
            <Button type="submit">登録</Button>
          </form>
        </CustomBox>
      </CustomContainer>
    </CustomWrapper>
    </>
  );
};

export default Create;