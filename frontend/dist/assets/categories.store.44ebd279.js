import { j as a } from './index.80d36c9d.js';
const c = a('articles', {
    state: () => ({ articles: [] }),
    actions: {
      async getAll(s) {
        if (!s || this.articles.filter(t => t.main_category == s).length) return this.articles;
        const i = await (await fetch('http://192.168.0.25:8082/api/v1/articles/category/' + s)).json();
        return (
          i.status == 'success' &&
            i.result.forEach(t => {
              this.getCache(t.main_category, t.sub_category, t.path) || this.articles.push(t);
            }),
          this.articles
        );
      },
      async getAllPage() {
        const e = await (await fetch('http://192.168.0.25:8082/api/v1/articles/')).json();
        return (
          e.status == 'success' &&
            e.result.forEach(i => {
              this.getCache(i.main_category, i.sub_category, i.path) || this.articles.push(i);
            }),
          this.articles
        );
      },
      async get(s, e, i) {
        return (
          this.articles.length || (await this.getAll(s)),
          this.articles.find(t => t.path == i && t.sub_category == e && t.main_category == s)
        );
      },
      async getById(s) {
        return this.articles.length || (await this.getAllPage()), this.articles.find(e => e.id == s);
      },
      getCache(s, e, i) {
        return this.articles.find(t => t.path == i && t.sub_category == e && t.main_category == s);
      },
    },
  }),
  o = a('categories', {
    state: () => ({ categories: [] }),
    actions: {
      async getAll() {
        if (this.categories.length) return this.categories;
        const e = await (await fetch('http://192.168.0.25:8082/api/v1/categories')).json();
        return e.status == 'success' && (this.categories = e.result), this.categories;
      },
    },
  });
export { c as a, o as u };
