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
    await db.class.create({
      classname: 'Salsa',
      classtime: '2020-08-28T16:00:00.000Z',
      classlength: '90',
      place_id:
        'EiczNiBSb2Jzb24gU3RyZWV0LCBWYW5jb3V2ZXIsIEJDLCBDYW5hZGEiMBIuChQKEgll5LCzfXGGVBEQVECnaHlmORAkKhQKEgmHZZnrgHGGVBFjdj65SxrlXA',
      address: '36 Robson Street, Vancouver, BC, Canada',
      lat: 49.2775172,
      lng: -123.1146915,
      signedup: '10',
      limit: '20',
      cost: '5',
      description: 'Fun Salsa class for complete beginners',
      category_id: dance.category_id,
      teacher_id: bart.user_id,
    });
    await db.class.create({
      classname: 'Comtemporary 1',
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
      category_id: dance.category_id,
      teacher_id: bart.user_id,
    });
    await db.class.create({
      classname: 'Jazz 1',
      classtime: '2020-08-29T12:30:00.000Z',
      classlength: '60',
      place_id: 'ChIJSRFcFHlxhlQRgMgoae58xoY',
      address: '505 Hamilton Street, Vancouver, BC, Canada',
      lat: 49.2820991,
      lng: -123.111367,
      signedup: '10',
      limit: '20',
      cost: '10',
      description:
        'Our Jazz is mostly commercial style. Classes includes warm-up exercises, isolations, steps and choreography. Recorded popular music is used. Mix of Lyrical, pop, and New York Style',
      category_id: dance.category_id,
      teacher_id: bart.user_id,
    });
    await db.class.create({
      classname: 'Heels',
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
      description: 'This sexy, steamy class will bring out your inner Beyonce.',
      category_id: dance.category_id,
      teacher_id: bart.user_id,
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
      category_id: dance.category_id,
      teacher_id: bart.user_id,
    });
  };

  await populateMocks(categories, categoryEntries);
  await populateMocks(users, userEntries);
  await populateMocks(classes, classEntries);
};
