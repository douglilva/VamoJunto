//Componente para gerar eventos aleatóriamente, para testar os códigos

function generateRandomEvent(id) {
  const names = ['Palestra sobre IA', 'Seminário de Design', 'Workshop de Programação', 'Conferência de Tecnologia', 'Exposição de Arte', 'Apresentação de Música', 'Oficina de Fotografia', 'Concerto de Jazz', 'Feira de Negócios', 'Curso de Marketing'];
  const locations = ['Auditório', 'Sala de Seminário', 'Sala de Conferências', 'Galeria de Arte', 'Teatro', 'Estúdio de Música', 'Estúdio de Fotografia', 'Clube de Jazz', 'Centro de Convenções', 'Salão de Eventos'];
  const avatars = [
    'https://cdn.pixabay.com/photo/2017/01/20/18/25/logo-1997807_1280.png',
    'https://cdn.pixabay.com/photo/2016/09/01/08/25/smiley-1635464_1280.png',
    'https://cdn.pixabay.com/photo/2016/12/13/16/17/dancer-1904467_1280.png',
    'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png',
    'https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png',
    'https://cdn.pixabay.com/photo/2017/03/01/22/18/avatar-2109804_1280.png',
    'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png',
    'https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_1280.png',
    'https://cdn.pixabay.com/photo/2016/08/28/13/12/secondlife-1625903_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/03/31/20/27/avatar-1295773_1280.png'
  ];
  const randomIndex = Math.floor(Math.random() * names.length);
  const randomAvatarIndex = Math.floor(Math.random() * avatars.length);

  return {
    id,
    name: names[randomIndex],
    date: new Date().toLocaleDateString(),
    location: locations[randomIndex],
    tickets: Math.floor(Math.random() * 100) + 1,
    value: (Math.random() * 100).toFixed(2),
    avatarUrl: avatars[randomAvatarIndex],
    favorite: false 
  };
}

const numberOfEvents = 10;
const events = Array.from({ length: numberOfEvents }, (_, i) => generateRandomEvent(i + 1));

export default events;
