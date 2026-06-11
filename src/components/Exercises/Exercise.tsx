import Link from "next/link"

interface ExerciseProps {
    id: string,
    name: string,
    description: string,
}


export default function Exercise({ id , name , description} : ExerciseProps) {
    return(
        <Link key={id} href={`/dashboard/exercises/${id}`} className="card block transition hover:border-white/10 hover:bg-white/[0.05]">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="mt-1 text-sm text-gray-400 limited-text">{description}</p>
        </Link>
    )
}