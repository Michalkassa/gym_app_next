import Navbar from "@/components/Navbar"
import { getUsers } from "./api/actions";

export default async function Home() {
  //const users = await getUsers();
  
  return (
    <div>
      <Navbar/>
      <h1>home page</h1>
    </div>
  );
}