co(function *() {
    var catalog = yield novel.getCatalog(gid);
    var articles = yield novel.getArticles(catalog);
    this.body = 'Novel catalog is ' + catalog + ' and it has ' + articles.lenght + ' articles.';
});
