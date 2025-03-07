"use server"
import {GET} from "@/app/api/auth/auth"
import { revalidatePath } from 'next/cache'
import AddBodyWeight from "@/components/BodyWeights/AddBodyWeight"
import prisma from '@/app/api/prisma'
import {redirect} from "next/navigation"
import { signIn } from '@/app/api/auth/auth'
import { auth } from './auth';
//Brzycki - The most popular 1 rep max calculation formula from Matt Brzycki
const oneRepMaxCalculator = (kgWeight: number, repetitions: number):number => {
    return  Math.floor((kgWeight / ( 1.0278 + (-0.0278 * repetitions))))
}

export const SignIn = async (state: any, formData: any) => {
    const email = formData.get("email")
    const password = formData.get("password")
    
    if (!email && !password){
        return { message: "Login data is Missing"}
    } 
    if (!email){
        return { message: "Please Enter an Email"}
    } 
    if (!password){
        return { message: "Please Enter a Password"}
    } 

    let validEmail = false
    for(let i = 0; i <= email.length; i++){
        if(email[i] == '@'){
            validEmail = true
            break
        }
    }

    if(validEmail == false){
        return { message: "Not a valid email"}
    }



    try {
        const user = await prisma.user.findUnique({
          where: {
            email: email as string
          }
        })

        if (!user) {
          return { message: "credentials not correct"}
        }

        const isPasswordValid = (password == (user.password as string)) //TODO change to zcrypt compare

        if (!isPasswordValid) {
          return { message: "credentials not correct"}
        }
        await signIn("credentials", formData);
    }
    catch{}
    redirect("/dashboard")
}

export const registerUser = async (state: any, formData: any) => {
    const email = formData.get("email")
    const password = formData.get("password")
    const repeatPassword = formData.get("confirm-password")

    if (!email && !password){
        return { message: "Login data is Missing"}
    } 
    if (!email){
        return { message: "Please enter an Email"}
    } 
    if (!password){
        return { message: "Please enter a password"}
    } 
    if (password != repeatPassword){
        return { message: "Passwords are not identical"}
    } 
    if (password.length < 5){
        return { message: "Password too short "}
    } 

    try {
        const user = await prisma.user.findUnique({
          where: {
            email: email as string
          }
        })

        if (user) {
          return { message: "user allready exists"}
        }

        const createdUser = await prisma.user.create({
            data: {
                email: email,
                password: password //TODO make sure this is encrypted
            }
          })
        await signIn("credentials", formData);
    }
    catch{}
    redirect("/dashboard")
}



export const getUser = async({props}:any) => {
    const user = await prisma.user.findUnique(
        { 
            where: {
                email : props.email
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


export const addBodyWeight = async (state: any, formData: any) => {
    const session = await auth();
    const bodyWeight = formData.get('weight');
    if(!bodyWeight){
        return {message: "Please Enter a Weight"}
    }
    const createWeight = await prisma.body_Weight.create({ 
        data: {
            weight: Number(bodyWeight),
            authorId : session?.user?.id!
        }
    })
    revalidatePath("/dasboard/bodyweights")
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

export const addExercise = async (state: any, formData: any) => {
    const session = await auth();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    if(name.length > 15){
        return {message: "Please choose a Shorter name"}
    }

    if(name == "" || description == ""){
        return {message: "Enter the Name and a Description"}
    }

    const createdExercise = await prisma.exercise.create({ 
        data: {
            name: name,
            description: description,
            authorId : session?.user?.id!,
        }
    })
    revalidatePath("/dasboard/exercises")
    return {message: "", valid: true}
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
    revalidatePath("/dasboard/exercises")
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
    revalidatePath("/dasboard/exercises")
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
    revalidatePath("/dasboard/exercises")
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
    revalidatePath("/dasboard/exercises")
    revalidatePath(`/dasboard/exercises/${exerciseId}`)
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
    revalidatePath(`/dasboard/exercises/${exerciseId}`)
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

export const addLogFromForm = async (state:any, formData:any) => {
    const session = await auth();
    const exerciseId = formData.get("exerciseId") as string
    const weight = Number(formData.get("weight"))
    const reps =  Number(formData.get("reps"))

    if(!exerciseId || !weight || !reps){
        return {message: "enter a weight and the reps"}
    }
    const createLog = await prisma.log.create({ 
        data: {
            weight: weight,
            reps: reps,
            authorId : session?.user?.id!,
            oneRepMax : oneRepMaxCalculator(weight,reps),
            exerciseId: exerciseId,
        }
    })
    revalidatePath(`/dasboard/exercises/${exerciseId}`)
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
    revalidatePath(`/dasboard/exercises/${exerciseId}`)
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
    revalidatePath(`/dasboard/exercises/${exerciseId}`)
};



export const getWorkout = async (workoutId : string) => {
    const session = await auth();
    const workout = await prisma.workout.findUnique({ 
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
    const workouts = await prisma.workout.findMany(
        { 
            where: {
                authorId : session?.user?.id
            },
    })
    return workouts
}

export const getExercisesWorkoutPairs = async (workoutId:string,) => {
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

export const addWorkout = async (state: any, formData: any) => {
    const session = await auth();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    if(name.length > 15){
        return {message: "Please choose a Shorter name"}
    }
    if(name == "" || description == ""){
        return {message: "Enter the Name and a Description"}
    }

    const createdWorkout = await prisma.workout.create({ 
        data: {
            name: name,
            description: description,
            authorId : session?.user?.id!,
        }
    })
    revalidatePath("/dasboard/workouts")
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
    revalidatePath("/dasboard/workouts")
    revalidatePath(`/dasboard/workouts/${workoutId}`)
};

export const deleteWorkout = async (workoutId:string) => {
    const session = await auth();

    const deleteWorkout = await prisma.workout.delete({ 
        where: {
        id: workoutId,
        authorId: session?.user?.id
        },
    })
    revalidatePath("/dasboard/workouts")
};


export const addExerciseToWorkout = async (workoutId:string , exerciseId:string) => {
    const checkExistance = await prisma.exercisesOnWorkouts.findMany({
        where: {
            exerciseId: exerciseId,
            workoutId: workoutId
        }
    })
    console.log(checkExistance)
    if(checkExistance.length != 0) return

    const addExerciseToWorkout = await prisma.exercisesOnWorkouts.create({
        data: {
            exerciseId: exerciseId,
            workoutId: workoutId
        }
    })

    revalidatePath(`/dasboard/workouts/${workoutId}`)
    revalidatePath(`/dashboard/runningworkout/${workoutId}`)
}

export const deleteExerciseToWorkout = async (id: string, workoutId:string) => {
    const addExerciseToWorkout = await prisma.exercisesOnWorkouts.delete({
        where: {
            id: id
        }
    })
    revalidatePath(`/dasboard/workouts/${workoutId}`)
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