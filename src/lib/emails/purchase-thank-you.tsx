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

export const PurchaseThankYou = () => {
	return (
		<Html>
			<Head />
			<Preview>TPG Studios: Thank you for your order!</Preview>
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
							Thank you for your purchase,
						</Text>

						<Text className="text-black text-[14px] leading-[24px]">
							Thank you for ordering one of our shirts! We want to extend a warm welcome to the TPG Family. We strive to deliver the highest quality products on the market, ensuring that these clothes will last a lifetime. Without you, there is no us.
						</Text>

						<Text className="text-black text-[14px] leading-[24px]">
							We'd love to see how you style our gear! Tag us in your story and use #TPGStudios for a chance to win a free unreleased hoodie.
						</Text>

						<Text className="text-black text-[14px] leading-[24px]">
							We use USPS for our fulfillment, so your package will arrive in USPS packaging, as they have the best systems in place for getting our product into your hands safely.
						</Text>

						<Text className="text-black text-[14px] leading-[24px]">
							For inquiries, reach us at{' '}
							<Link href="mailto:support@tpgstudios.art">support@tpgstudios.art</Link>
						</Text>

						<Text className="text-black text-[12px] leading-[4px]">
							Best regards,
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

export default PurchaseThankYou;
