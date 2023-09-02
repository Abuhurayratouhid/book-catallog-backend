import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllBooks = async () => {
  const result = await prisma.book.findMany();

  return result;
};

const getSingleBook = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateBook = async (id: string, data: Partial<Book>) => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteBook = async (id: string) => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
