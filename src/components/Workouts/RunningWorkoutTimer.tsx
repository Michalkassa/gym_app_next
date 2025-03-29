import {useState, useEffect} from "react"

interface Timer {
    submit: boolean; 
}


export default function RunningWorkoutTimer({submit}: Timer){
    const [startTime, setStartTime] = useState<any>();
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        try{
            setStartTime(JSON.parse(localStorage.getItem('timer') || `${Date.now}`))
        }
        catch{
            setStartTime(Date.now())
        }
    });

    useEffect(() => {
        localStorage.setItem('timer', JSON.stringify(startTime))
    }, [startTime]);

    const getTime = (t:any) => {
        const time =  t - Date.now();
        console.log(time)
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(startTime), 1000);
    
        return () => clearInterval(interval);
      }, []);
    

    useEffect(() => {
        console.log("submit")
        setStartTime(0)
    }, [submit])

    return (   
        <div className="flex flex-row justify-evenly">
            <div className="flex flex-row justify-evenly">
            <p className="text-3xl">
            {Math.floor(hours/10)%10}
            </p>    
            <p className="text-3xl">
            {Math.floor(hours%10)} 
            </p>
            <p className="text-3xl">
                :
            </p>
            <p className="text-3xl">
                {Math.floor(minutes/10)%10}
            </p>
            <p className="text-3xl">
                {Math.floor(minutes%10)} 
            </p>
            <p className="text-3xl">
                :
            </p>
            <p className="text-3xl">
                {Math.floor(seconds/10)%10}
            </p>
            <p className="text-3xl">
                {Math.floor(seconds%10)} 
            </p>
            </div>
        </div>
    )
}