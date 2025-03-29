import CircularProgress from '@mui/joy/CircularProgress';


export default function LoadingComponent() {

  return (
    <div className="text-white h-full min-w-full flex justify-center items-center">
        <CircularProgress  variant="plain"/>
    </div>
    
  )
} 
