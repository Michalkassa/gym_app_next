import Link from "next/link"

interface ExerciseProps {
    id: string,
    name: string,
    description: string,
}


export default function Exercise({ id , name , description} : ExerciseProps) {
    return(
        <Link href={`/dashboard/exercises/${id}`}>
        <div key={id} className="w-90 h-64 hover:scale-110 duration-200 p-3">
            <div className="flex flex-col bg-sleek_gray p-10 justify-center text-white h-full">
                <h1 className="flex text-3xl justify-center">{name}</h1>
                <p className="flex text-center justify-center limited-text">{description}</p>
            </div>
        </div>
        </Link>
    )
}