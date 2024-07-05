"use server"
import { PrismaClient } from '@prisma/client'
import {auth} from '@/auth/auth'
import { revalidatePath } from 'next/cache'
import Chart from '@/components/BodyWeightChart'
const prisma = new PrismaClient()
//{userId}:{userId:string}
export const getWeights = async () => {
    const bodyWeights = await prisma.Body_Weight.findMany();
    return bodyWeights
}

export const createBodyWeight = async (formData: FormData) => {
    const session = await auth();
    const bodyWeight = formData.get('weight');
    console.log(session)
    const createWeight = await prisma.body_Weight.create({ data: {
        weight: Number(bodyWeight),
    } , })

    revalidatePath("/dasboard/bodyweights")

    // model Body_Weight {
    //     id        String     @default(cuid()) @id
    //     weight     Int
    //     author    User?   @relation(fields: [authorId], references: [id])
    //     authorId  String?
    //     createdAt DateTime @default(now())
    //   }
  };