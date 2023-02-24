import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      bio: req.body.bio,
    },
  });

  res.status(200).send(user);
}
