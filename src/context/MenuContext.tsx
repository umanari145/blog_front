import React, { createContext, useContext, useState} from 'react';
import _ from 'lodash';
import axios from 'axios';
import { MenuItem } from '../class/MenuItem';
import { Option } from '../class/Option';

interface MenuProviderProps {
  children: React.ReactNode;
}

// Contextの型定義
interface MenuContextType {
  categories: MenuItem[];
  categoryOptions: Option[];
  tags: MenuItem[];
  tagOptions: Option[];
  postDates: MenuItem[];
  getMenus: () => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Context Providerのコンポーネント
export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<MenuItem[]>([]);
  const [tags, setTags] = useState<MenuItem[]>([]);
  const [postDates, setPostDates] = useState<MenuItem[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [tagOptions, setTagOptions] = useState<Option[]>([]);


  const getMenus = async () => {
    try {
      let categories, dates, tags;
      const menus = window.localStorage.getItem('menus');
      if (menus === null) {
        const { data, status } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/menus`
        );
        //console.log(data)
        if (status === 200) {
          ({ categories, dates, tags } = JSON.parse(data.body));
          window.localStorage.setItem('menus', data.body);
        }
      } else {
        ({ categories, dates, tags } = JSON.parse(menus));
      }

      // メニュー用
      setCategories(categories);
      setTags(tags);
      dates = _.sortBy(dates, 'name').reverse();
      setPostDates(dates);

      const categoryOptions = categories.map((category: any) => {
        category.id = category.no;
        return category;
      });

      const tagOptions = tags.map((tag: any) => {
        tag.id = tag.no;
        return tag;
      });

      // プルダウン用
      setCategoryOptions(categoryOptions)
      setTagOptions(tagOptions)

    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };


  return (
    <MenuContext.Provider
      value={{
        getMenus,
        categories,
        tags,
        postDates,
        categoryOptions,
        tagOptions
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// Hookを作成して、Contextを簡単に使えるように
export const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
