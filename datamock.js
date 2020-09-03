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
      category_name: 'Outdoors',
    });
    await db.category.create({
      category_name: 'Technology',
    });
    await db.category.create({
      category_name: 'Health & Wellness',
    });
    await db.category.create({
      category_name: 'Music',
    });
  };

  const userEntries = async () => {
    await db.user.create({
      firstname: 'Harry',
      lastname: 'Potter',
      bio: 'I am a wizard',
      email: 'Harry@potter.com',
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
    const harry = await db.user.findOne({ where: { firstname: 'Harry' } });
    const health = await db.category.findOne({
      where: { category_name: 'Health & Wellness' },
    });
    const outdoor = await db.category.findOne({
      where: { category_name: 'Outdoors' },
    });
    const tech = await db.category.findOne({
      where: { category_name: 'Technology' },
    });
    const music = await db.category.findOne({
      where: { category_name: 'Music' },
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
      teacher_id: harry.user_id,
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
      category_id: health.category_id,
      teacher_id: harry.user_id,
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
      category_id: health.category_id,
      teacher_id: harry.user_id,
    });
    await db.class.create({
      classname: 'Stargazing',
      classtime: '2020-08-28T16:00:00.000Z',
      classlength: '90',
      place_id: 'ChIJJe2YjTsbdkgREt0yqM9vLbk',
      address: 'St Pancras International, Euston Road, London, UK',
      lat: 51.531427,
      lng: -0.126133,
      signedup: '10',
      limit: '20',
      cost: '5',
      description: 'Stargazing in the heart of the city of London',
      category_id: outdoor.category_id,
      teacher_id: harry.user_id,
    });
    await db.class.create({
      classname: 'Yoga',
      classtime: '2020-08-29T10:30:00.000Z',
      classlength: '60',
      place_id: 'ChIJs927f9VzhlQRJ-6n2do9r_U',
      address: '927 Granville Street, Vancouver, BC, Canada',
      lat: 49.2800816,
      lng: -123.1221191,
      signedup: '10',
      limit: '20',
      cost: '10',
      description:
        'We will work on floor work, sequencing through the spine, moving safely in and out of the floor, articulating the joints, inversions and upper body strength, and unorthodox methods of expression using the body and the imagination! ',
      category_id: health.category_id,
      teacher_id: harry.user_id,
    });
    await db.class.create({
      classname: 'Potion',
      classtime: '2020-08-29T12:30:00.000Z',
      classlength: '60',
      place_id: 'ChIJURt2jFIDdkgRsxERfqYhtSo',
      address: 'Leadenhall Market, Gracechurch Street, London, UK',
      lat: 51.512766,
      lng: -0.0835289,
      signedup: '10',
      limit: '20',
      cost: '10',
      description: 'Learn how to make the love potion from Harry Potter',
      category_id: health.category_id,
      teacher_id: harry.user_id,
    });
    await db.class.create({
      classname: 'Python Beginner',
      classtime: '2020-08-28T10:30:00.000Z',
      classlength: '60',
      place_id:
        'EioxMzA3IFNleW1vdXIgU3RyZWV0LCBWYW5jb3V2ZXIsIEJDLCBDYW5hZGEiMRIvChQKEgnzZI4B1HOGVBEFSmieZKXbMRCbCioUChIJo--WOn5xhlQRQE0Bst0aVyk',
      address: '1307 Seymour Street, Vancouver, BC, Canada',
      lat: 49.275648,
      lng: -123.1269161,
      signedup: '10',
      limit: '20',
      cost: '15',
      description:
        'Python is a perfect beginner language because of its simple syntax',
      category_id: tech.category_id,
      teacher_id: harry.user_id,
    });
    await db.class.create({
      classname: 'Jazz Funk',
      classtime: '2020-08-28T14:00:00.000Z',
      classlength: '60',
      place_id: 'ChIJcdoY-dRzhlQRFsbQxZ8iylw',
      address: '1125 Howe Street, Vancouver, BC, Canada',
      lat: 49.2788687,
      lng: -123.1262039,
      signedup: '10',
      limit: '20',
      cost: '5',
      description: 'Jazz funk is a hybrid of hip hop and jazz technique.',
      category_id: music.category_id,
      teacher_id: harry.user_id,
    });
  };

  await populateMocks(categories, categoryEntries);
  await populateMocks(users, userEntries);
  await populateMocks(classes, classEntries);
};
