import prisma from "./prisma";

export const prepareFeed: any = async (ctx: { query: any; }) => {
  const queryParams = ctx.query;
  const needles =
    queryParams?.search && queryParams.search !== ""
      ? queryParams.search.split(" ")
      : [];

  const filters =
    queryParams?.filters && queryParams.filters !== ""
      ? queryParams.filters.split(" ")
      : [];

  const conditions = [];

  const searchConditions = [];
  for (const needle of needles) {
    searchConditions.push(
        { id: { equals: needle } },
        { user: { email: { contains: needle } } },
        { description: { contains: needle } },
        { name: { contains: needle } }
    );
  }

  if (searchConditions.length > 0) {
    conditions.push({
      OR: [...searchConditions],
    });
  }

  for (const filter of filters) {
    conditions.push({
      name: { contains: filter }
    });
  }

  const rawFeed = await prisma.post.findMany({
    where: {
      AND: [
        ...conditions,
        { isPublic: true },
      ],
    },
    include: {
      user: {
        select: { email: true },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  await prisma.$disconnect();
  // This approach fix the issue with isSerializable method on nextjs lib, 
  // For more info, please check: https://github.com/vercel/next.js/issues/13209
  return JSON.parse(JSON.stringify(rawFeed));
};