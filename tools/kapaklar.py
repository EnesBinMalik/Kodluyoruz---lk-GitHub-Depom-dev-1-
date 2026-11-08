"""Kodluyoruz deposu — elle çizilmiş proje kapakları.

Her kapak o projenin kendi arayüzünü anlatır: ürün kartı, not defteri sayfası, VKİ göstergesi.
Kullanım: python tools/kapaklar.py
"""

from __future__ import annotations

import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONT = "'Segoe UI',Inter,system-ui,-apple-system,Arial,sans-serif"
SERIF = "Georgia,'Times New Roman',serif"
MONO = "'JetBrains Mono','Cascadia Code',Consolas,monospace"


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def base(W: int, H: int, title: str, c1: str, c2: str, label: str, crumb: str,
         with_grid: bool = True, with_noise: bool = True) -> list[str]:
    L: list[str] = []
    a = L.append
    a(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" '
      f'role="img" aria-label="{esc(title)} — Enes Öztürk">')
    a(f"<title>{esc(title)} · Enes Öztürk</title>")
    a("<defs>")
    a('<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">'
      '<stop offset="0" stop-color="#05070C"/><stop offset="52%" stop-color="#0B1019"/>'
      '<stop offset="100%" stop-color="#151A26"/></linearGradient>')
    a(f'<linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">'
      f'<stop offset="0" stop-color="{c1}"/><stop offset="60%" stop-color="{c2}"/>'
      f'<stop offset="100%" stop-color="{c2}" stop-opacity="0.05"/></linearGradient>')
    a(f'<radialGradient id="glow1" cx="50%" cy="50%" r="50%">'
      f'<stop offset="0" stop-color="{c1}" stop-opacity="0.30"/>'
      f'<stop offset="100%" stop-color="{c1}" stop-opacity="0"/></radialGradient>')
    a(f'<radialGradient id="glow2" cx="50%" cy="50%" r="50%">'
      f'<stop offset="0" stop-color="{c2}" stop-opacity="0.26"/>'
      f'<stop offset="100%" stop-color="{c2}" stop-opacity="0"/></radialGradient>')
    if with_grid:
        a('<pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">'
          '<path d="M44 0H0V44" fill="none" stroke="#FFFFFF" stroke-opacity="0.035"/></pattern>')
    if with_noise:
        a('<pattern id="noise" width="3" height="3" patternUnits="userSpaceOnUse">'
          '<circle cx="1" cy="1" r="0.6" fill="#FFFFFF" fill-opacity="0.05"/></pattern>')
    a('<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">'
      '<stop offset="0" stop-color="#FFFFFF" stop-opacity="0.20"/>'
      '<stop offset="55%" stop-color="#FFFFFF" stop-opacity="0.04"/>'
      '<stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.10"/></linearGradient>')
    a(f'<linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">'
      '<stop offset="0" stop-color="#FFFFFF" stop-opacity="0.14"/>'
      '<stop offset="55%" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>')
    a(f'<style>.t{{font-family:{FONT}}}.s{{font-family:{SERIF}}}.m{{font-family:{MONO}}}'
      f'.ttl{{font-family:{SERIF};letter-spacing:-0.5px}}'
      f'.cap{{font-family:{FONT};font-weight:600;letter-spacing:3.2px}}</style>')
    a("</defs>")
    a(f'<rect width="{W}" height="{H}" fill="url(#bg)"/>')
    if with_grid:
        a(f'<rect width="{W}" height="{H}" fill="url(#grid)"/>')
    if with_noise:
        a(f'<rect width="{W}" height="{H}" fill="url(#noise)"/>')
    a(f'<ellipse cx="{int(W*0.16)}" cy="{int(H*0.1)}" rx="{int(W*0.36)}" ry="{int(H*0.5)}" fill="url(#glow1)"/>')
    a(f'<ellipse cx="{int(W*0.9)}" cy="{int(H*0.95)}" rx="{int(W*0.36)}" ry="{int(H*0.55)}" fill="url(#glow2)"/>')
    a(f'<rect x="0" y="0" width="6" height="{H}" fill="url(#accent)"/>')
    # üst şerit
    a(f'<g class="m" font-size="11.5" fill="#5A6B88" letter-spacing="2">'
      f'<text x="56" y="46">KODLUYORUZ</text><text x="176" y="46" fill="#243044">/</text>'
      f'<text x="194" y="46">{esc(crumb)}</text>'
      f'<text x="{W-56}" y="46" text-anchor="end" fill="{c1}" fill-opacity="0.9">{esc(label)}</text></g>')
    a(f'<line x1="56" y1="64" x2="{W-56}" y2="64" stroke="#FFFFFF" stroke-opacity="0.07"/>')
    return L


