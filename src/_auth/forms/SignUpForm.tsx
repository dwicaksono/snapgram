import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/validation";
import { Loader } from "@/components/shared";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
	useCreateUserAccountMutation,
	useSignInAccountMutation,
} from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";

const SignUpForm = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const { checkAuthUser } = useUserContext();

	// 1. Define your form.
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		},
	});

	const {
		mutateAsync: createUserAccount,
		isPending: isPendingCreateUserAccount,
	} = useCreateUserAccountMutation();

	const { mutateAsync: sigInAccount } = useSignInAccountMutation();

	// 2. Define a submit handler.
	async function onSubmit(user: z.infer<typeof signUpSchema>) {
		// Do something with the form user.
		// ✅ This will be type-safe and validated.
		const newUser = await createUserAccount(user);
		if (!newUser) {
			toast({ title: "Sign up failed. Please try again." });
			return;
		}

		const session = await sigInAccount({
			email: user.email,
			password: user.password,
		});

		if (!session) toast({ title: "Sign in failed. Please try again." });
		const isLoggedIn = await checkAuthUser();
		if (isLoggedIn) {
			form.reset();
			navigate("/");
		} else {
			toast({ title: "Sign in failed. Please try again." });
		}
		console.log(newUser);
	}

	return (
		<Form {...form}>
			<div className="sm:w-420 flex-center flex-col">
				<img src="/assets/images/logo.svg" alt="logo" />
				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
					Create a new account{" "}
				</h2>
				<p className="text-light-3 small-medium md:base-regular ">
					To use Snapgram enter your details
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5 w-full mt-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input type="text" className="shad-input" {...field} />
								</FormControl>
								<FormMessage className="text-rose-500" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input type="text" className="shad-input" {...field} />
								</FormControl>
								<FormMessage className="text-rose-500" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" className="shad-input" {...field} />
								</FormControl>
								<FormMessage className="text-rose-500" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" className="shad-input" {...field} />
								</FormControl>
								<FormMessage className="text-rose-500" />
							</FormItem>
						)}
					/>
					<Button type="submit" className="shad-button_primary">
						{isPendingCreateUserAccount ? <Loader /> : "Sign Up"}
					</Button>
					<p className="text-small-regular text-light-2 text-center">
						Already have an account?
						<Link to="/sign-in" className="text-primary-500 ml-1">
							Log in
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignUpForm;
