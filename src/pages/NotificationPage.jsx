import { GoInbox } from "react-icons/go";
import { BsSend } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";
import GlobalContext from "@/context/GlobalContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const NotificationPage = () => {
    const context = useContext(GlobalContext);
    const {open} = context;
    
  return (
    <section className="z-0">
        <div className={open? 'pt-24 pl-24 max-w-[100vw] duration-1000 z-0': 'pt-24 pl-[16.5rem] max-w-[100vw] duration-1000 z-0'}>
            <h2 className="text-xl font-bold text-center">Notifications</h2>
            <div className="flex mt-6">
                <div className="flex flex-col bg-gray-100 px-4 py-2 fixed">
                    <Link to={'/notification/inbox'} className="flex gap-4 px-4 py-2 cursor-pointer hover:bg-black/10">
                        <GoInbox className="text-2xl"/>
                        <p className="font-semibold">Inbox</p>
                    </Link>
                    <Link to={'/notification/sent'} className="flex gap-4 mt-4 px-4 py-2 cursor-pointer hover:bg-black/10">
                        <BsSend className="text-2xl"/>
                        <p className="font-semibold">Sent</p>
                    </Link>
                    <Link to={'/notification/draft'} className="flex gap-4 mt-4 px-4 py-2 cursor-pointer hover:bg-black/10">
                        <RiDraftLine className="text-2xl"/>
                        <p className="font-semibold">Draft</p>
                    </Link>
                </div>

                <div className="px-12 py-8 border shadow-md flex-grow ml-[10rem]">
                    <p className="text-2xl font-semibold my-6">Inbox</p>
                    <div className="grid grid-cols-6 gap-4 py-6 border-b border-gray-200">
                        <div className="col-start-1 col-end-1">
                            <p className="font-semibold">From</p>
                        </div>
                        <div className="col-start-2 col-end-6">
                            <p className="font-semibold">Subject </p>
                        </div>
                        <div className="col-start-6 col-end-7">
                            <p className="font-semibold">Date</p>
                        </div>
                    </div>

                   <div className="grid grid-cols-6 gap-4 py-4 border-b border-gray-200">
                        <div className="col-start-1 col-end-1">
                            <p>John</p>
                        </div>
                        <div className="col-start-2 col-end-6">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus beatae ad nemo nisi deserunt dolore quasi quos enim voluptatum excepturi reprehenderit quo veniam nostrum facere ipsa officia, sit dolorem alias?</p>
                        </div>
                        <div className="col-start-6 col-end-7">
                            <p>22/3/24</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-6 gap-4 py-4 border-b border-gray-200">
                        <div className="col-start-1 col-end-1">
                            <p>Lisa</p>
                        </div>
                        <div className="col-start-2 col-end-6">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus beatae ad nemo nisi deserunt dolore quasi quos enim voluptatum excepturi reprehenderit quo veniam nostrum facere ipsa officia, sit dolorem alias?</p>
                        </div>
                        <div className="col-start-6 col-end-7">
                            <p>27/3/24</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-6 gap-4 py-4 border-b border-gray-200">
                        <div className="col-start-1 col-end-1">
                            <p>Mary</p>
                        </div>
                        <div className="col-start-2 col-end-6">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus beatae ad nemo nisi deserunt dolore quasi quos enim voluptatum excepturi reprehenderit quo veniam nostrum facere ipsa officia, sit dolorem alias?</p>
                        </div>
                        <div className="col-start-6 col-end-7">
                            <p>26/3/24</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
  )
}

export default NotificationPage
