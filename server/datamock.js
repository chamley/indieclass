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
    const dance = await db.category.findOne({
      where: { category_name: 'Dance' },
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
      category_id: dance.category_id,
      teacher_id: bart.user_id,
    });
    await db.class.create({
      classname: 'Hiphop',
      classtime: '2020-09-26T10:00:00.000Z',
      classlength: '90',
      place_id: 'ChIJ-6XmJUNx44kRhLAXXxV3jvk',
      address: '214 Pearl Street, Malden, MA, USA',
      lat: 42.42134119999999,
      lng: -71.0769134,
      signedup: '10',
      limit: '20',
      cost: '5',
      description: 'Hipphop with Body by Loud Luxury',
      category_id: dance.category_id,
      teacher_id: bart.user_id,
    });
  };

  await populateMocks(categories, categoryEntries);
  await populateMocks(users, userEntries);
  await populateMocks(classes, classEntries);
};
