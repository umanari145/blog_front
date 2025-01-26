import axios from 'axios';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { MenuItem } from '../class/MenuItem';
import SearchBox from './SearchBox';
import { useSearchContext } from '../context/SearchContext';
import { Params } from '../class/Params';
export const Sidebar = () => {
  const [categories, setCategories] = useState<MenuItem[]>([]);
  const [tags, setTags] = useState<MenuItem[]>([]);
  const [dates, setDates] = useState<MenuItem[]>([]);
  const { setCategory, updatePosts, setTag, setYear, setMonth, clearQuery } =
    useSearchContext();

  useEffect(() => {
    getMenus();
  }, []);

  const handleCategoryClick = async (category: MenuItem) => {
    clearQuery();
    setCategory(category._id);
    await updatePosts(new Params({category: category._id}));
  };

  const handleTagClick = async (tag: MenuItem) => {
    clearQuery();
    setTag(tag._id);
    await updatePosts(new Params({tag: tag._id}));
  };

  const handleDateClick = async (date: MenuItem) => {
    clearQuery();
    const year = parseInt(date._id.split('-')[0]);
    const month = parseInt(date._id.split('-')[1]);
    setYear(year);
    setMonth(month);
    await updatePosts(
      new Params({
        year,
        month
      })
    );
  };

  const getMenus = async () => {
    try {
      let categories, dates, tags;
      const menus = window.sessionStorage.getItem('menus');
      if (menus === null) {
        const { data, status } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/menus`
        );
        if (status === 200) {
          ({ categories, dates, tags } = JSON.parse(data.body));
          window.sessionStorage.setItem('menus', data.body);
        }
      } else {
        ({ categories, dates, tags } = JSON.parse(menus));
      }
      setCategories(categories);
      setTags(tags);
      dates = _.sortBy(dates, '_id').reverse();
      setDates(dates);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <aside className="sidebar">
      <SearchBox></SearchBox>
      <section className="widget">
        <h2 className="widget-title">Category</h2>
        <ul className="widget-list menu-list effect with-dot">
          {categories?.map((category: MenuItem) => (
            <li>
              <button
                onClick={() => handleCategoryClick(category)}
                className="link-button"
              >
                {category._id}({category.count})
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="widget">
        <h2 className="widget-title">Tags</h2>
        <ul className="tag-list effect">
          {tags?.map((tag: MenuItem) => (
            <li>
              <button
                onClick={() => handleTagClick(tag)}
                className="link-button"
              >
                {tag._id}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="widget">
        <h2 className="widget-title">Archive</h2>
        <ul className="widget-list effect with-dot">
          {dates?.map((date: MenuItem) => (
            <li>
              <button
                onClick={() => handleDateClick(date)}
                className="link-button"
              >
                {date._id} ({date.count})
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};
