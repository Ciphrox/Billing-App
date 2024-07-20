import { BillItem, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUpdateUser = async (id: string, name: string) => {
  await prisma.user.upsert({
    where: {
      id: id as string,
      name: name as string,
    },
    create: {
      id: id as string,
      name: name as string,
    },
    update: { name },
  });
};

interface createItemBody {
  name: string;
  type: string;
  price: number;
}

export const createItem = async (id: string, item: createItemBody) => {
  // console.log('in queries')
  // console.log(item);
  // console.log(typeof item.name)
  await prisma.items.create({
    data: {
      name: item.name.toLowerCase(),
      type: item.type,
      price: item.price,
      userId: id,
    },
  });
};

export const getItems = async (id: string) => {
  try {
    const item = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        Item: {
          orderBy: {
            name: "asc", // Order items by name ascending
          },
        },
      },
    });

    return item?.Item;
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (id: number, userId: string) => {
  // console.log('id', id, )
  // console.log('userId', userId)
  // console.log('item deleted')
  await prisma.items.delete({
    where: {
      id: id,
      userId: userId,
    },
  });
};

interface Billing {
  Date: Date;
  bill: {
    id: number;
    batchNo: string;
    name: string;
    type: string;
    price: number;
    quantity: number;
    expiryDate: Date;
    amount: number;
    billId: number;
  }[];
}

export const createBill = async (id: string, data: Billing, userId: string) => {
  console.log("in queries");
  console.log(data);

  const { Date: billDate, bill } = data;

  try {
    // Check if a DayBilling entry already exists for the given date and userId
    let existingDayBilling = await prisma.dayBilling.findUnique({
      where: {
        date_userId: {
          date: new Date(billDate),
          userId: userId,
        },
      },
      include: {
        Billing: true,
      },
    });

    let dayBillingId: number;

    if (existingDayBilling) {
      // DayBilling entry exists, use its ID
      dayBillingId = existingDayBilling.id;
    } else {
      // DayBilling entry does not exist, create a new one
      const newDayBilling = await prisma.dayBilling.create({
        data: {
          date: new Date(billDate),
          userId: userId,
        },
      });

      dayBillingId = newDayBilling.id;
    }

    // Create new Billing entries under the existing or new DayBilling entry
    const createdBillingEntries = await Promise.all(
      bill.map((item) =>
        prisma.billing.create({
          data: {
            DayBillingId: dayBillingId,
            BillItem: {
              create: {
                batchId: item.batchNo,
                name: item.name,
                type: item.type,
                price: item.price,
                quantity: item.quantity,
                expiry: new Date(item.expiryDate),
                amount: item.amount,
              },
            },
          },
        })
      )
    );

    console.log('Created Billing entries:', createdBillingEntries);
  } catch (error) {
    console.error('Error creating data:', error);
  }

  // console.log(data.date.toLocaleDateString())
  // console.log(bill[0].expiryDate);
};

export const getUserDailyBills = async (id: string) => {
  try {
    const dailyBills = await prisma.dayBilling.findMany({
      where: {
        userId: id,
      },
      include: {
        Billing: {
          include: {
            BillItem: true,
          },
        },
      },
    });

    // console.log('Daily Bills:', dailyBills);
    return dailyBills;
  } catch (error) {
    throw error;
  }
};

export const deleteDayBill = async (userId: string, dayBillId: number) => {
  try {
    await prisma.dayBilling.delete({
      where: {
        id: dayBillId,
        userId: userId,
      },
    });
  } catch (error) {
    throw error;
  }

  return;
};
