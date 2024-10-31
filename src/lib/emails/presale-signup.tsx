import {
	Body,
	Container,
	Head,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

interface PresaleSignupProps {
	name: string;
}

export const PresaleSignup = ({ name }: PresaleSignupProps) => {
	return (
		<Html>
			<Head />
			<Preview>You're in for the TPG Studios Hoodie Presale!</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Section className="mt-[32px]">
							<Img
								src="https://res.cloudinary.com/da8eapr4u/image/upload/v1711591546/Logos/svgc9kifwk7zk9uhe5su.png"
								alt="TPG Studios"
								width="200"
								className="my-0 mx-auto"
							/>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">
							Hi {name},
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Thank you for signing up for our hoodie presale. We're excited to offer you early access to our latest collection.
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Stay tuned for updates on when you can place your order and be among the first to own our new hoodie.
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							If you have any questions, feel free to contact us at{' '}
							<Link href="mailto:support@tpgstudios.art">support@tpgstudios.art</Link>
						</Text>
						<Text className="text-black text-[12px] leading-[4px]">
							Best,
						</Text>
						<Text className="text-black text-[12px] leading-[4px] ml-1">
							The TPG Studios Team
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default PresaleSignup;