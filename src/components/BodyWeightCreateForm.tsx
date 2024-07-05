import { createBodyWeight } from '@/app/api/actions';

export default async function BodyWeightCreateForm (){
  return (
    <form action={createBodyWeight} className="flex flex-col gap-y-2 text-white">
      <label htmlFor="text">add your weight for today</label>
      <input type="number" id="weight" name="weight" className="text-black border-2" />
      <button type="submit" className="border-2">
        Create
      </button>
    </form>
  );
};
