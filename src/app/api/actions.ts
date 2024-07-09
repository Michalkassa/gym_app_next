"use server"
import {auth} from '@/auth/auth'
import { revalidatePath } from 'next/cache'
import prisma from '@/app/api/prisma'

//{userId}:{userId:string}
export const getWeights = async () => {
    const session = await auth();
    const bodyWeights = await prisma.Body_Weight.findMany(
        { 
            where: {
                authorId : session?.user?.id
            },
    });
    return bodyWeights
}


export const addBodyWeight = async (formData: FormData) => {
    const session = await auth();
    const bodyWeight = formData.get('weight');
    const createWeight = await prisma.Body_Weight.create({ 
        data: {
            weight: Number(bodyWeight),
            authorId : session?.user?.id
        }
    })

    revalidatePath("/dasboard/bodyweights")
};

export const deleteBodyWeight = async (bodyweightId:string) => {
    const session = await auth();

    const deleteWeight = await prisma.Body_Weight.delete({ 
        where: {
        id: String(bodyweightId),
        authorId : session?.user?.id
        },
    })

};



export const getExercises = async () => {
    const session = await auth();
    const bodyWeights = await prisma.exercise.findMany(
        { 
            where: {
                authorId : session?.user?.id
            },
    })
    console.log(bodyWeights)
    return bodyWeights
}

export const addExercise = async (formData: FormData) => {
    const session = await auth();
    const name = formData.get('name');
    const description = formData.get('description');
    const createWeight = await prisma.exercise.create({ 
        data: {
            name: name,
            description: description,
            authorId : session?.user?.id
        }
    })

    revalidatePath("/dasboard/bodyweights")
};

export const deleteExercise = async (exerciseId:string) => {
    const session = await auth();

    const deleteExercise = await prisma.exercise.delete({ 
        where: {
        id: String(exerciseId),
        authorId : session?.user?.id
        },
    })

};
