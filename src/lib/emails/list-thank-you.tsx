import {
	Body,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

interface ListThankYouProps {
	unsubKey: string;
	email: string;
}

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:5173';

export const ListThankYou = ({ unsubKey, email }: ListThankYouProps) => {
	return (
		<Html>
			<Head />
			<Preview>Welcome to TPG Studios!</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Section className="mt-[32px]">
							<Img
								src="https://res.cloudinary.com/da8eapr4u/image/upload/v1709570118/logo-no-bg.png"
								alt="TPG Studios"
								width="200"
								className="my-0 mx-auto"
							/>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">Welcome to TPG Studios! </Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Dive into a world of stylish golf apparel, designed for comfort and performance.
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							We'll keep you updated with our latest collections and exclusive offers!
						</Text>

						<Text className="text-black text-[14px] leading-[24px]">
							For inquiries, reach us at{' '}
							<Link href="mailto:support@tpgstudios.art">support@tpgstudios.art</Link>
						</Text>

						<Text className="text-black text-[12px] leading-[4px] pt-4">Best,</Text>
						<Text className="text-black text-[12px] leading-[4px] ml-1">Grayson Crozier</Text>
						<Text className="text-black text-[12px] leading-[4px] ml-1 italic">
							TPG Studios Team
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Link
							className="text-[#666666] text-[12px] leading-[24px]"
							href={`${baseUrl}/auth/list/remove?key=${unsubKey}&email=${email}`}
						>
							unsubscribe
						</Link>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default ListThankYou;
