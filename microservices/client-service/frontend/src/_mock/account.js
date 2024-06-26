const client = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client')) : null;

const account = {
  displayName: client ? `${client.name}` : '',
  email: client ? client.email : '',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;