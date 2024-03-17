import { ArrowRight, Check, ChevronLeft, ChevronRight, ClipboardCheck, Copy, CreditCard, File, FileText, Image, Laptop, Moon, Pizza, Plus, Settings, SunMedium, Trash, User, X, CircleEllipsis } from "lucide-svelte";
import type { SvelteComponent } from "svelte";
import Apple from "./apple.svelte";
import Aria from "./aria.svelte";
import GitHub from "./github.svelte";
import Google from "./google.svelte";
import Hamburger from "./hamburger.svelte";
import Logo from "./logo.svelte";
import Npm from "./npm.svelte";
import PayPal from "./paypal.svelte";
import Pnpm from "./pnpm.svelte";
import RadixSvelte from "./radix-svelte.svelte";
import Tailwind from "./tailwind.svelte";
import Twitter from "./twitter.svelte";
import Yarn from "./yarn.svelte";

export type Icon = SvelteComponent;

export const Icons = {
	logo: Logo,
	close: X,
	spinner: CircleEllipsis,
	chevronLeft: ChevronLeft,
	chevronRight: ChevronRight,
	trash: Trash,
	post: FileText,
	page: File,
	media: Image,
	settings: Settings,
	billing: CreditCard,
	// ellipsis: EllipsisVertical,
	add: Plus,
	// warning: TriangleAlert,
	user: User,
	arrowRight: ArrowRight,
	// help: CircleHelp,
	pizza: Pizza,
	twitter: Twitter,
	check: Check,
	copy: Copy,
	copyDone: ClipboardCheck,
	sun: SunMedium,
	moon: Moon,
	laptop: Laptop,
	gitHub: GitHub,
	radix: RadixSvelte,
	"Radix Svelte": RadixSvelte,
	aria: Aria,
	npm: Npm,
	yarn: Yarn,
	pnpm: Pnpm,
	tailwind: Tailwind,
	google: Google,
	apple: Apple,
	paypal: PayPal,
	Hamburger: Hamburger,
};


