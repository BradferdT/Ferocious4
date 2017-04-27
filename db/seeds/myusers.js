
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'ferocious4', password: 'qwerty', email:'funEmail@gmail.com', admin: true},
        {id: 2, username: 'ferocious5', password: 'qwerty', email:'fakeEmail@gmail.com', admin: false},
        {id: 3, username: 'ferocious6', password: 'cammo', email:'doorkEmail@gmail.com'},
        {id: 4, username: 'ferocious7', password: 'gauntlet', email:'lukeyEmail@gmail.com'},
        {id: 5, username: 'ferocious8', password: 'silver', email:'gamerEmail@gmail.com'}
      ]);
    });
};
