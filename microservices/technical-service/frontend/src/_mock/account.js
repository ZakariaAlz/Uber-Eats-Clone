const technical = localStorage.getItem('technical') ? JSON.parse(localStorage.getItem('technical')) : null;

const account = {
  displayName: technical ? `${technical.name}` : '',
  email: technical ? technical.email : '',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;