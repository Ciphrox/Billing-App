import { PrismaClient } from "@prisma/client";
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
  console.log('in queries')
  console.log(item);
  console.log(typeof item.name)
  await prisma.items.create({
    data: {
      name: item.name,
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
  console.log('id', id, )
  // console.log('userId', userId)
  // console.log('item deleted')
  await prisma.items.delete({
    where: {
      id: id,
      userId: userId,
    },
  });
};
