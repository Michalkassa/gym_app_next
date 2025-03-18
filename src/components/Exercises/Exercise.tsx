import Link from "next/link"

interface ExerciseProps {
    id: string,
    name: string,
    description: string,
}


export default function Exercise({ id , name , description} : ExerciseProps) {
    return(
        <Link className="min-w-full" href={`/dashboard/exercises/${id}`}>
        <div key={id} className="">
            <div className="flex flex-col p-2 text-white">
                <h1 className="flex text-3xl justify-center">{name}</h1>
                <p className="flex text-center justify-center text-md">{description.slice(0, 100)}... &zwnj; </p>
            </div>
            <hr className="text-light_gray text-xs"></hr>
        </div>
        </Link>
    )
}