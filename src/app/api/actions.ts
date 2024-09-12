"use server"
import {auth} from '@/auth/auth'
import { revalidatePath } from 'next/cache'
import prisma from '@/app/api/prisma'
import { Session, User } from 'next-auth'
import Exercise from '@/components/Exercises/Exercise'
import Workout from '@/components/Workouts/Workout'

//Brzycki - The most popular 1 rep max calculation formula from Matt Brzycki
const oneRepMaxCalculator = (kgWeight: number, repetitions: number) => {
    return  Math.floor((kgWeight / ( 1.0278 + (-0.0278 * repetitions))))
}


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
    const exercises = await prisma.Exercise.findMany(
        { 
            where: {
                authorId : session?.user?.id
            },
            orderBy: {
                name: 'desc',
              },
    })
    return exercises
}

export const addExercise = async (formData: FormData) => {
    const session = await auth();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const createdExercise = await prisma.Exercise.create({ 
        data: {
            name: name,
            description: description,
            authorId : session?.user?.id,
        }
    })
    revalidatePath("/dasboard/exercises")
};


export const getExercise = async (exerciseId:string) => {
    const session = await auth();
    const id = exerciseId
    const exercise = await prisma.Exercise.findUnique(
        { 
            where: {
                id : id,
                authorId : session?.user?.id
            },
    })
    revalidatePath("/dasboard/exercises")
    return exercise
};

export const getMostPopularExercises = async () => {
    const session = await auth();
    const mostPopularExercises = await prisma.Exercise.findMany(
        {
            take: 5,
            where: {
                authorId: session?.user?.id
            },
            orderBy: {
                logs: {
                    _count: 'desc'
                }
            },
            include: {
                logs: true
            }
    })
    revalidatePath("/dasboard/exercises")
    return mostPopularExercises
};

export const deleteExercise = async (exerciseId:string) => {
    const session = await auth();

    const deleteExercise = await prisma.Exercise.delete({ 
        where: {
        id: exerciseId,
        authorId : session?.user?.id
        },
    })
    revalidatePath("/dasboard/exercises")
};


export const editExercise = async (exerciseId:string, exerciseName:string, exerciseDescription:string) => {
    const id = exerciseId
    const newName = exerciseName
    const newDescription = exerciseDescription

    const editExercise = await prisma.Exercise.update({ 
        where: {
        id: id,
        },
        data: {
            name: newName,
            description: newDescription
        },
    });
    revalidatePath("/dasboard/exercises")
    revalidatePath(`/dasboard/exercises/${exerciseId}`)
};


export const getLogs = async (exerciseId:string) => {
    const session = await auth();
    const logs = await prisma.Log.findMany(
        { 
            where: {
                exerciseId: exerciseId,
            },
    })
    console.log(logs)
    return logs;
}

export const deleteLog = async (logId:string, exerciseId:string) => {
    const session = await auth();

    const deleteLog = await prisma.Log.delete({ 
        where: {
        id: logId,
        },
    })
    revalidatePath(`/dasboard/exercises/${exerciseId}`)
};


export const deleteLogs = async (exerciseId:string) => {
    const session = await auth();

    const deleteLogs = await prisma.Log.deleteMany({ 
        where: {
            exerciseId : exerciseId,
            authorId : session?.user?.id
        },
    })
};

export const addLogFromForm = async (exerciseId:string, formData:FormData) => {
    const session = await auth();
    const weight = Number(formData.get("weight"))
    const reps =  Number(formData.get("reps"))
    const createLog = await prisma.Log.create({ 
        data: {
            weight: weight,
            reps: reps,
            authorId : session?.user?.id,
            oneRepMax : oneRepMaxCalculator(weight,reps),
            exerciseId: exerciseId,
        }
    })
    revalidatePath(`/dasboard/exercises/${exerciseId}`)
};

interface LogProps {
    weight: Number,
    reps: Number,
}
export const createManyLogs = async (exerciseId:string, logs: LogProps[]) => {
    const session = await auth();
    const id = session?.user?.id
    const data = []
    for(const log of logs){
        let weight = log.weight
        let reps = log.reps
        data.push({weight: weight, reps: reps, authorId: id, oneRepMax: oneRepMaxCalculator(weight,reps), exerciseId: exerciseId})
    }
    const createLog = await prisma.Log.createMany({ 
        data: data
    })
    revalidatePath(`/dasboard/exercises/${exerciseId}`)
};



export const createLog = async (exerciseId:string, reps:number, weight:number) => {
    const session = await auth();
    const createLog = await prisma.Log.create({ 
        data: {
            weight: weight,
            reps: reps,
            authorId : session?.user?.id,
            oneRepMax : oneRepMaxCalculator(weight,reps),
            exerciseId: exerciseId,
        }
    })
    revalidatePath(`/dasboard/exercises/${exerciseId}`)
};



export const getWorkout = async (workoutId : string) => {
    const session = await auth();
    const workout = await prisma.Workout.findUnique({ 
        where: {
            id: workoutId,
            authorId : session?.user?.id,
        }
    })
    revalidatePath("/dasboard/workouts")
    return workout
};




export const getWorkouts = async () => {
    const session = await auth();
    const workouts = await prisma.Workout.findMany(
        { 
            where: {
                authorId : session?.user?.id
            },
    })
    return workouts
}

export const getExercisesWorkoutPairs = async (workoutId:string,) => {
    const ExercisesWorkoutPairs = await prisma.ExercisesOnWorkouts.findMany(
        { 
            where: {
                workoutId: workoutId
            },
            include: {
                exercise: true,
            }
    })
    return ExercisesWorkoutPairs
}

export const addWorkout = async (formData: FormData) => {
    const session = await auth();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const createdWorkout = await prisma.Workout.create({ 
        data: {
            name: name,
            description: description,
            authorId : session?.user?.id,
        }
    })
    revalidatePath("/dasboard/workouts")
};

export const editWorkout = async (workoutId:string, workoutName:string, workoutDescription:string) => {
    const id = workoutId
    const newName = workoutName
    const newDescription = workoutDescription

    const editWorkout = await prisma.Workout.update({ 
        where: {
        id: id,
        },
        data: {
            name: newName,
            description: newDescription
        },
    });
    revalidatePath("/dasboard/workouts")
    revalidatePath(`/dasboard/workouts/${workoutId}`)
};

export const deleteWorkout = async (workoutId:string) => {
    const session = await auth();

    const deleteWorkout = await prisma.Workout.delete({ 
        where: {
        id: workoutId,
        authorId: session?.user?.id
        },
    })
    revalidatePath("/dasboard/workouts")
};


export const addExerciseToWorkout = async (workoutId:string , exerciseId:string) => {
    const addExerciseToWorkout = await prisma.ExercisesOnWorkouts.create({
        data: {
            exerciseId: exerciseId,
            workoutId: workoutId
        }
    })
    revalidatePath(`/dasboard/workouts/${workoutId}`)
}

export const deleteExerciseToWorkout = async (id: string, workoutId:string) => {
    const addExerciseToWorkout = await prisma.ExercisesOnWorkouts.delete({
        where: {
            id: id
        }
    })
    revalidatePath(`/dasboard/workouts/${workoutId}`)
}
