import Link from "next/link";
import Image from "next/image";

const menuItems = [
{
   title: "MENU",
   items: [
    {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
    },
    {
        icon: "/next-day.jpg",
        label: "Next-Day Appointments",
        href: "/admin/next-day-appointments",
    },
    {
        icon: "/bookings.png",
        label: "All Bookings",
        href: "/admin/bookings",
    },
    {
        icon: "/availableappointments.jpg",
        label: "Available Appointments",
        href: "/admin/available-appointments",
    },
   ]
}
];

const Menu = () => {
  return (
    <div className='mt-4 text-sm'>
    {menuItems.map(i=>(
       <div className='flex flex-col gap-2' key={i.title}> 
       <span className="hidden lg:block text-gray-400 font-light my-4">{i.title}</span>
       {i.items.map(item=>(
        <Link href={item.href} key={item.label} className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2">
        <Image src={item.icon} alt={item.label} width={20} height={20} />
        <span className="hidden lg:block">{item.label}</span>
        </Link>
       ))}
       </div>
    ))}
    </div>
  );
};

export default Menu;