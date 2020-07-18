
module.exports.dataGenerator = (userContext, events, done) => {
  const id = Math.floor(Math.random() * 1000000) + 1;

  const story = {
    'gif1': 'http://i.giphy.com/media/xTiTnpcaFPfJAzaP8A/giphy.webp?cid=e1bb72ffa1b5c7fc4f93c4de41806003aedd4109ee1296c1&rid=giphy.webp',
    'gif2': 'http://i.giphy.com/media/TgIYso34IqCU36jAa6/giphy.webp?cid=e1bb72ff4fd14cb84a71652a4623ec6e8e0069924241427d&rid=giphy.webp',
    'gif3': 'http://i.giphy.com/media/3o7TKTXBaaK5uS1I1W/giphy.webp?cid=e1bb72ffae002e279ca43c272fd23c046816e90fcacc4db2&rid=giphy.webp',
    'img1': 'http://lorempixel.com/640/480/sports',
    'img2': 'http://lorempixel.com/640/480/sports',
    'img3': 'http://lorempixel.com/640/480/sports',
    'title1': 'Kvoluptate magni tempore',
    'title2': 'est incidunt consequatur',
    'title3': 'non dolores voluptate',
    'title4': 'vitae aut optio',
    'title5': 'voluptatibus assumenda repellendus',
    'text1': 'Amet dolore vero ut iure. Animi adipisci illum quidem et minus fugit. Ullam tempore maiores quis blanditiis.',
    'text2': 'Nulla optio voluptate non. Accusamus voluptas non nostrum quis ipsa. Animi non omnis pariatur. Voluptas in quia et ipsum assumenda aut sint aut.',
    'text3': 'Commodi laborum voluptatum officiis vitae dolor non eveniet rerum. Et similique perferendis consequuntur aut quibusdam totam inventore. Ut nihil quis ipsum.',
    'text4': 'Tenetur pariatur ipsam explicabo atque. Enim et asperiores dolorem ea. Ab inventore voluptatum architecto ut illum. Autem laboriosam modi sint culpa earum velit itaque earum. Doloremque dolor sit eum quidem libero nam adipisci quasi.',
    'text5': 'Natus tempore libero fugiat. Iste animi ut tempore molestias soluta dicta laboriosam magni tempora. Aut dolores dolor. Non deleniti voluptatem fugiat voluptas soluta.'
  }
  const rnc = {
    'title1': 'Kvoluptate magni tempore',
    'title2': 'est incidunt consequatur',
    'title3': 'non dolores voluptate',
    'title4': 'vitae aut optio',
    'title5': 'voluptatibus assumenda repellendus',
    'text1': 'Amet dolore vero ut iure. Animi adipisci illum quidem et minus fugit. Ullam tempore maiores quis blanditiis.',
    'text2': 'Nulla optio voluptate non. Accusamus voluptas non nostrum quis ipsa. Animi non omnis pariatur. Voluptas in quia et ipsum assumenda aut sint aut.',
    'text3': 'Commodi laborum voluptatum officiis vitae dolor non eveniet rerum. Et similique perferendis consequuntur aut quibusdam totam inventore. Ut nihil quis ipsum.',
    'text4': 'Tenetur pariatur ipsam explicabo atque. Enim et asperiores dolorem ea. Ab inventore voluptatum architecto ut illum. Autem laboriosam modi sint culpa earum velit itaque earum. Doloremque dolor sit eum quidem libero nam adipisci quasi.',
    'text5': 'Natus tempore libero fugiat. Iste animi ut tempore molestias soluta dicta laboriosam magni tempora. Aut dolores dolor. Non deleniti voluptatem fugiat voluptas soluta.'
  }
  const ec = {
    'title1': 'Kvoluptate magni tempore',
    'title2': 'est incidunt consequatur',
    'title3': 'non dolores voluptate',
    'title4': 'vitae aut optio',
    'title5': 'voluptatibus assumenda repellendus',
    'text1': 'Amet dolore vero ut iure. Animi adipisci illum quidem et minus fugit. Ullam tempore maiores quis blanditiis.',
    'text2': 'Nulla optio voluptate non. Accusamus voluptas non nostrum quis ipsa. Animi non omnis pariatur. Voluptas in quia et ipsum assumenda aut sint aut.',
    'text3': 'Commodi laborum voluptatum officiis vitae dolor non eveniet rerum. Et similique perferendis consequuntur aut quibusdam totam inventore. Ut nihil quis ipsum.',
    'text4': 'Tenetur pariatur ipsam explicabo atque. Enim et asperiores dolorem ea. Ab inventore voluptatum architecto ut illum. Autem laboriosam modi sint culpa earum velit itaque earum. Doloremque dolor sit eum quidem libero nam adipisci quasi.',
    'text5': 'Natus tempore libero fugiat. Iste animi ut tempore molestias soluta dicta laboriosam magni tempora. Aut dolores dolor. Non deleniti voluptatem fugiat voluptas soluta.'
  }
  userContext.vars.id = id;
  userContext.vars.story = story;
  userContext.vars.ec = ec;
  userContext.vars.rnc = rnc;
  return done();
}
