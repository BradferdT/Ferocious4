
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'ferocious4', password: 'qwerty', email:'funEmail@gmail.com', admin: true},
        {id: 2, username: 'ferocious5', password: 'qwerty', email:'fakeEmail@gmail.com', admin: false}
      ]);
    });
};
