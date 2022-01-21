/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'admin', password: 'password'}
      ]);
    }).then(()=>{
      return knex('note').del()
      .then(()=>{
        // return knex('note').insert([
        //   {user:'1', note:"this is a seeded note"}
        // ])
      })
    });
};