def footer(L: list[str], W: int, H: int, c1: str) -> None:
    L.append(f'<line x1="56" y1="{H-72}" x2="{W-56}" y2="{H-72}" stroke="#FFFFFF" stroke-opacity="0.07"/>')
    L.append(f'<text x="56" y="{H-40}" class="t" font-size="19" font-weight="600" fill="#E9F0FB">Enes Öztürk</text>')
    L.append(f'<text x="56" y="{H-18}" class="m" font-size="11.5" fill="#5A6B88">github.com/EnesBinMalik</text>')
    L.append(f'<text x="{W-56}" y="{H-40}" text-anchor="end" class="cap" font-size="11" fill="{c1}">EL EMEĞİ · İMZALI</text>')
    L.append(f'<text x="{W-56}" y="{H-18}" text-anchor="end" class="m" font-size="11" fill="#3F4C60">'
             'tasarım &amp; geliştirme · Enes Öztürk</text>')


# ————————————————————————— ATELIER —————————————————————————
def atelier() -> str:
    W, H = 1280, 720
    C1, C2 = "#D4AF37", "#8B7355"  # altın + taupe
    L = base(W, H, "Atelier — Lüks Giyim & E-Ticaret", C1, C2, "E-TİCARET", "03 · ATELIER", with_grid=False)
    a = L.append
    a(f'<text x="56" y="176" class="ttl" font-size="76" fill="#F6F1E7">Atelier</text>')
    a(f'<text x="60" y="216" class="t" font-size="18" fill="#B8A98E" letter-spacing="4">LÜKS GİYİM · E-TİCARET</text>')
    a(f'<rect x="60" y="240" width="70" height="2" fill="{C1}" fill-opacity="0.7"/>')
    a(f'<text x="56" y="298" class="t" font-size="16" fill="#8C8677">Koleksiyon · ürün detayı · sepet akışı · favoriler</text>')

    # ürün kartları (ürün fotoğrafları yerine çizim)
    cards = [("Wool Coat", "₺4.890", "#2B2B2B", "#3C3A36"),
             ("Knit Sweater", "₺1.750", "#4A4238", "#5D5346"),
             ("Heavy Hoodie", "₺1.290", "#33383A", "#414A4D"),
             ("Leather Bag", "₺3.200", "#3A2E28", "#4B3C33")]
    for i, (name, price, cc1, cc2) in enumerate(cards):
        x = 56 + i * 174
        a(f'<rect x="{x}" y="330" width="154" height="252" rx="14" fill="#0E1118" stroke="#2A2E3A"/>')
        a(f'<rect x="{x}" y="330" width="154" height="150" rx="14" fill="{cc1}"/>')
        a(f'<rect x="{x}" y="410" width="154" height="70" fill="{cc2}" fill-opacity="0.6"/>')
        # giysi silueti
        a(f'<path d="M{x+52} 372 l26 -10 26 10 -6 26 16 12 v40 h-72 v-40 l16 -12 Z" '
          f'fill="none" stroke="{C1}" stroke-opacity="0.55" stroke-width="1.6"/>')
        a(f'<text x="{x+16}" y="508" class="s" font-size="15" fill="#EAE3D6">{name}</text>')
        a(f'<text x="{x+16}" y="532" class="t" font-size="13" fill="{C1}">{price}</text>')
        a(f'<rect x="{x+16}" y="548" width="122" height="24" rx="12" fill="{C1}" fill-opacity="0.12" '
          f'stroke="{C1}" stroke-opacity="0.4"/>')
        a(f'<text x="{x+77}" y="564" text-anchor="middle" class="cap" font-size="9" fill="{C1}">SEPETE EKLE</text>')

    # sağ taraf: sepet özeti
    px, py, pw, ph = 768, 132, 456, 452
    a(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="16" fill="#0E1118" fill-opacity="0.94" stroke="#2A2E3A"/>')
    a(f'<text x="{px+26}" y="{py+40}" class="t" font-size="14" fill="#CFC6B6" letter-spacing="2">SEPET</text>')
    a(f'<line x1="{px+26}" y1="{py+58}" x2="{px+pw-26}" y2="{py+58}" stroke="#FFFFFF" stroke-opacity="0.08"/>')
    rows = [("Wool Coat · M", "₺4.890"), ("Knit Sweater · S", "₺1.750"), ("Leather Bag", "₺3.200")]
    for i, (n, pr) in enumerate(rows):
        y = py + 92 + i * 44
        a(f'<text x="{px+26}" y="{y}" class="t" font-size="14" fill="#EAE3D6">{n}</text>')
        a(f'<text x="{px+pw-26}" y="{y}" text-anchor="end" class="t" font-size="14" fill="#B8A98E">{pr}</text>')
    a(f'<line x1="{px+26}" y1="{py+236}" x2="{px+pw-26}" y2="{py+236}" stroke="#FFFFFF" stroke-opacity="0.08"/>')
    a(f'<text x="{px+26}" y="{py+268}" class="t" font-size="13" fill="#8C8677">Ara toplam</text>')
    a(f'<text x="{px+pw-26}" y="{py+268}" text-anchor="end" class="t" font-size="14" fill="#EAE3D6">₺9.840</text>')
    a(f'<text x="{px+26}" y="{py+298}" class="t" font-size="13" fill="#8C8677">Kargo</text>')
    a(f'<text x="{px+pw-26}" y="{py+298}" text-anchor="end" class="t" font-size="14" fill="#7FA883">Ücretsiz</text>')
    a(f'<rect x="{px+26}" y="{py+318}" width="{pw-52}" height="52" rx="10" fill="url(#metal)" fill-opacity="0.5" stroke="{C1}" stroke-opacity="0.55"/>')
    a(f'<text x="{px+pw/2}" y="{py+350}" text-anchor="middle" class="t" font-size="14" font-weight="700" fill="{C1}">ÖDEMEYE GEÇ</text>')
    a(f'<text x="{px+26}" y="{py+404}" class="m" font-size="11" fill="#4E5768">React Router · Styled Components · Axios</text>')
    a(f'<text x="{px+26}" y="{py+424}" class="m" font-size="11" fill="#4E5768">ShopContext · sepet &amp; favori durumu</text>')
    footer(L, W, H, C1)
    L.append("</svg>")
    return "\n".join(L) + "\n"


# ————————————————————————— NOT DEFTERİ —————————————————————————
def notdefteri() -> str:
    W, H = 1280, 720
    C1, C2 = "#7DD3FC", "#FDE68A"
    L = base(W, H, "Not Defteri — Enes Öztürk", C1, C2, "NOT UYGULAMASI", "04 · NOT DEFTERİ")
    a = L.append
    a(f'<text x="56" y="182" class="ttl" font-size="70" fill="#EAF2FB">Not Defteri</text>')
    a(f'<text x="60" y="220" class="t" font-size="17" fill="#8FA3BC" letter-spacing="3">RENKLİ · KATEGORİLİ · YEREL</text>')
    a(f'<rect x="60" y="242" width="70" height="2" fill="{C1}" fill-opacity="0.7"/>')
    a(f'<text x="56" y="298" class="t" font-size="16" fill="#8FA3BC">Not ekle · renk seç · sabitle · ara · sil (onaylı)</text>')

    # not kartları
    notes = [("#1E3A5F", "#FDE68A", "Ders programı", "Pazartesi: Algoritma 09:00"),
             ("#3B2E44", "#F9A8D4", "Alışveriş", "Süt, kahve, kalem"),
             ("#26402F", "#86EFAC", "Proje fikri", "Not defterine etiket filtresi"),
             ("#4A3B25", "#FDBA74", "Hatırlatma", "Cuma 18:00 spor")]
    for i, (bg, dot, title, body) in enumerate(notes):
        x = 56 + i * 176
        a(f'<rect x="{x}" y="330" width="156" height="176" rx="14" fill="{bg}" fill-opacity="0.55" stroke="#FFFFFF" stroke-opacity="0.10"/>')
        a(f'<circle cx="{x+20}" cy="352" r="5" fill="{dot}"/>')
        a(f'<text x="{x+16}" y="388" class="t" font-size="14" font-weight="600" fill="#EAF2FB">{title}</text>')
        a(f'<text x="{x+16}" y="414" class="t" font-size="12" fill="#B9C6D6">{body[:26]}</text>')
        a(f'<text x="{x+16}" y="486" class="m" font-size="10" fill="#7E8CA0">localStorage</text>')

    # editör paneli
    px, py, pw, ph = 768, 132, 456, 452
    a(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="16" fill="#0E141E" fill-opacity="0.95" stroke="#2A3448"/>')
    a(f'<text x="{px+26}" y="{py+38}" class="t" font-size="13" fill="#7DD3FC" letter-spacing="2">YENİ NOT</text>')
    a(f'<rect x="{px+26}" y="{py+56}" width="{pw-52}" height="44" rx="10" fill="#0A0F17" stroke="#2A3448"/>')
    a(f'<text x="{px+44}" y="{py+84}" class="t" font-size="14" fill="#EAF2FB">Başlık</text>')
    a(f'<rect x="{px+26}" y="{py+112}" width="{pw-52}" height="132" rx="10" fill="#0A0F17" stroke="#2A3448"/>')
    for i in range(4):
        a(f'<rect x="{px+46}" y="{py+140+i*24}" width="{pw-120-i*46}" height="7" rx="3.5" fill="#FFFFFF" fill-opacity="0.10"/>')
    # renk seçici
    for i, c in enumerate(["#FDE68A", "#F9A8D4", "#86EFAC", "#93C5FD", "#FDBA74"]):
        a(f'<circle cx="{px+44+i*38}" cy="{py+280}" r="12" fill="{c}" '
          f'{"stroke=\"#FFFFFF\" stroke-opacity=\"0.8\" stroke-width=\"2\"" if i == 0 else ""}/>')
    a(f'<rect x="{px+26}" y="{py+312}" width="150" height="44" rx="10" fill="url(#metal)" fill-opacity="0.45" stroke="{C1}" stroke-opacity="0.55"/>')
    a(f'<text x="{px+101}" y="{py+340}" text-anchor="middle" class="t" font-size="13" font-weight="700" fill="{C1}">KAYDET</text>')
    a(f'<text x="{px+26}" y="{py+400}" class="m" font-size="11" fill="#4E5768">React · localStorage · renk paleti</text>')
    a(f'<text x="{px+26}" y="{py+420}" class="m" font-size="11" fill="#4E5768">Toast bildirimi · silme onayı</text>')
    footer(L, W, H, C1)
    L.append("</svg>")
    return "\n".join(L) + "\n"


# ————————————————————————— VKİ & DİYET —————————————————————————
def vki() -> str:
    W, H = 1280, 720
    C1, C2 = "#4ADE80", "#38BDF8"
    L = base(W, H, "Vücut Kitle Endeksi & Diyet Rehberi", C1, C2, "SAĞLIK", "05 · VKİ & DİYET")
    a = L.append
    a(f'<text x="56" y="178" class="ttl" font-size="62" fill="#EAF7F0">Vücut Kitle Endeksi</text>')
    a(f'<text x="60" y="216" class="t" font-size="17" fill="#8FB3A4" letter-spacing="3">&amp; DİYET REHBERİ</text>')
    a(f'<rect x="60" y="238" width="70" height="2" fill="{C1}" fill-opacity="0.7"/>')
    a(f'<text x="56" y="296" class="t" font-size="16" fill="#8FB3A4">Kişiye özel hesaplama · kategori · diyet listesi · geçmiş</text>')

    # VKİ göstergesi (yarım daire)
    cx, cy, r = 260, 546, 148
    a(f'<path d="M{cx-r} {cy} A{r} {r} 0 0 1 {cx+r} {cy}" fill="none" stroke="#1C2A34" stroke-width="26" stroke-linecap="round"/>')
    segs = [(180, 216, "#38BDF8"), (216, 252, "#4ADE80"), (252, 288, "#FBBF24"), (288, 360, "#F87171")]
    import math
    for a0, a1, col in segs:
        x0, y0 = cx + r * math.cos(math.radians(a0)), cy + r * math.sin(math.radians(a0))
        x1, y1 = cx + r * math.cos(math.radians(a1)), cy + r * math.sin(math.radians(a1))
        large = 1 if (a1 - a0) > 180 else 0
        a(f'<path d="M{x0:.1f} {y0:.1f} A{r} {r} 0 {large} 1 {x1:.1f} {y1:.1f}" fill="none" '
          f'stroke="{col}" stroke-width="26" stroke-opacity="0.85"/>')
    # ibre
    ang = math.radians(246)
    a(f'<line x1="{cx}" y1="{cy}" x2="{cx + (r-30)*math.cos(ang):.1f}" y2="{cy + (r-30)*math.sin(ang):.1f}" '
      f'stroke="#EAF7F0" stroke-width="4" stroke-linecap="round"/>')
    a(f'<circle cx="{cx}" cy="{cy}" r="9" fill="#EAF7F0"/>')
    a(f'<text x="{cx}" y="{cy-46}" text-anchor="middle" class="ttl" font-size="56" fill="#EAF7F0">23.4</text>')
    a(f'<text x="{cx}" y="{cy-14}" text-anchor="middle" class="m" font-size="13" fill="{C1}">NORMAL</text>')

    # kategori ölçeği
    labels = [("Zayıf", "#38BDF8"), ("Normal", "#4ADE80"), ("Fazla", "#FBBF24"), ("Obez", "#F87171")]
    for i, (lab, col) in enumerate(labels):
        x = 66 + i * 96
        a(f'<rect x="{x}" y="596" width="12" height="12" rx="3" fill="{col}"/>')
        a(f'<text x="{x+20}" y="607" class="t" font-size="12" fill="#8FB3A4">{lab}</text>')

    # diyet kartı
    px, py, pw, ph = 560, 132, 664, 452
    a(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="16" fill="#0E161C" fill-opacity="0.95" stroke="#22333C"/>')
    a(f'<text x="{px+28}" y="{py+38}" class="t" font-size="13" fill="{C1}" letter-spacing="2">SANA ÖZEL DİYET PLANI</text>')
    a(f'<line x1="{px+28}" y1="{py+56}" x2="{px+pw-28}" y2="{py+56}" stroke="#FFFFFF" stroke-opacity="0.08"/>')
    meals = [("Kahvaltı", "Yulaf · yoğurt · orman meyvesi", "380 kcal"),
             ("Öğle", "Izgara tavuk · bulgur · yeşillik", "520 kcal"),
             ("Ara", "Badem · yeşil çay", "140 kcal"),
             ("Akşam", "Fırında somon · sebze", "460 kcal")]
    for i, (m, d, k) in enumerate(meals):
        y = py + 96 + i * 62
        a(f'<circle cx="{px+40}" cy="{y-6}" r="9" fill="{C1}" fill-opacity="0.16" stroke="{C1}" stroke-opacity="0.5"/>')
        a(f'<text x="{px+62}" y="{y}" class="t" font-size="14" font-weight="600" fill="#EAF7F0">{m}</text>')
        a(f'<text x="{px+62}" y="{y+22}" class="t" font-size="12" fill="#9DB3AA">{d}</text>')
        a(f'<text x="{px+pw-28}" y="{y}" text-anchor="end" class="m" font-size="12" fill="{C1}">{k}</text>')
    a(f'<line x1="{px+28}" y1="{py+358}" x2="{px+pw-28}" y2="{py+358}" stroke="#FFFFFF" stroke-opacity="0.08"/>')
    a(f'<text x="{px+28}" y="{py+388}" class="t" font-size="13" fill="#9DB3AA">Günlük toplam</text>')
    a(f'<text x="{px+pw-28}" y="{py+388}" text-anchor="end" class="t" font-size="15" font-weight="700" fill="#EAF7F0">1.500 kcal</text>')
    a(f'<text x="{px+28}" y="{py+420}" class="m" font-size="11" fill="#4E6470">React Router · Styled Components · lucide</text>')
    footer(L, W, H, C1)
    L.append("</svg>")
    return "\n".join(L) + "\n"


def rozet(ad: str, no: str, c1: str, c2: str) -> str:
    body = "M300 92 L480 160 V312 C480 410 398 476 300 508 C202 476 120 410 120 312 V160 Z"
    L: list[str] = []
    a = L.append
    a('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600" '
      f'role="img" aria-label="{esc(ad)} — Enes Öztürk imzalı rozet">')
    a("<defs>"
      '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#060B14"/>'
      '<stop offset="55%" stop-color="#0A1220"/><stop offset="100%" stop-color="#121E33"/></linearGradient>'
      f'<linearGradient id="acc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c1}"/>'
      f'<stop offset="100%" stop-color="{c2}"/></linearGradient>'
      '<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">'
      '<stop offset="0" stop-color="#FFFFFF" stop-opacity="0.18"/>'
      '<stop offset="60%" stop-color="#FFFFFF" stop-opacity="0.03"/>'
      '<stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.08"/></linearGradient>'
      f'<radialGradient id="glow" cx="50%" cy="40%" r="55%"><stop offset="0" stop-color="{c1}" stop-opacity="0.28"/>'
      f'<stop offset="100%" stop-color="{c1}" stop-opacity="0"/></radialGradient>'
      f'<style>.t{{font-family:{FONT}}}.m{{font-family:{MONO}}}.cap{{font-family:{FONT};font-weight:700;letter-spacing:2.6px}}</style>'
      "</defs>")
    a('<rect width="600" height="600" rx="28" fill="url(#bg)"/>')
    a('<ellipse cx="300" cy="250" rx="250" ry="220" fill="url(#glow)"/>')
    a(f'<path d="{body}" fill="#0A1220" fill-opacity="0.96" stroke="url(#acc)" stroke-width="4"/>')
    a(f'<g transform="translate(300,300) scale(0.84) translate(-300,-300)">'
      f'<path d="{body}" fill="url(#metal)" stroke="#FFFFFF" stroke-opacity="0.10" stroke-width="1.5"/></g>')
    a(f'<circle cx="300" cy="238" r="72" fill="none" stroke="{c1}" stroke-opacity="0.6" stroke-width="2.5"/>')
    a(f'<text x="300" y="272" text-anchor="middle" class="t" font-size="72" font-weight="700" fill="{c1}">{no}</text>')
    size = 21 if len(ad) <= 22 else (18 if len(ad) <= 30 else 15)
    a(f'<text x="300" y="352" text-anchor="middle" class="t" font-size="{size}" font-weight="700" fill="#E9F0FB">{esc(ad)}</text>')
    a('<text x="300" y="380" text-anchor="middle" class="m" font-size="11.5" fill="#8FA0BD">Kodluyoruz ödevi · Enes Öztürk</text>')
    a('<g transform="rotate(-5 300 428)">'
      f'<rect x="212" y="412" width="176" height="32" rx="16" fill="{c1}" fill-opacity="0.13" '
      f'stroke="{c1}" stroke-opacity="0.6" stroke-width="1.5"/>')
    a(f'<text x="300" y="433" text-anchor="middle" class="cap" font-size="11.5" fill="{c1}">TAMAMLANDI</text></g>')
    a('<text x="300" y="478" text-anchor="middle" class="m" font-size="10" fill="#5A6B88">github.com/EnesBinMalik</text>')
    a("</svg>")
    return "\n".join(L) + "\n"


PROJECTS = [
    ("enes-öztürk-atelier-_-lüks-giyim-&-e-ticaret", "Atelier — Lüks Giyim", "03",
     "#D4AF37", "#8B7355", atelier),
    ("not-defteri---enes-öztürk", "Not Defteri", "04",
     "#7DD3FC", "#FDE68A", notdefteri),
    ("vücut-kitle-endeksi-&-diyet-rehberi", "VKİ & Diyet Rehberi", "05",
     "#4ADE80", "#38BDF8", vki),
]


def main() -> None:
    for slug, ad, no, c1, c2, fn in PROJECTS:
        d = ROOT / slug / "docs"
        d.mkdir(parents=True, exist_ok=True)
        (d / "kapak.svg").write_text(fn(), encoding="utf-8")
        (d / "rozet.svg").write_text(rozet(ad, no, c1, c2), encoding="utf-8")
        print(f"✓ {slug}/docs/kapak.svg · rozet.svg")


if __name__ == "__main__":
    main()
