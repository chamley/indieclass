exports.mockdb = async function (db) {
  const categories = await db.category.findAll();
  const users = await db.user.findAll();
  const classes = await db.class.findAll();

  const populateMocks = async (obj, createEntries) => {
    if (!obj || obj.length === 0) {
      await createEntries();
    } else return;
  };

  const categoryEntries = async () => {
    await db.category.create({
      category_name: 'Dance',
    });
    await db.category.create({
      category_name: 'Health',
    });
    await db.category.create({
      category_name: 'Cooking',
    });
    await db.category.create({
      category_name: 'Meetup',
    });
  };

  const userEntries = async () => {
    await db.user.create({
      firstname: 'Bart',
      lastname: 'Simpson',
      email: 'bart@simpson.com',
    });
    await db.user.create({
      firstname: 'Spongebob',
      lastname: 'Squarepants',
      email: 'bob@sp.com',
    });
    await db.user.create({
      firstname: 'Geralt',
      lastname: 'of Rivia',
      email: 'bart@simpson.com',
    });
  };

  // Mocking classes
  const classEntries = async () => {
    const bart = await db.user.findOne({ where: { firstname: 'Bart' } });
    const health = await db.category.findOne({
      where: { category_name: 'Health' },
    });
    await db.class.create({
      classname: 'Yoga',
      classtime: '2020-09-21T16:00:00.000Z',
      classlength: '90',
      place_id: 'ChIJx27NboJw44kRE81mLKwFm9o',
      address: '125 Summer St, Boston, MA, USA',
      lat: 42.3530628,
      lng: -71.05750739999999,
      signedup: '10',
      limit: '20',
      cost: '5',
      description: 'Yoga class to start your day with good energy',
      category_id: health.category_id,
      teacher_id: bart.user_id,
    });
    await db.class.create({
      class_id: 'f6127b60-e567-11ea-b55f-b1ac848f12fb',
      classname: 'Ballet',
      classtime: '2020-09-25T16:00:00.000Z',
      classlength: '90',
      place_id: 'ChIJ17yrtkJ344kRcHuwLZmDJIo',
      address: '36 John F. Kennedy Street, Cambridge, MA, USA',
      lat: 42.37267430000001,
      lng: -71.1198689,
      signedup: '10',
      limit: '20',
      cost: '5',
      description: 'Ballet class to start your day with good energy',
      category_id: health.category_id,
      teacher_id: bart.user_id,
    });
  };

  await populateMocks(categories, categoryEntries);
  await populateMocks(users, userEntries);
  await populateMocks(classes, classEntries);
};
