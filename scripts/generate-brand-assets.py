"""Generate web-ready brand assets from the canonical square logo artwork."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SOURCE = PUBLIC / "brand-source.png"


def extract_mark(source: Image.Image, white_code: bool = False) -> Image.Image:
    """Remove the white canvas while preserving antialiased logo edges."""
    rgb = source.convert("RGB")
    output = Image.new("RGBA", rgb.size)
    pixels = []

    for red, green, blue in rgb.getdata():
        # The source canvas is white. Using its distance from white as alpha
        # retains the blue mark and the black code glyph without a white halo.
        alpha = max(0, min(255, 255 - min(red, green, blue)))
        if alpha < 5:
            pixels.append((0, 0, 0, 0))
            continue

        if white_code and max(red, green, blue) < 105:
            pixels.append((255, 255, 255, alpha))
        else:
            # Un-premultiply colors so antialiased edges remain saturated.
            factor = 255 / alpha
            pixels.append(
                (
                    max(0, min(255, round(255 - (255 - red) * factor))),
                    max(0, min(255, round(255 - (255 - green) * factor))),
                    max(0, min(255, round(255 - (255 - blue) * factor))),
                    alpha,
                )
            )

    output.putdata(pixels)
    bbox = output.getbbox()
    if not bbox:
        raise RuntimeError("The source logo did not contain a visible mark")
    return output.crop(bbox)


def contain(mark: Image.Image, size: int, padding: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    available = size - (padding * 2)
    scale = min(available / mark.width, available / mark.height)
    resized = mark.resize(
        (round(mark.width * scale), round(mark.height * scale)),
        Image.Resampling.LANCZOS,
    )
    offset = ((size - resized.width) // 2, (size - resized.height) // 2)
    canvas.alpha_composite(resized, offset)
    return canvas


def solid_icon(mark: Image.Image, size: int, background: tuple[int, int, int, int]) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), background)
    canvas.alpha_composite(contain(mark, size, round(size * 0.08)))
    return canvas


def font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path("C:/Windows/Fonts/segoeuib.ttf"),
        Path("C:/Windows/Fonts/arialbd.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def social_card(mark: Image.Image) -> Image.Image:
    width, height = 1200, 630
    card = Image.new("RGB", (width, height), "#030712")
    pixels = card.load()

    # Subtle radial blue light, matching the supplied dark logo treatment.
    for y in range(height):
        for x in range(width):
            distance = (((x - 330) / 620) ** 2 + ((y - 315) / 430) ** 2) ** 0.5
            glow = max(0.0, 1.0 - distance) ** 2
            pixels[x, y] = (
                round(3 + 3 * glow),
                round(7 + 45 * glow),
                round(18 + 115 * glow),
            )

    mark_canvas = contain(mark, 460, 30)
    card.paste(mark_canvas, (70, 85), mark_canvas)

    draw = ImageDraw.Draw(card)
    draw.text((535, 225), "SoftTricksCode", fill="#ffffff", font=font(65))
    draw.text(
        (540, 315),
        "Software Development & AI Solutions",
        fill="#93c5fd",
        font=font(27),
    )
    draw.rounded_rectangle((540, 378, 880, 384), radius=3, fill="#2563eb")
    return card


def main() -> None:
    source = Image.open(SOURCE)
    dark_mark = extract_mark(source)
    light_mark = extract_mark(source, white_code=True)

    dark_512 = contain(dark_mark, 512, 18)
    light_512 = contain(light_mark, 512, 18)

    dark_512.save(PUBLIC / "logo-mark.png", optimize=True)
    dark_512.save(PUBLIC / "logo-mark.webp", "WEBP", quality=90)
    contain(dark_mark, 100, 4).save(PUBLIC / "logo-mark-100.webp", "WEBP", quality=90)

    light_512.save(PUBLIC / "logo-mark-on-dark.png", optimize=True)
    light_512.save(PUBLIC / "logo-mark-on-dark.webp", "WEBP", quality=90)
    contain(light_mark, 100, 4).save(PUBLIC / "logo-mark-on-dark-100.webp", "WEBP", quality=90)

    # Generate favicons and app icons directly from the canonical favicon.png
    fav_src_path = PUBLIC / "favicon.png"
    if fav_src_path.exists():
        fav_src = Image.open(fav_src_path).convert("RGBA")
        for size in (16, 32, 48, 256, 512):
            fav_src.resize((size, size), Image.Resampling.LANCZOS).save(
                PUBLIC / f"favicon-{size}.png", optimize=True
            )

        favicon_sizes = [16, 32, 48, 64, 128, 256]
        ico_images = [fav_src.resize((size, size), Image.Resampling.LANCZOS) for size in favicon_sizes]
        ico_images[0].save(
            PUBLIC / "favicon.ico",
            format="ICO",
            sizes=[(size, size) for size in favicon_sizes],
            append_images=ico_images[1:],
        )

        for size in (192, 256, 512):
            fav_src.resize((size, size), Image.Resampling.LANCZOS).save(
                PUBLIC / f"icon-{size}.png", optimize=True
            )

        # Apple touch icon (180x180) on opaque white canvas for iOS
        apple_canvas = Image.new("RGBA", (180, 180), (255, 255, 255, 255))
        apple_canvas.alpha_composite(fav_src.resize((180, 180), Image.Resampling.LANCZOS))
        apple_canvas.convert("RGB").save(PUBLIC / "apple-touch-icon.png", optimize=True)

        # Maskable icon (512x512) with safe zone for Android PWA
        maskable_size = 512
        safe_size = round(maskable_size * 0.8)
        maskable_canvas = Image.new("RGBA", (maskable_size, maskable_size), (255, 255, 255, 255))
        maskable_inner = fav_src.resize((safe_size, safe_size), Image.Resampling.LANCZOS)
        offset = ((maskable_size - safe_size) // 2, (maskable_size - safe_size) // 2)
        maskable_canvas.alpha_composite(maskable_inner, offset)
        maskable_canvas.save(PUBLIC / "icon-maskable-512.png", optimize=True)

    try:
        # pyrefly: ignore [missing-import]
        from generate_og_image import create_og_image
        create_og_image()
    except Exception:
        pass


if __name__ == "__main__":
    main()
