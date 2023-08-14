import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Activity = async () => {
	const user = await currentUser();

	if (!user) return null;

	const userInfo = await fetchUser(user.id);

	if (!userInfo?.onboarded) return redirect("/onboarding");

	const activity = await getActivity(userInfo._id);

	return (
		<section>
			<h1 className="head-text">Activity</h1>

			<section className="mt-10 flex flex-col gap-5">
				{activity.length > 0 ? (
					<>
						{activity.map((activity) => (
							<Link href={`/thread/${activity.parentId}`} key={activity._id}>
								<article className="activity-card">
									<div className="relative h-10 w-10">
										<Image
											src={activity.author.image}
											alt="logo"
											fill
											className="rounded-full object-cover"
										/>
									</div>
									<p className="!text-small-regular text-light-1">
										<span className="mr-1 text-primary-500">
											{activity.author.name}
										</span>{" "}
										replied to your thread
									</p>
								</article>
							</Link>
						))}
					</>
				) : (
					<p className="!text-base-regular text-light-3">No Activity yet</p>
				)}
			</section>
		</section>
	);
};

export default Activity;
