
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'admin', password: '$2a$08$Sto72xoZaDdc9lzL8jzi8.Ci1SFU88BBqvsi4V9BFjps/TwQFktei', email:'teamFerocious4@admin.com', admin: true},
        {id: 2, username: 'user', password: '$2a$08$7Pnfm4QdqijCMrWKAbYpuuHgrewf8uzuNEB3wmBAMujT9iO3YV6SS', email:'teamFerocious4@user.com', admin: false},
      ]);
    });
}; 
