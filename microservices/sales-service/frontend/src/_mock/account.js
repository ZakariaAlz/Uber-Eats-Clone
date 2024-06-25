const sale = localStorage.getItem('sale') ? JSON.parse(localStorage.getItem('sale')) : null;

const account = {
  displayName: sale ? `${sale.name}` : '',
  email: sale ? sale.email : '',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;