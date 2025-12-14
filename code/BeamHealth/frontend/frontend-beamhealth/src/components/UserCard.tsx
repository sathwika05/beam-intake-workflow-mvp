type UserCardsProps={
    type:string;
    count:number;
}

const UserCard = ({type, count}:UserCardsProps) => {

  const now = new Date();
  const fullDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;

  return (
    <div className='rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]'>
    <div className='flex justify-between items-center'>
      <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">{fullDate}</span>
    </div>
    <h1 className="text-2xl font-semibold my-4">{count}</h1>
    <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
    </div>
  );
};

export default UserCard;