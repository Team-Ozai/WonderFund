const controller = require('./controller.js')

test('get story 1', () => {
  let response =
  {
    "id": 1,
    "title": "et rem et",
    "gif": "http://i.giphy.com/media/wJfZOIx30vMEDm16jz/giphy.webp?cid=e1bb72ffddf6c07a1f4adb46e619f37b66f52c2a9b1c3150&rid=giphy.webp",
    "text": "Ut eligendi at laboriosam voluptatum et et autem. Assumenda et quod porro eveniet est sint doloremque molestiae earum. Veniam dignissimos reiciendis rerum quibusdam. Consequatur distinctio provident. Culpa dolorum commodi qui harum necessitatibus.",
    "createdAt": "2020-06-19T21:22:31.000Z",
    "updatedAt": "2020-06-19T21:22:31.000Z"
  };

  return controller.getStoryFromID(1).then(data => {
    expect(data.title).toBe("et rem et");
  });
});


test('get RisksAndChallenges 1', () => {
  let response =
  {
    "id": 1,
    "title": "architecto expedita quidem",
    "text": "Officia aut qui et odit natus. Error nisi alias temporibus possimus harum. Adipisci facere aliquid id. Molestiae sint deserunt corporis.",
    "createdAt": "2020-06-19T22:01:14.000Z",
    "updatedAt": "2020-06-19T22:01:14.000Z"
}

  return controller.getRisksAndChallengesFromID(1).then(data => {
    expect(data.title).toBe("architecto expedita quidem");
  });
});

test('get Environmental Commitments 1', () => {
  let response =
  {
    "id": 1,
    "title": "ratione cum illum",
    "text": "Esse ab sunt iure earum fugit aut est harum ad. Molestiae harum praesentium voluptate temporibus et aut delectus laudantium voluptatem. Vel nihil dolorum eum consequuntur numquam et necessitatibus. Deleniti consequatur sequi necessitatibus aliquid et maxime velit. Aut expedita quia quia ipsam aut adipisci ab. Corporis quisquam dolorum omnis cum eos ut.",
    "createdAt": "2020-06-19T22:01:14.000Z",
    "updatedAt": "2020-06-19T22:01:14.000Z"
}

  return controller.getEnvironmentalCommitmentsFromID(1).then(data => {
    expect(data.title).toBe("ratione cum illum");
  });
});
