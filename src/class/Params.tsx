export type ParamsProp = {
  keyword?: string;
  category?: string;
  tag?: string;
  year?: string;
  month?: string;
  page_no?: number;
};

export class Params {
  keyword?: string;
  category?: string;
  tag?: string;
  year?: string;
  month?: string;
  page_no?: number;

  constructor(props: ParamsProp = {}) {
    this.keyword = props.keyword || '';
    this.category = props.category || '';
    this.tag = props.tag || '';
    this.year = props.year || '';
    this.month = props.month || '';
    this.page_no = props.page_no || 1;
  }

  getQueryString = ():string => {
    let queries = [];
    let query_str = '';
    if (this.keyword) queries.push(`search_word=${this.keyword}`);
    if (this.category) queries.push(`category=${this.category}`);
    if (this.tag) queries.push(`tag=${this.tag}`);
    if (this.year) queries.push(`year=${this.year}`);
    if (this.month) queries.push(`month=${this.month}`);
    if (this.page_no) queries.push(`page_no=${this.page_no}`);
    if (queries.length > 0) {
    query_str = `?${queries.join('&')}`;
    }
    return query_str;
  }
}
