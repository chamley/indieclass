const db = require("./Models");

exports.mockdb = function (db) {
  // Mocking categories
  db.category.create({
    category_name: "Dance"
  });
  db.category.create({
    category_name: "Health"
  });
  db.category.create({
    category_name: "Cooking"
  });
  db.category.create({
    category_name: "Meetup"
  });

  // Mocking teachers
  db.teacher.create({
    firstname: "Bart",
    lastname: "Simpson",
    email: "bart@simpson.com",
    bio: "Bart Homerson - son of Homer, first of his, here to teach us how to get yellow hair and skin"
  });
  db.teacher.create({
    firstname: "Spongebob",
    lastname: "Squarepants",
    email: "bob@sp.com",
    bio: "This swimming coach, is a sponge... what??"
  });
  db.teacher.create({
    firstname: "Geralt",
    lastname: "of Rivia",
    email: "bart@simpson.com",
    bio: "Is a Witcher, not really from Rivia, will teach you sword fighting, will not let you date Ciri"
  });

  // Mocking classes
  // db.classes.create({
  //   {
  //     classname: "potato salad",
  //     classtime: "2019-02-08 04:05:06",
  //     classlength: "72000000",
  //     place_id: "abcdefghijklmnopqrstuv456",
  //     signedup: 0,
  //     limit: 10,
  //     cost: 1599,
  //     description: "This is a description",
  //     category: "Health",
  //     teacher: "e0f2e2d0-e132-11ea-9334-877ad9fa52c3" 
  // }
  // })
}