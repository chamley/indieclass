// const db = require('./models');

exports.mockdb = async function (db) {
  // Mocking categories
  const categories = await db.category.findAll();
  const users = await db.user.findAll();
  const classes = await db.class.findAll();
  if (!categories || categories.length === 0) {
    console.log('categories');
    db.category.create({
      category_name: 'Dance',
    });
    db.category.create({
      category_name: 'Health',
    });
    db.category.create({
      category_name: 'Cooking',
    });
    db.category.create({
      category_name: 'Meetup',
    });
  }

  // Mocking users
  if (!users || users.length === 0) {
    db.user.create({
      firstname: 'Bart',
      lastname: 'Simpson',
      email: 'bart@simpson.com',
    });
    db.user.create({
      firstname: 'Spongebob',
      lastname: 'Squarepants',
      email: 'bob@sp.com',
    });
    db.user.create({
      firstname: 'Geralt',
      lastname: 'of Rivia',
      email: 'bart@simpson.com',
    });
  }

  // Mocking classes
  if (!classes || classes.length === 0) {
    const bart = await db.user.findOne({ where: { firstname: 'Bart' } });
    const health = await db.category.findOne({
      where: { category_name: 'Health' },
    });
    db.class.create({
      classname: 'Yoga',
      classtime: '2020-09-21T16:00:00.000Z',
      classlength: '90',
      place_id: 'abs_123',
      signedup: '10',
      limit: '20',
      cost: '5',
      description: 'Yoga class to start your day with good energy',
      category_id: health.category_id,
      teacher_id: bart.user_id,
    });
  }
};
