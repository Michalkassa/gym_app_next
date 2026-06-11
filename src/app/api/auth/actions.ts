"use server"
import { revalidatePath } from 'next/cache'
import prisma from '@/app/api/prisma'
import {redirect} from "next/navigation"
import { signIn } from '@/app/api/auth/auth'
import { auth } from './auth'
import bcrypt from 'bcryptjs'
import {
    loginSchema,
    registerSchema,
    exerciseSchema,
    workoutSchema,
    bodyWeightSchema,
    logSchema,
    firstError,
} from '@/lib/validation'
import { oneRepMaxCalculator } from '@/lib/fitness'

type prevState = {
    message: string;
}

export const SignIn = async (prevState:prevState, formData: FormData) => {
    const parsed = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    })
    if (!parsed.success) {
        return { message: firstError(parsed.error) }
    }
    const { email, password } = parsed.data

    try {
        const user = await prisma.user.findUnique({
          where: {
            email: email as string
          }
        })

        if (!user) {
          return { message: "credentials not correct"}
        }

        const isPasswordValid = await bcrypt.compare(password as string , user.password as string)

        if (!isPasswordValid) {
          return { message: "credentials not correct"}
        }
        await signIn("credentials", formData);
    }
    catch(err){
        throw err
    }
    redirect("/dashboard")
}

export const registerUser = async (prevState:prevState, formData: FormData) => {
    const parsed = registerSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirm-password"),
    })
    if (!parsed.success) {
        return { message: firstError(parsed.error) }
    }
    const { email, password } = parsed.data

    try {
        const user = await prisma.user.findUnique({
          where: {
            email: email as string
          }
        })

        if (user) {
          return { message: "user already exists"}
        }

        const hash = await bcrypt.hash(password, 10);
        
        const newUser = await prisma.user.create({
                        data: {
                            email: email,
                            password: hash 
                        }
                    })
    
        await signIn("credentials", formData); 

    }
    catch(err){
        throw err
    }
    redirect("/dashboard")
}



export const getUser = async(email:string) => {
    const user = await prisma.user.findUnique(
        { 
            where: {
                email : email
            },
    });
    return user
}

export const getWeights = async () => {
    const session = await auth();
    const bodyWeights = await prisma.body_Weight.findMany(
        { 
            where: {
                authorId : session?.user?.id
            },
            orderBy:{
                createdAt: 'asc'
            }
    });
    return bodyWeights
}


export const addBodyWeight = async (prevState:prevState, formData: FormData) => {
    const session = await auth();
    const parsed = bodyWeightSchema.safeParse({ weight: formData.get('weight') })
    if (!parsed.success) {
        return { message: firstError(parsed.error) }
    }
    const createWeight = await prisma.body_Weight.create({
        data: {
            weight: parsed.data.weight,
            authorId : session?.user?.id!
        }
    })
    revalidatePath("/dashboard/bodyweights")
    return {valid: true, message: ""}
};

export const deleteBodyWeight = async (bodyweightId:string) => {
    const session = await auth();

    const deleteWeight = await prisma.body_Weight.delete({ 
        where: {
        id: String(bodyweightId),
        authorId : session?.user?.id
        },
    })

};


export const getExercises = async () => {
    const session = await auth();
    const exercises = await prisma.exercise.findMany(
        { 
            where: {
                authorId : session?.user?.id,
            },
            orderBy: {
                name: 'desc'
              },
    })
    return exercises
}

export const addExercise = async (prevState:prevState, formData: FormData) => {
    const session = await auth();
    const parsed = exerciseSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        muscleGroup: formData.get('muscleGroup') ?? undefined,
        equipment: formData.get('equipment') ?? undefined,
    })
    if (!parsed.success) {
        return { message: firstError(parsed.error) }
    }
    const { name, description, muscleGroup, equipment } = parsed.data

    const createdExercise = await prisma.exercise.create({
        data: {
            name: name,
            description: description,
            muscleGroup: muscleGroup || null,
            equipment: equipment || null,
            authorId : session?.user?.id!,
        }
    })
    revalidatePath("/dashboard/exercises")
    return {message: "", valid: true}
};

export const getExerciseCatalog = async () => {
    const catalog = await prisma.exerciseCatalog.findMany({
        orderBy: [{ muscleGroup: 'asc' }, { name: 'asc' }],
    })
    return catalog
};


export const getExercise = async (exerciseId:string) => {
    const session = await auth();
    const id = exerciseId
    const exercise = await prisma.exercise.findUnique(
        { 
            where: {
                id : id,
                authorId : session?.user?.id
            },
    })
    revalidatePath("/dashboard/exercises")
    return exercise
};

