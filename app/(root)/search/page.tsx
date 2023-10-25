import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";


// import Searchbar from "@/components/shared/Searchbar";
// import Pagination from "@/components/shared/Pagination";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";

const page = async() => {

    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
   
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  
  return (
    <section>
       <h1 className="head-text">Search</h1> 
       {/* Search bar */}
       <div className="mt-14 flex flex-col gap-9">
          {result.users.length === 0 ? (
            <p className="no-result">No users found</p>
          ) : (
              <>
                {result.users.map((person) => (
                   <UserCard 
                   key={person._id} 
                   id={person._id}
                   name={person.name}
                   username={person.username}
                   imageUrl={person.image}
                   personType="User"
                   /> 
                ))}
              </>
          )}
       </div>
    </section>
  )
}

export default page