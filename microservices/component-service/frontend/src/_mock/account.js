const developer = localStorage.getItem('developer') ? JSON.parse(localStorage.getItem('developer')) : null;

const account = {
  displayName: developer ? `${developer.name}` : '',
  email: developer ? developer.email : '',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;