export const getMostPopularExercises = async () => {
    const session = await auth();
    const mostPopularExercises = await prisma.exercise.findMany(
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
    revalidatePath("/dashboard/exercises")
    return mostPopularExercises
};

export const deleteExercise = async (exerciseId:string) => {
    const session = await auth();

    const deleteExercise = await prisma.exercise.delete({ 
        where: {
        id: exerciseId,
        authorId : session?.user?.id
        },
    })
    revalidatePath("/dashboard/exercises")
};


export const editExercise = async (exerciseId:string, exerciseName:string, exerciseDescription:string) => {
    const id = exerciseId
    const newName = exerciseName
    const newDescription = exerciseDescription

    const editExercise = await prisma.exercise.update({ 
        where: {
        id: id,
        },
        data: {
            name: newName,
            description: newDescription
        },
    });
    revalidatePath("/dashboard/exercises")
    revalidatePath(`/dashboard/exercises/${exerciseId}`)
};


export const getLogs = async (exerciseId:string) => {
    const session = await auth();
    const logs = await prisma.log.findMany(
        { 
            where: {
                exerciseId: exerciseId,
            },
    })
    return logs;
}

export const deleteLog = async (logId:string, exerciseId:string) => {
    const session = await auth();

    const deleteLog = await prisma.log.delete({ 
        where: {
        id: logId,
        },
    })
    revalidatePath(`/dashboard/exercises/${exerciseId}`)
};


export const deleteLogs = async (exerciseId:string) => {
    const session = await auth();

    const deleteLogs = await prisma.log.deleteMany({ 
        where: {
            exerciseId : exerciseId,
            authorId : session?.user?.id
        },
    })
};

export const addLogFromForm = async (prevState:prevState, formData: FormData) => {
    const session = await auth();
    const parsed = logSchema.safeParse({
        exerciseId: formData.get("exerciseId"),
        weight: formData.get("weight"),
        reps: formData.get("reps"),
    })
    if (!parsed.success) {
        return { message: firstError(parsed.error) }
    }
    const { exerciseId, weight, reps } = parsed.data
    const createLog = await prisma.log.create({
        data: {
            weight: weight,
            reps: reps,
            authorId : session?.user?.id!,
            oneRepMax : oneRepMaxCalculator(weight,reps),
            exerciseId: exerciseId,
        }
    })
    revalidatePath(`/dashboard/exercises/${exerciseId}`)
    return {message: "", valid: true}
};

interface LogProps {
    weight: number,
    reps: number,
}
export const createManyLogs = async (exerciseId:string, logs: LogProps[]) => {
    const session = await auth();
    const id = session?.user?.id!
    const data = []
    for(const log of logs){
        let weight = log.weight
        let reps = log.reps
        data.push({weight: weight, reps: reps, authorId: id, oneRepMax: oneRepMaxCalculator(weight,reps), exerciseId: exerciseId})
    }
    const createLog = await prisma.log.createMany({ 
        data: data
    })
    revalidatePath(`/dashboard/exercises/${exerciseId}`)
};



export const createLog = async (exerciseId:string, reps:number, weight:number) => {
    const session = await auth();
    const createLog = await prisma.log.create({ 
        data: {
            weight: weight,
            reps: reps,
            authorId : session?.user?.id!,
            oneRepMax : oneRepMaxCalculator(weight,reps),
            exerciseId: exerciseId,
        }
    })
    revalidatePath(`/dashboard/exercises/${exerciseId}`)
};



export const getWorkout = async (workoutId : string) => {
    const session = await auth();
    const workout = await prisma.workout.findUnique({ 
        where: {
            id: workoutId,
            authorId : session?.user?.id,
        }
    })
    revalidatePath("/dashboard/workouts")
    return workout
};




export const getWorkouts = async () => {
    const session = await auth();
    const workouts = await prisma.workout.findMany(
        { 
            where: {
                authorId : session?.user?.id
            },
    })
    return workouts
}

export const getExercisesWorkoutPairs = async (workoutId:string) => {
    const ExercisesWorkoutPairs = await prisma.exercisesOnWorkouts.findMany(
        { 
            where: {
                workoutId: workoutId
            },
            include: {
                exercise: true,
            }
    })
    if (ExercisesWorkoutPairs) {
        return ExercisesWorkoutPairs
    }
    return []
}

export const addWorkout = async (prevState:prevState,formData: FormData) => {
    const session = await auth();
    const parsed = workoutSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    })
    if (!parsed.success) {
        return { message: firstError(parsed.error) }
    }
    const { name, description } = parsed.data

    const createdWorkout = await prisma.workout.create({
        data: {
            name: name,
            description: description,
            authorId : session?.user?.id!,
        }
    })
    revalidatePath("/dashboard/workouts")
    revalidatePath("/dashboard/runningworkout")
    return {message: "", valid: true}
};

export const editWorkout = async (workoutId:string, workoutName:string, workoutDescription:string) => {
    const id = workoutId
    const newName = workoutName
    const newDescription = workoutDescription

    const editWorkout = await prisma.workout.update({ 
        where: {
        id: id,
        },
        data: {
            name: newName,
            description: newDescription
        },
    });
    revalidatePath("/dashboard/workouts")
    revalidatePath(`/dashboard/workouts/${workoutId}`)
};

export const deleteWorkout = async (workoutId:string) => {
    const session = await auth();

    const deleteWorkout = await prisma.workout.delete({ 
        where: {
        id: workoutId,
        authorId: session?.user?.id
        },
    })
    revalidatePath("/dashboard/workouts")
};


export const addExerciseToWorkout = async (workoutId:string , exerciseId:string) => {
    const checkExistance = await prisma.exercisesOnWorkouts.findMany({
        where: {
            exerciseId: exerciseId,
            workoutId: workoutId
        }
    })
    if(checkExistance.length != 0) return

    const addExerciseToWorkout = await prisma.exercisesOnWorkouts.create({
        data: {
            exerciseId: exerciseId,
            workoutId: workoutId
        }
    })

    revalidatePath(`/dashboard/workouts/${workoutId}`)
    revalidatePath(`/dashboard/runningworkout/${workoutId}`)
}

export const deleteExerciseToWorkout = async (id: string, workoutId:string) => {
    const addExerciseToWorkout = await prisma.exercisesOnWorkouts.delete({
        where: {
            id: id
        }
    })
    revalidatePath(`/dashboard/workouts/${workoutId}`)
    revalidatePath(`/dashboard/runningworkout/${workoutId}`)
}

export const getPreviousLogs = async ( exerciseId: string, orderOfPrevious: number) => {
    const logs = await prisma.log.findMany({
        where: {
            exerciseId: exerciseId
        },
        orderBy:{
            createdAt: "desc"
        },
        take: orderOfPrevious,
    })
    return logs
}