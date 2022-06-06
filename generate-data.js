const faker = require('faker');
const fs = require('fs');

// Set locale to Vietnamese
faker.locale = 'vi';

const randomCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, n) => {
  if (n <= 0) return [];

  return categoryList.flatMap(({ id: categoryId }) =>
    Array.from(new Array(n)).map(() => ({
      categoryId,
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      color: faker.commerce.color(),
      price: +faker.commerce.price(),
      description: faker.commerce.productDescription(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      thumbnailUrl: faker.image.imageUrl(400, 400),
    }))
  );
};

(() => {
  const numCategories = 4;
  const numProductsEachCategory = 5;

  // Random data
  const categoryList = randomCategoryList(numCategories);
  const productList = randomProductList(categoryList, numProductsEachCategory);

  // Prepare db object
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'VxC',
    },
  };

  // Write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully!');
  });
})();
