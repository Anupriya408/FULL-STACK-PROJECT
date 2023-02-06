const fs = require("fs/promises");

const getAlldataFile = async () => {
  const result = await fs.readFile("./posts.json", {
    encoding: "utf-8",
  });
  let tempResult = JSON.parse(result);

  return tempResult.products;
};
const writeDatainJSON = async (products) => {
  let temp = JSON.stringify(products, null, 2);
  await fs.writeFile("./posts.json", temp);
};

const getdatALL = async () => {
  let temp = await getAlldataFile();
  return temp;
};
const getSingleData = async (id) => {
  let data = await getAlldataFile();
  return data.find((element) => {
    if (element.id == id) {
      return element;
    }
  });
};

const createData = async (element) => {
  let products = await getAlldataFile();
  let id = -1;
  products.forEach((element) => {
    if (element.id > id) {
      id = element.id;
    }
  });
  id++;
  let temp = {
    ...element,
    id: id,
  };
  products.push(temp);
  let product = { products: products };
  await writeDatainJSON(product);
  return temp;
};

const patchData = async (id, element) => {
  let products = await getAlldataFile();
  let index = -1;
  products.forEach((element, ind) => {
    if (element.id == id) {
      index = ind;
    }
  });
  products[index] = {
    ...products[index],
    ...element,
  };
  let product = { products };
  await writeDatainJSON(product);
  return products[index];
};

const deleteData = async (id) => {
  let products = await getAlldataFile();
  let index = -1;
  products.forEach((element, ind) => {
    if (element.id == id) {
      index = ind;
    }
  });
  if (index != -1) {
    let sp = products.splice(index, 1);
    let prod = { products };

    await writeDatainJSON(prod);
    return sp[0];
  } else {
    return null;
  }
};
module.exports = {
  getdatALL,
  getSingleData,
  createData,
  deleteData,
  patchData,
};
