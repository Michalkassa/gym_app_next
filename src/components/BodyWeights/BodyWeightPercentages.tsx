import { getWeights } from "../../app/api/auth/actions"
import { BodyWeightProps } from "@/Props"
import { FaArrowUp,FaArrowDown } from "react-icons/fa6";

export default async function BodyWeightPercentages() {

  const data = await getWeights()

  function DateDaysAgo(days: number): string{
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - days);

    const formattedDate = pastDate.toLocaleDateString('es-MX');
    return formattedDate
  }

  function daysAgo(date: Date) {
    const givenDate = new Date(date);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInTime = Number(currentDate) - Number(givenDate);

    // Convert milliseconds to days
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
    return differenceInDays;
    }


    //get the weight on a particular day that is the closest to the specified number of days ago.
    function GetWeightNdaysAgo(days:number ): number{
        const res = []
        let smallest_difference = 1000000000
        let d = 0
        for(const element of data){
            d = Math.abs(days - daysAgo(element.createdAt))
            if(d < smallest_difference){
                smallest_difference = d
            }
        }
        for(const element of data){
            d = Math.abs(days - daysAgo(element.createdAt))
            if(d == smallest_difference){
                res.push(element.weight)
            }
        }

        return res[0]
    }

    //returns the weight of most recent weight
    function GetCurrentWeight(): number{
        return data.at(-1)?.weight || 0
    }

    // and rounds to 2d.p
    function PercentageChange(newValue: number, oldValue: number): number{
        //console.log(newValue)
        //console.log(oldValue)
        return parseFloat((((newValue- oldValue)/ oldValue) * 100).toFixed(2))
    }

    if(data.length > 0){
        return (
            <div className="flex justify-evenly md:gap-10 gap-5 text-white pt-2 pb-2">
                <div>
                    <p className="text-xs">in 7 days</p>
                    {(PercentageChange(GetCurrentWeight(), GetWeightNdaysAgo(7)) >= 0.0) && <p className="text-3xl text-green-600 flex">{PercentageChange(GetCurrentWeight(), GetWeightNdaysAgo(7))}% <FaArrowUp /></p>}
                    {(PercentageChange(GetCurrentWeight(), GetWeightNdaysAgo(7)) < 0.0) && <p className="text-3xl text-red-600 flex">{PercentageChange(GetCurrentWeight(), GetWeightNdaysAgo(7))}% <FaArrowDown /></p>}
                </div>
                <div>
                    <p className="text-xs">in 30 days</p>
                    {(PercentageChange(GetCurrentWeight(), GetWeightNdaysAgo(30)) >= 0.0) && <p className="text-3xl text-green-600 flex">{PercentageChange(GetCurrentWeight(), GetWeightNdaysAgo(30))}% <FaArrowUp /></p>}
                    {(PercentageChange(GetCurrentWeight(), GetWeightNdaysAgo(30)) < 0.0) && <p className="text-3xl text-red-600 flex">{PercentageChange(GetCurrentWeight(), GetWeightNdaysAgo(30))}% <FaArrowDown /></p>}
                </div>
                <div>
                    <p className="text-xs">in 1 year</p>
                    {(PercentageChange(GetCurrentWeight(), GetWeightNdaysAgo(365)) >= 0.0) && <p className="text-3xl text-green-600 flex">{PercentageChange(GetCurrentWeight(), GetWeightNdaysAgo(365))}% <FaArrowUp /></p>}
                    {(PercentageChange(GetCurrentWeight(), GetWeightNdaysAgo(365)) < 0.0) && <p className="text-3xl text-red-600 flex">{PercentageChange(GetCurrentWeight(), GetWeightNdaysAgo(365))}% <FaArrowDown /></p>}
                </div>
            </div>
          )
    }

    return (
        <div className="flex justify-evenly md:gap-10 gap-5 text-white pt-2 pb-2">
            <div>
                <p className="text-xs">in 7 days</p>
                <p className="text-3xl text-gray-500 flex">0 %</p>
            </div>
            <div>
                <p className="text-xs">in 30 days</p>
                <p className="text-3xl text-gray-500 flex">0 %</p>
            </div>
            <div>
                <p className="text-xs">in 1 year</p>
                <p className="text-3xl text-gray-500 flex">0 %</p>
            </div>
        </div>
      )

  
} 



