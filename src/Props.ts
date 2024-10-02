
export interface ModalProps{
    modalOpen:boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children : React.ReactNode;
}

export interface BodyWeightProps {
    id: string,
    date: string,
    weight: number,
}

export interface ExerciseProps {
    id: string,
    name: string,
    description: string,
}


export interface ExerciseWorkoutProps {
    id: string,
    name: string
    workoutId: string;
    exerciseId: string;
    submit: boolean; 
    setSubmit: void
}

export interface LogProps {
    id: string,
    weight: number ,
    reps: number,
    exerciseId: string,
}

export interface WorkoutProps {
    id: string,
    name: string,
    description: string,
}

export interface ExerciseWorkoutPairProps{
    id: string
    exercise: ExerciseProps
    exerciseId: string
    workout : WorkoutProps
    workoutId:string
}

