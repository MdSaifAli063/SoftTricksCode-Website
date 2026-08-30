import os
from pathlib import Path
from PIL import Image

def optimize_all():
    root = Path(__file__).resolve().parents[1]
    public = root / "public"

    # 1. Optimize why-choose-team
    why_team = public / "why-choose-team.jpg"
    if why_team.exists():
        img = Image.open(why_team)
        w, h = img.size
        new_w = 640
        new_h = int(h * (new_w / w))
        resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        resized.save(public / "why-choose-team.webp", "WEBP", quality=80)
        resized.save(why_team, "JPEG", quality=82, optimize=True)
        print(f"why-choose-team.jpg: {why_team.stat().st_size / 1024:.1f} KB")
        print(f"why-choose-team.webp: {(public / 'why-choose-team.webp').stat().st_size / 1024:.1f} KB")

    # 2. Optimize logos
    for name in ["logo-mark-on-dark.png", "logo-mark.png"]:
        p = public / name
        if p.exists():
            img = Image.open(p)
            # Full size webp
            webp_name = name.replace(".png", ".webp")
            img.save(public / webp_name, "WEBP", quality=90)
            
            # Retina 100x100 for 50x50 UI display
            img_100 = img.resize((100, 100), Image.Resampling.LANCZOS)
            img_100.save(public / name.replace(".png", "-100.webp"), "WEBP", quality=90)
            img_100.save(public / name.replace(".png", "-100.png"), "PNG", optimize=True)
            
            print(f"{name}: {p.stat().st_size / 1024:.1f} KB")
            print(f"{webp_name}: {(public / webp_name).stat().st_size / 1024:.1f} KB")
            print(f"{name.replace('.png', '-100.webp')}: {(public / name.replace('.png', '-100.webp')).stat().st_size / 1024:.1f} KB")

    # 3. Optimize founder and team photos
    photos = [
        "founder-saif.png",
        "founder-saif-avatar.png",
        "co-founder-ashwini.png",
        "faraz-akram.png",
        "dawal-malik.png"
    ]
    for photo_name in photos:
        p = public / photo_name
        if p.exists():
            img = Image.open(p)
            # Max width 600
            if img.width > 600:
                h = int(img.height * (600 / img.width))
                img = img.resize((600, h), Image.Resampling.LANCZOS)
            webp_file = public / (Path(photo_name).stem + ".webp")
            if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                img.save(webp_file, "WEBP", quality=82)
            else:
                img.convert("RGB").save(webp_file, "WEBP", quality=82)
            print(f"{photo_name} -> {webp_file.name}: {webp_file.stat().st_size / 1024:.1f} KB")

if __name__ == "__main__":
    optimize_all()
