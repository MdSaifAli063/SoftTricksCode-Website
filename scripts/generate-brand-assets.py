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

    contain(dark_mark, 512, 18).save(PUBLIC / "logo-mark.png", optimize=True)
    contain(light_mark, 512, 18).save(PUBLIC / "logo-mark-on-dark.png", optimize=True)

    for size in (16, 32, 48):
        solid_icon(dark_mark, size, (255, 255, 255, 255)).convert("RGB").save(
            PUBLIC / f"favicon-{size}.png", optimize=True
        )

    favicon_sizes = [16, 32, 48]
    favicon_images = [
        solid_icon(dark_mark, size, (255, 255, 255, 255)).convert("RGBA")
        for size in favicon_sizes
    ]
    favicon_images[-1].save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=[(size, size) for size in favicon_sizes],
        append_images=favicon_images[:-1],
    )

    for size in (192, 256, 512):
        solid_icon(dark_mark, size, (255, 255, 255, 255)).convert("RGB").save(
            PUBLIC / f"icon-{size}.png", optimize=True
        )

    solid_icon(dark_mark, 180, (255, 255, 255, 255)).convert("RGB").save(
        PUBLIC / "apple-touch-icon.png", optimize=True
    )
    solid_icon(light_mark, 512, (3, 7, 18, 255)).convert("RGB").save(
        PUBLIC / "icon-maskable-512.png", optimize=True
    )
    social_card(light_mark).save(PUBLIC / "og-image.png", optimize=True)


if __name__ == "__main__":
    main()
