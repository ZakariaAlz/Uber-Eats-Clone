const admin = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null;

const account = {
  displayName: admin ? `${admin.nom} ${admin.prenom}` : '',
  username: admin ? admin.username : '',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;