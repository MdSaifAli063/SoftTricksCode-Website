from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
LOGO_SOURCE = PUBLIC / "logo-mark-on-dark.png"

def get_font(size: int, bold: bool = True):
    candidates = [
        Path("C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"),
        Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"),
    ]
    for c in candidates:
        if c.exists():
            return ImageFont.truetype(str(c), size)
    return ImageFont.load_default()

def create_og_image():
    width, height = 1200, 630
    card = Image.new("RGB", (width, height), "#030712")
    pixels = card.load()

    # 1. Authentic Smooth Radial Navy Blue Lighting (Matching original dark treatment)
    for y in range(height):
        for x in range(width):
            distance = (((x - 330) / 620) ** 2 + ((y - 315) / 430) ** 2) ** 0.5
            glow = max(0.0, 1.0 - distance) ** 2
            pixels[x, y] = (
                round(3 + 3 * glow),
                round(7 + 45 * glow),
                round(18 + 115 * glow),
            )

    img = card.convert("RGBA")

    # 2. Subtle Matrix Dots Overlay
    grid_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_layer)
    for gx in range(40, width - 40, 36):
        for gy in range(40, height - 40, 36):
            grid_draw.ellipse((gx, gy, gx + 2, gy + 2), fill=(255, 255, 255, 20))
    img = Image.alpha_composite(img, grid_layer)

    # 3. Outer Glassmorphic Rounded Card Border
    border_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    border_draw = ImageDraw.Draw(border_layer)
    border_draw.rounded_rectangle(
        (32, 32, width - 32, height - 32),
        radius=26,
        outline=(255, 255, 255, 25),
        width=1
    )
    img = Image.alpha_composite(img, border_layer)

    # 4. Large Logo Mark (Same prominent scale as original ~380px)
    logo_size = 380
    logo_x = 75
    logo_y = (height - logo_size) // 2
    
    if LOGO_SOURCE.exists():
        logo_raw = Image.open(LOGO_SOURCE).convert("RGBA")
        logo_resized = logo_raw.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
        img.paste(logo_resized, (logo_x, logo_y), logo_resized)

    draw = ImageDraw.Draw(img)

    # 5. Domain Badge (Top Right)
    badge_font = get_font(18, bold=True)
    domain_text = "softtrickscode.com"
    badge_w, badge_h = 224, 42
    badge_x = width - 32 - badge_w - 24
    badge_y = 52

    badge_bg = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    badge_draw = ImageDraw.Draw(badge_bg)
    badge_draw.rounded_rectangle(
        (badge_x, badge_y, badge_x + badge_w, badge_y + badge_h),
        radius=21,
        fill=(15, 23, 42, 200),
        outline=(59, 130, 246, 80),
        width=1
    )
    img = Image.alpha_composite(img, badge_bg)
    draw = ImageDraw.Draw(img)

    draw.ellipse((badge_x + 18, badge_y + 16, badge_x + 28, badge_y + 26), fill="#38bdf8")
    draw.text((badge_x + 38, badge_y + 9), domain_text, fill="#e2e8f0", font=badge_font)

    # 6. Brand Name Title: "Soft Tricks Code"
    text_start_x = 485
    text_y = 205

    font_title = get_font(68, bold=True)

    w_soft = draw.textlength("Soft ", font=font_title)
    w_tricks = draw.textlength("Tricks ", font=font_title)
    w_code = draw.textlength("Code", font=font_title)
    total_title_w = w_soft + w_tricks + w_code

    draw.text((text_start_x, text_y), "Soft ", fill="#ffffff", font=font_title)
    draw.text((text_start_x + w_soft, text_y), "Tricks ", fill="#60a5fa", font=font_title)
    draw.text((text_start_x + w_soft + w_tricks, text_y), "Code", fill="#ffffff", font=font_title)

    # 7. Subtitle: "─── SOFTWARE SOLUTIONS ───" (Strictly equal width to "Soft Tricks Code")
    sub_y = text_y + 92
    font_sub = get_font(19, bold=True)
    tagline_text = "SOFTWARE SOLUTIONS"
    tag_w = draw.textlength(tagline_text, font=font_sub)

    gap = 14
    line_w = (total_title_w - tag_w - (2 * gap)) / 2
    line_y = sub_y + 12

    # Left accent line (starts exactly at text_start_x)
    draw.rounded_rectangle((text_start_x, line_y, text_start_x + line_w, line_y + 3), radius=1.5, fill="#38bdf8")

    # Tagline Text
    draw.text((text_start_x + line_w + gap, sub_y), tagline_text, fill="#38bdf8", font=font_sub)

    # Right accent line (ends exactly at text_start_x + total_title_w)
    right_line_start = text_start_x + line_w + gap + tag_w + gap
    draw.rounded_rectangle((right_line_start, line_y, text_start_x + total_title_w, line_y + 3), radius=1.5, fill="#38bdf8")

    # 8. Feature Tags Row
    tag_y = sub_y + 58
    font_tags = get_font(17, bold=False)

    tags = [
        "Web Development",
        "Mobile Apps",
        "AI Solutions",
        "Cloud & SaaS"
    ]

    current_tx = text_start_x
    for tag in tags:
        tw = draw.textlength(tag, font=font_tags)
        pill_w = tw + 26
        pill_h = 36

        pill_bg = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        pill_draw = ImageDraw.Draw(pill_bg)
        pill_draw.rounded_rectangle(
            (current_tx, tag_y, current_tx + pill_w, tag_y + pill_h),
            radius=18,
            fill=(15, 23, 42, 190),
            outline=(59, 130, 246, 50),
            width=1
        )
        img = Image.alpha_composite(img, pill_bg)
        draw = ImageDraw.Draw(img)

        draw.text((current_tx + 13, tag_y + 6), tag, fill="#cbd5e1", font=font_tags)
        current_tx += pill_w + 10

    # 9. Convert RGBA to RGB for saving
    final_rgb = img.convert("RGB")

    out_png = PUBLIC / "og-image.png"
    out_webp = PUBLIC / "og-image.webp"

    final_rgb.save(out_png, "PNG", optimize=True)
    final_rgb.save(out_webp, "WEBP", quality=95)

    print(f"Generated {out_png} and {out_webp}")

if __name__ == "__main__":
    create_og_image()
