function loadFileThumbnail(file) {
  if (file.folder) { return; }

  mgt.Providers.globalProvider.graph
    .api(`/drives/${file.parentReference.driveId}/items/${file.id}/thumbnails/0/c320x320_crop/content`)
    .get()
    .then(thumbnail => {
      const url = URL.createObjectURL(thumbnail);
      const placeholder = document.querySelector(`.hoo-cardimage.i${file.id}`);
      placeholder.innerHTML = `<img src="${url}" width="320" height="180" alt="">`;
    }, err => { });
}

function loadUserAvatar(file) {
  mgt.Providers.globalProvider.graph
    .api(`/users/${file.lastModifiedBy.user.id}/photo/$value`)
    .get()
    .then(photo => {
      const url = URL.createObjectURL(photo);
      const placeholder = document.querySelector(`.hoo-avatar.i${file.id}`);
      placeholder.innerHTML = `<img src="${url}" alt="" class="hoo-avatar-img" loading="lazy">`;
    }, err => { });
}

function loadSiteTitle(file) {
  mgt.Providers.globalProvider.graph
    .api(`/drives/${file.parentReference.driveId}`)
    .select('name')
    .get()
    .then(res => {
      document.querySelector(`.hoo-cardlocation.i${file.id}`).innerHTML = res.name;
    }, err => { });
}

const fileList = document.querySelector('mgt-file-list');
fileList.addEventListener('templateRendered', e => {
  e.detail.context.files.forEach(file => {
    loadFileThumbnail(file);
    loadUserAvatar(file);
    loadSiteTitle(file);
  });
});
fileList.templateContext = {
  formatDate: date => {
    const d = new Date(date);
    return d.toLocaleString();
  },
  openFile: (e, context, root) => {
    window.open(context.file.webUrl, '_blank');
  }
};