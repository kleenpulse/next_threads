import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";

const Search = async () => {
	const user = await currentUser();

	if (!user) return null;

	const userInfo = await fetchUser(user.id);

	if (!userInfo?.onboarded) return redirect("/onboarding");

	// Fetch Users
	const result = await fetchUsers({
		userId: user.id,
		searchString: "",
		pageNumber: 1,
		pageSize: 25,
	});

	return (
		<section>
			<h1 className="head-text">Search</h1>

			<div className="mt-14 flex flex-col gap-9">
				{result.users.length === 0 ? (
					<p className="no-result">No Users found</p>
				) : (
					<>
						{result.users.map((user) => (
							<UserCard
								key={user.id}
								id={user.id}
								name={user.name}
								username={user.username}
								imageUrl={user.image}
								personType="User"
							/>
						))}
					</>
				)}
			</div>
		</section>
	);
};

export default Search;
