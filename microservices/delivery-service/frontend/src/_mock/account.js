const restaurant = localStorage.getItem('restaurant') ? JSON.parse(localStorage.getItem('restaurant')) : null;

const account = {
  displayName: restaurant ? `${restaurant.name}` : '',
  email: restaurant ? restaurant.email : '',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;