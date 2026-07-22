import Image from "next/image";

type IconProps = {
	src: string;
	className?: string;
	size?: number;
	alt?: string;
	onClick?: React.MouseEventHandler<any>;
};

const SPRITE_ICONS: Record<string, string> = {
	"icons/star.svg": "icon-star",
	"icons/star_border.svg": "icon-star_border",
	"icons/star_half.svg": "icon-star_half",
	"icons/favorite.svg": "icon-favorite",
	"icons/favorite_fill.svg": "icon-favorite_fill",
	"icons/shopping_cart.svg": "icon-shopping_cart",
};

export default function Icon({
	src,
	className,
	onClick,
	alt,
	size = 24,
}: IconProps) {
	if (SPRITE_ICONS[src]) {
		return (
			<svg 
				className={className} 
				width={size} 
				height={size} 
				onClick={onClick}
				aria-label={alt ?? src.replace(".svg", "").replace(/_/g, " ")}
			>
				<use href={`#${SPRITE_ICONS[src]}`} />
			</svg>
		);
	}

	return (
		<Image
			className={className}
			src={`/svgs/${src}`}
			width={size}
			height={size}
			onClick={onClick}
			alt={alt ?? src.replace(".svg", "").replace(/_/g, " ")}
		/>
	);
}
