const delivery = localStorage.getItem('delivery') ? JSON.parse(localStorage.getItem('delivery')) : null;

const account = {
  displayName: delivery ? `${delivery.name}` : '',
  email: delivery ? delivery.email : '',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;