import { faker } from "@faker-js/faker";

// Function to generate a random BillItem
const generateBillItem = (billId) => {
  return {
    batchId: faker.string.uuid(),
    name: faker.commerce.productName(),
    type: faker.commerce.productMaterial(),
    price: faker.number.int({ min: 50, max: 500 }),
    quantity: faker.number.int({ min: 1, max: 10 }),
    expiry: faker.date.future().toISOString(),
    amount: faker.number.int({ min: 50, max: 5000 }),
    billId: billId,
  };
};

// Function to generate a random Bill with multiple BillItems
const generateBill = (billId, numItems) => {
  const items = [];

  for (let i = 0; i < numItems; i++) {
    items.push(generateBillItem(billId));
  }

  return {
    billId: billId,
    items: items,
  };
};

// Function to generate a random DayBilling with multiple Bills
const generateDayBilling = (date, userId, numBills) => {
  const bills = [];

  for (let i = 0; i < numBills; i++) {
    bills.push(
      generateBill(faker.number.int(), faker.number.int({ min: 2, max: 10 })),
    );
  }

  return {
    date: date,
    userId: userId,
    bills: bills,
  };
};

// Generate a large dataset with random dates, users, and bills
const generateLargeDataset = (numDates) => {
  const dataset = [];

  for (let i = 0; i < numDates; i++) {
    const date = faker.date.past().toISOString();
    const userId = faker.string.uuid();

    dataset.push(
      generateDayBilling(date, userId, faker.number.int({ min: 2, max: 10 })),
    );
  }

  return dataset;
};

// Generate dataset with 10 random dates
const largeDataset = generateLargeDataset(10);

// console.log(largeDataset);
export default largeDataset;
