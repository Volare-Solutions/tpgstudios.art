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
								src="https://res.cloudinary.com/da8eapr4u/image/upload/v1709570118/logo-no-bg.png"
								alt="TPG Studios"
								width="200"
								className="my-0 mx-auto"
							/>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">Thank you for ordering!</Text>

						<Text className="text-black text-[14px] leading-[24px]">
							You are one of the very first (among the first 10) to order from us, and we could not
							be more grateful. We have included for free an exclusive piece from a currently
							unreleased collection that will be sent with your order.
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							We're thrilled to be getting one of our pieces in your hands. We'll keep you updated
							as we get your order fulfilled.
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Remember that our pieces are made to order, so expect at least a week before your's
							arrives.
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							We use Fracture for our fulfillment, so your package will arrive in Fracture
							packaging, as they have the best systems in place for keeping your glass pristine!
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
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default PurchaseThankYou;
