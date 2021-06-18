document.querySelector('mgt-file-list').templateContext = {
  formatDate: date => {
    const d = new Date(date);
    return d.toLocaleString();
  },
  openFile: (e, context, root) => {
    window.open(context.file.webUrl, '_blank');
  },
  loadMore: (e, context, root) => {
    root.parentNode.renderNextPage();
  }
};