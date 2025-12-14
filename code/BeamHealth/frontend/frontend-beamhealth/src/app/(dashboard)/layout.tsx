import Link from "next/link";
import Image from "next/image";
import Menu from "../../components/Menu";
import Navbar from "../../components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen flex">
   {/* LEFT */}  
   <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-teal-200 p-4'>
    <Link href="/admin" className="flex items-center lg:justify-center gap-2">
    <Image src="/logo.jpeg" alt="logo" width={32} height={32}/>
    <span className="hidden lg:block">Beam Health</span>
    </Link>
    <Menu/>
   </div>
   {/* RIGHT */} 
   <div className='w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll'>
  <Navbar/>
  <div className="p-4">{children}</div>
  </div>
  </div>;
}

