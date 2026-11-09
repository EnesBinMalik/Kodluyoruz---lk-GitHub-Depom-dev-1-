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



# ————————————————————————— KRİPTO —————————————————————————
def kripto() -> str:
    import math
    W, H = 1280, 720
    C1, C2 = "#F7931A", "#22D3EE"
    L = base(W, H, "Kripto Para — Canlı Fiyat Takip", C1, C2, "FİNANS", "06 · KRİPTO", with_grid=True)
    a = L.append
    a(f'<text x="56" y="178" class="ttl" font-size="66" fill="#F4F7FB">Canlı Piyasa</text>')
    a(f'<text x="60" y="216" class="t" font-size="17" fill="#8FA0BD" letter-spacing="3">KRİPTO TAKİP · PORTFÖY</text>')
    a(f'<rect x="60" y="238" width="70" height="2" fill="{C1}" fill-opacity="0.75"/>')

    # coin kartları
    coins = [("BTC", "Bitcoin", "$68.412", "+2,41%", "#F7931A"),
             ("ETH", "Ethereum", "$3.284", "+1,08%", "#8FA6FF"),
             ("SOL", "Solana", "$184,20", "-0,62%", "#14F195"),
             ("AVAX", "Avalanche", "$41,88", "+4,15%", "#E84142")]
    for i, (sym, name, price, chg, col) in enumerate(coins):
        x = 56 + i * 196
        up = chg.startswith("+")
        a(f'<rect x="{x}" y="278" width="176" height="128" rx="14" fill="#0C1420" fill-opacity="0.94" stroke="#1E2B3D"/>')
        a(f'<circle cx="{x+34}" cy="312" r="16" fill="{col}" fill-opacity="0.18" stroke="{col}" stroke-opacity="0.55"/>')
        a(f'<text x="{x+34}" y="318" text-anchor="middle" class="m" font-size="11" font-weight="700" fill="{col}">{sym[0]}</text>')
        a(f'<text x="{x+60}" y="310" class="t" font-size="14" font-weight="600" fill="#EAF1F8">{sym}</text>')
        a(f'<text x="{x+60}" y="328" class="t" font-size="11" fill="#6B7C93">{name}</text>')
        a(f'<text x="{x+18}" y="368" class="t" font-size="19" font-weight="700" fill="#EAF1F8">{price}</text>')
        c = "#4ADE80" if up else "#F87171"
        a(f'<text x="{x+18}" y="390" class="m" font-size="12" fill="{c}">{chg}</text>')
        # sparkline
        pts = []
        for k in range(12):
            v = 16 + (k * 3) % 9 + (k % 3) * 4
            pts.append(f"{x+96+k*7},{394-v}")
        a(f'<polyline points="{" ".join(pts)}" fill="none" stroke="{c}" stroke-width="1.8" stroke-opacity="0.85"/>')

    # ana grafik paneli
    px, py, pw, ph = 56, 432, 748, 206
    a(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="16" fill="#0C1420" fill-opacity="0.95" stroke="#1E2B3D"/>')
    a(f'<text x="{px+24}" y="{py+32}" class="t" font-size="13" fill="#8FA0BD" letter-spacing="2">BTC / TRY · 24 SAAT</text>')
    a(f'<text x="{px+24}" y="{py+66}" class="t" font-size="26" font-weight="700" fill="#EAF1F8">₺2.184.500</text>')
    a(f'<text x="{px+200}" y="{py+64}" class="m" font-size="12" fill="#4ADE80">+2,41%</text>')
    # alan grafiği
    import random
    random.seed(7)
    base_y = py + 170
    pts = []
    for k in range(26):
        x = px + 30 + k * ((pw - 60) / 25)
        y = base_y - 18 - (k * 1.9) % 46 - random.randint(0, 14)
        pts.append((x, y))
    line = " ".join(f"{x:.0f},{y:.0f}" for x, y in pts)
    a(f'<polyline points="{line}" fill="none" stroke="{C1}" stroke-width="2.4" stroke-linejoin="round"/>')
    a(f'<polygon points="{line} {pts[-1][0]:.0f},{base_y} {pts[0][0]:.0f},{base_y}" fill="{C1}" fill-opacity="0.12"/>')
    a(f'<line x1="{px+30}" y1="{base_y}" x2="{px+pw-30}" y2="{base_y}" stroke="#FFFFFF" stroke-opacity="0.08"/>')

    # sağ: dönüştürücü + portföy
    sx, sy, sw, sh = 828, 278, 396, 360
    a(f'<rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" rx="16" fill="#0C1420" fill-opacity="0.95" stroke="#1E2B3D"/>')
    a(f'<text x="{sx+24}" y="{sy+32}" class="t" font-size="12" fill="{C2}" letter-spacing="2">DÖNÜŞTÜRÜCÜ</text>')
    a(f'<rect x="{sx+24}" y="{sy+48}" width="{sw-48}" height="46" rx="10" fill="#080E17" stroke="#1E2B3D"/>')
    a(f'<text x="{sx+42}" y="{sy+77}" class="t" font-size="15" fill="#EAF1F8">1 BTC</text>')
    a(f'<text x="{sx+sw-42}" y="{sy+77}" text-anchor="end" class="m" font-size="12" fill="#6B7C93">BTC</text>')
    a(f'<text x="{sx+sw/2}" y="{sy+124}" text-anchor="middle" class="m" font-size="13" fill="{C1}">⇅</text>')
    a(f'<rect x="{sx+24}" y="{sy+136}" width="{sw-48}" height="46" rx="10" fill="#080E17" stroke="#1E2B3D"/>')
    a(f'<text x="{sx+42}" y="{sy+165}" class="t" font-size="15" fill="#EAF1F8">2.184.500 TRY</text>')
    a(f'<text x="{sx+sw-42}" y="{sy+165}" text-anchor="end" class="m" font-size="12" fill="#6B7C93">TRY</text>')
    a(f'<line x1="{sx+24}" y1="{sy+204}" x2="{sx+sw-24}" y2="{sy+204}" stroke="#FFFFFF" stroke-opacity="0.08"/>')
    a(f'<text x="{sx+24}" y="{sy+234}" class="t" font-size="12" fill="{C2}" letter-spacing="2">PORTFÖY</text>')
    for i, (n, v) in enumerate([("BTC", "0,42 · ₺917.490"), ("ETH", "3,10 · ₺318.700"), ("SOL", "18 · ₺103.560")]):
        y = sy + 262 + i * 30
        a(f'<text x="{sx+24}" y="{y}" class="t" font-size="13" fill="#B9C6D6">{n}</text>')
        a(f'<text x="{sx+sw-24}" y="{y}" text-anchor="end" class="m" font-size="12" fill="#8FA0BD">{v}</text>')
    footer(L, W, H, C1)
    L.append("</svg>")
    return "\n".join(L) + "\n"


# ————————————————————————— PORTFOLYO & BLOG —————————————————————————
def portfolyo() -> str:
    W, H = 1280, 720
    C1, C2 = "#E2E8F0", "#7DD3FC"
    L = base(W, H, "Enes Öztürk — Portfolyo & Blog", C1, C2, "KİŞİSEL SİTE", "07 · PORTFOLYO", with_grid=False)
    a = L.append
    a(f'<text x="56" y="150" class="cap" font-size="12" fill="{C2}">MERHABA, BEN</text>')
    a(f'<text x="56" y="228" class="ttl" font-size="82" fill="#F8FAFC">Enes Öztürk</text>')
    a(f'<text x="60" y="268" class="t" font-size="19" fill="#8FA0BD">')
    a('Bilgisayar Programcılığı Öğrencisi · IoT &amp; Yazılım Geliştirici</text>')
    a(f'<rect x="60" y="292" width="70" height="2" fill="{C2}" fill-opacity="0.7"/>')
    a(f'<text x="56" y="344" class="t" font-size="15" fill="#94A3B8">')
    a('Projeler · deneyim · yazılar — hepsi tek sayfada</text>')
    # düğmeler
    a(f'<rect x="56" y="372" width="150" height="46" rx="23" fill="{C2}" fill-opacity="0.16" stroke="{C2}" stroke-opacity="0.6"/>')
    a(f'<text x="131" y="401" text-anchor="middle" class="t" font-size="14" font-weight="600" fill="{C2}">Projelerim</text>')
    a('<rect x="222" y="372" width="150" height="46" rx="23" fill="#0E1521" stroke="#2A3448"/>')
    a('<text x="297" y="401" text-anchor="middle" class="t" font-size="14" fill="#C7D2E0">İletişim</text>')

    # proje kartları
    projs = [("Atelier", "E-ticaret", "#D4AF37"), ("VKİ Rehberi", "Sağlık", "#4ADE80"),
             ("Kripto Takip", "Finans", "#F7931A")]
    for i, (n, k, col) in enumerate(projs):
        x = 56 + i * 196
        a(f'<rect x="{x}" y="452" width="176" height="150" rx="14" fill="#0C1420" fill-opacity="0.94" stroke="#1E2B3D"/>')
        a(f'<rect x="{x}" y="452" width="176" height="70" rx="14" fill="{col}" fill-opacity="0.10"/>')
        a(f'<circle cx="{x+88}" cy="487" r="20" fill="none" stroke="{col}" stroke-opacity="0.6" stroke-width="1.6"/>')
        a(f'<text x="{x+16}" y="556" class="t" font-size="14" font-weight="600" fill="#EAF1F8">{n}</text>')
        a(f'<text x="{x+16}" y="578" class="m" font-size="11" fill="#6B7C93">{k}</text>')

    # sağ: blog listesi
    bx, by, bw, bh = 686, 132, 538, 470
    a(f'<rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="16" fill="#0C1420" fill-opacity="0.95" stroke="#1E2B3D"/>')
    a(f'<text x="{bx+26}" y="{by+36}" class="t" font-size="12" fill="{C2}" letter-spacing="2">SON YAZILAR</text>')
    posts = [("Vektörlerin gizli dünyası", "3 dk · matematik"),
             ("React\'te durum yönetimi", "6 dk · frontend"),
             ("Rust sahiplik modeli", "5 dk · sistem"),
             ("Solana\'da PDA türetimi", "8 dk · web3")]
    for i, (t, m) in enumerate(posts):
        y = by + 76 + i * 66
        a(f'<circle cx="{bx+34}" cy="{y-6}" r="4" fill="{C2}"/>')
        a(f'<text x="{bx+52}" y="{y}" class="t" font-size="15" fill="#EAF1F8">{t}</text>')
        a(f'<text x="{bx+52}" y="{y+20}" class="m" font-size="11" fill="#6B7C93">{m}</text>')
        a(f'<line x1="{bx+26}" y1="{y+38}" x2="{bx+bw-26}" y2="{y+38}" stroke="#FFFFFF" stroke-opacity="0.05"/>')
    a(f'<text x="{bx+26}" y="{by+392}" class="m" font-size="11" fill="#4E5768">React Router · Signature bileşeni</text>')
    a(f'<text x="{bx+26}" y="{by+412}" class="m" font-size="11" fill="#4E5768">ContactModal · ProjectModal</text>')
    footer(L, W, H, C2)
    L.append("</svg>")
    return "\n".join(L) + "\n"


# ————————————————————————— GERÇEK ZAMANLI CHAT —————————————————————————
def chat() -> str:
    W, H = 1280, 720
    C1, C2 = "#34D399", "#818CF8"
    L = base(W, H, "Gerçek Zamanlı Chat Uygulaması", C1, C2, "SOCKET.IO", "08 · CHAT")
    a = L.append
    a(f'<text x="56" y="178" class="ttl" font-size="64" fill="#EAF7F3">Gerçek Zamanlı Chat</text>')
    a(f'<text x="60" y="216" class="t" font-size="17" fill="#8FB3AC" letter-spacing="3">SOCKET.IO · ODA · ANLIK</text>')
    a(f'<rect x="60" y="238" width="70" height="2" fill="{C1}" fill-opacity="0.75"/>')
    a(f'<text x="56" y="298" class="t" font-size="15" fill="#8FB3AC">Kullanıcı adı · oda seçimi · anlık mesaj · ses efekti</text>')

    # sohbet paneli
    px, py, pw, ph = 56, 330, 760, 300
    a(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="16" fill="#0C1517" fill-opacity="0.95" stroke="#1E3234"/>')
    a(f'<rect x="{px}" y="{py}" width="{pw}" height="46" rx="16" fill="#0A1113"/><rect x="{px}" y="{py+30}" width="{pw}" height="16" fill="#0A1113"/>')
    a(f'<line x1="{px}" y1="{py+46}" x2="{px+pw}" y2="{py+46}" stroke="#1E3234"/>')
    a(f'<circle cx="{px+28}" cy="{py+23}" r="5" fill="{C1}"/>')
    a(f'<text x="{px+44}" y="{py+28}" class="t" font-size="13" fill="#CFE5E0"># genel · 4 kişi çevrimiçi</text>')
    msgs = [("Enes", "Sunucu ayakta mı?", "#818CF8", False),
            ("Zeynep", "Evet, socket bağlı ✓", "#34D399", True),
            ("Enes", "Odaya 3 kişi katıldı", "#818CF8", False),
            ("Mert", "Mesajlar anlık düşüyor, güzel", "#FBBF24", True)]
    y = py + 84
    for who, text, col, left in msgs:
        if left:
            a(f'<rect x="{px+24}" y="{y-22}" width="{min(420, 16+len(text)*7.4)}" height="40" rx="12" fill="#101C1F" stroke="#1E3234"/>')
            a(f'<text x="{px+38}" y="{y-6}" class="m" font-size="10.5" fill="{col}">{who}</text>')
            a(f'<text x="{px+38}" y="{y+11}" class="t" font-size="13" fill="#DDEAE7">{text}</text>')
        else:
            w = min(420, 16 + len(text) * 7.4)
            a(f'<rect x="{px+pw-24-w}" y="{y-22}" width="{w}" height="40" rx="12" fill="{C1}" fill-opacity="0.14" stroke="{C1}" stroke-opacity="0.4"/>')
            a(f'<text x="{px+pw-24-w+14}" y="{y-6}" class="m" font-size="10.5" fill="{C1}">{who}</text>')
            a(f'<text x="{px+pw-24-w+14}" y="{y+11}" class="t" font-size="13" fill="#EAF7F3">{text}</text>')
        y += 54
    # mesaj girişi
    a(f'<rect x="{px+24}" y="{py+ph-56}" width="{pw-160}" height="38" rx="19" fill="#080F11" stroke="#1E3234"/>')
    a(f'<text x="{px+44}" y="{py+ph-31}" class="t" font-size="12.5" fill="#5C716E">Mesaj yaz…</text>')
    a(f'<rect x="{px+pw-124}" y="{py+ph-56}" width="100" height="38" rx="19" fill="{C1}" fill-opacity="0.18" stroke="{C1}" stroke-opacity="0.6"/>')
    a(f'<text x="{px+pw-74}" y="{py+ph-31}" text-anchor="middle" class="t" font-size="12.5" font-weight="600" fill="{C1}">Gönder</text>')

    # sağ: bağlantı paneli
    sx, sy, sw, sh = 840, 330, 384, 300
    a(f'<rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" rx="16" fill="#0C1517" fill-opacity="0.95" stroke="#1E3234"/>')
    a(f'<text x="{sx+24}" y="{sy+34}" class="t" font-size="12" fill="{C2}" letter-spacing="2">BAĞLANTI</text>')
    rows = [("socket.io", "bağlı", C1), ("oda", "#genel", "#EAF7F3"),
            ("kullanıcı", "Enes", "#EAF7F3"), ("gecikme", "18 ms", C1)]
    for i, (k, v, col) in enumerate(rows):
        y = sy + 70 + i * 36
        a(f'<text x="{sx+24}" y="{y}" class="m" font-size="11.5" fill="#5C716E">{k}</text>')
        a(f'<text x="{sx+sw-24}" y="{y}" text-anchor="end" class="m" font-size="12" fill="{col}">{v}</text>')
        a(f'<line x1="{sx+24}" y1="{y+14}" x2="{sx+sw-24}" y2="{y+14}" stroke="#FFFFFF" stroke-opacity="0.05"/>')
    a(f'<text x="{sx+24}" y="{sy+sh-40}" class="m" font-size="11" fill="#41534F">React · Node.js · Socket.io · tsx</text>')
    footer(L, W, H, C1)
    L.append("</svg>")
    return "\n".join(L) + "\n"


# ————————————————————————— KİTAP ARAMA —————————————————————————
def kitap() -> str:
    W, H = 1280, 720
    C1, C2 = "#E7C07B", "#8FB8A8"
    L = base(W, H, "Kitap Arama Uygulaması", C1, C2, "GOOGLE BOOKS", "09 · KİTAP ARAMA", with_grid=False)
    a = L.append
    a(f'<text x="56" y="176" class="ttl" font-size="68" fill="#F7F2E8">Kitap Arama</text>')
    a(f'<text x="60" y="214" class="t" font-size="17" fill="#A79E8B" letter-spacing="3">GOOGLE BOOKS API · KÜTÜPHANE</text>')
    a(f'<rect x="60" y="236" width="70" height="2" fill="{C1}" fill-opacity="0.75"/>')
    # arama çubuğu
    a(f'<rect x="56" y="266" width="520" height="52" rx="26" fill="#0F0E0C" stroke="{C1}" stroke-opacity="0.5"/>')
    a(f'<circle cx="86" cy="292" r="7" fill="none" stroke="{C1}" stroke-opacity="0.8" stroke-width="2"/>')
    a(f'<line x1="91" y1="297" x2="98" y2="304" stroke="{C1}" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round"/>')
    a(f'<text x="112" y="297" class="t" font-size="15" fill="#8C8577">Kitap veya yazar ara…</text>')
    a(f'<rect x="486" y="276" width="80" height="32" rx="16" fill="{C1}" fill-opacity="0.16" stroke="{C1}" stroke-opacity="0.5"/>')
    a(f'<text x="526" y="297" text-anchor="middle" class="t" font-size="12" font-weight="600" fill="{C1}">ARA</text>')

    # kitap kartları — kapak çizimleri
    books = [("Suç ve Ceza", "Dostoyevski", "#5B2A2A", "#8C4A3F"),
             ("Kürk Mantolu Madonna", "Sabahattin Ali", "#2B3A4A", "#46617A"),
             ("Tutunamayanlar", "Oğuz Atay", "#3A3A2B", "#6B6A4A"),
             ("Sefiller", "Victor Hugo", "#2A3A2E", "#476B52")]
    for i, (name, author, c1b, c2b) in enumerate(books):
        x = 56 + i * 150
        y = 348
        # kitap sırtı + kapağı
        a(f'<rect x="{x+10}" y="{y+6}" width="112" height="160" rx="4" fill="#0A0908"/>')
        a(f'<rect x="{x}" y="{y}" width="112" height="160" rx="4" fill="{c1b}"/>')
        a(f'<rect x="{x}" y="{y}" width="9" height="160" rx="4" fill="{c2b}" fill-opacity="0.9"/>')
        a(f'<line x1="{x+18}" y1="{y+30}" x2="{x+96}" y2="{y+30}" stroke="{C1}" stroke-opacity="0.55" stroke-width="1.4"/>')
        a(f'<text x="{x+56}" y="{y+58}" text-anchor="middle" class="s" font-size="11" fill="#F0E7D6">{name.split()[0]}</text>')
        a(f'<text x="{x+56}" y="{y+74}" text-anchor="middle" class="s" font-size="11" fill="#F0E7D6">{name.split()[-1]}</text>')
        a(f'<circle cx="{x+56}" cy="{y+112}" r="16" fill="none" stroke="{C1}" stroke-opacity="0.4"/>')
        a(f'<text x="{x+16}" y="{y+190}" class="s" font-size="12.5" fill="#EDE5D6">{name[:16]}</text>')
        a(f'<text x="{x+16}" y="{y+210}" class="m" font-size="10.5" fill="#8C8577">{author}</text>')

    # detay paneli
    px, py, pw, ph = 700, 132, 524, 470
    a(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="16" fill="#0F0E0C" fill-opacity="0.95" stroke="#2A2723"/>')
    a(f'<rect x="{px+28}" y="{py+30}" width="76" height="112" rx="4" fill="#5B2A2A"/>')
    a(f'<rect x="{px+28}" y="{py+30}" width="7" height="112" rx="3" fill="#8C4A3F"/>')
    a(f'<text x="{px+122}" y="{py+56}" class="s" font-size="19" fill="#F7F2E8">Suç ve Ceza</text>')
    a(f'<text x="{px+122}" y="{py+78}" class="m" font-size="11.5" fill="#A79E8B">Fyodor Dostoyevski · 1866</text>')
    a(f'<text x="{px+122}" y="{py+102}" class="m" font-size="11" fill="#6E675C">687 sayfa · Roman</text>')
    a(f'<rect x="{px+122}" y="{py+116}" width="110" height="26" rx="13" fill="{C2}" fill-opacity="0.14" stroke="{C2}" stroke-opacity="0.45"/>')
    a(f'<text x="{px+177}" y="{py+133}" text-anchor="middle" class="m" font-size="10.5" fill="{C2}">FAVORİLERE EKLE</text>')
    a(f'<line x1="{px+28}" y1="{py+164}" x2="{px+pw-28}" y2="{py+164}" stroke="#FFFFFF" stroke-opacity="0.07"/>')
    for i in range(5):
        a(f'<rect x="{px+28}" y="{py+186+i*24}" width="{pw-56-i*38}" height="7" rx="3.5" fill="#FFFFFF" fill-opacity="0.09"/>')
    a(f'<text x="{px+28}" y="{py+352}" class="t" font-size="12" fill="{C1}" letter-spacing="2">BENZER KİTAPLAR</text>')
    for i, n in enumerate(["Kumarbaz", "İnsancıklar", "Budala"]):
        x = px + 28 + i * 160
        a(f'<rect x="{x}" y="{py+366}" width="144" height="66" rx="10" fill="#141210" stroke="#2A2723"/>')
        a(f'<rect x="{x+12}" y="{py+378}" width="22" height="42" rx="2" fill="#5B2A2A"/>')
        a(f'<text x="{x+44}" y="{py+398}" class="t" font-size="12" fill="#EDE5D6">{n}</text>')
        a(f'<text x="{x+44}" y="{py+414}" class="m" font-size="10" fill="#6E675C">Dostoyevski</text>')
    footer(L, W, H, C1)
    L.append("</svg>")
    return "\n".join(L) + "\n"


# ————————————————————————— FORM YAPIMCISI —————————————————————————
def form() -> str:
    W, H = 1280, 720
    C1, C2 = "#A78BFA", "#22D3EE"
    L = base(W, H, "Form Yapımcısı", C1, C2, "SÜRÜKLE-BIRAK", "10 · FORM YAPIMCISI")
    a = L.append
    a(f'<text x="56" y="176" class="ttl" font-size="68" fill="#F2F0FA">Form Yapımcısı</text>')
    a(f'<text x="60" y="214" class="t" font-size="17" fill="#9C97B8" letter-spacing="3">SÜRÜKLE · BIRAK · CANLI ÖNİZLEME</text>')
    a(f'<rect x="60" y="236" width="70" height="2" fill="{C1}" fill-opacity="0.75"/>')

    # sol araç kutusu
    tx, ty, tw, th = 56, 282, 210, 320
    a(f'<rect x="{tx}" y="{ty}" width="{tw}" height="{th}" rx="14" fill="#0D0F1A" fill-opacity="0.95" stroke="#242A40"/>')
    a(f'<text x="{tx+20}" y="{ty+30}" class="t" font-size="11.5" fill="{C1}" letter-spacing="2">ARAÇ KUTUSU</text>')
    fields = [("Metin", "Aa"), ("E-posta", "@"), ("Sayı", "12"), ("Tarih", "▤"),
              ("Seçim", "▾"), ("Onay", "☑"), ("Paragraf", "¶"), ("Dosya", "⤒")]
    for i, (n, g) in enumerate(fields):
        col = i % 2
        row = i // 2
        x = tx + 18 + col * 92
        y = ty + 50 + row * 56
        a(f'<rect x="{x}" y="{y}" width="84" height="44" rx="10" fill="#131726" stroke="#2A3350"/>')
        a(f'<text x="{x+42}" y="{y+22}" text-anchor="middle" class="m" font-size="13" fill="{C1}">{g}</text>')
        a(f'<text x="{x+42}" y="{y+36}" text-anchor="middle" class="t" font-size="9.5" fill="#7D84A0">{n}</text>')

    # orta tuval
    cx, cy, cw, ch = 290, 282, 486, 320
    a(f'<rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" rx="14" fill="#0A0C14" stroke="#242A40" stroke-dasharray="6 6"/>')
    a(f'<text x="{cx+20}" y="{cy+30}" class="t" font-size="11.5" fill="#7D84A0" letter-spacing="2">TUVAL</text>')
    blocks = [("Ad Soyad", "Metin alanı"), ("E-posta", "Doğrulamalı e-posta"), ("Mesaj", "Paragraf · 4 satır")]
    for i, (n, k) in enumerate(blocks):
        y = cy + 48 + i * 78
        a(f'<rect x="{cx+20}" y="{y}" width="{cw-40}" height="64" rx="10" fill="#111524" stroke="#2A3350"/>')
        a(f'<rect x="{cx+20}" y="{y}" width="4" height="64" rx="2" fill="{C1}" fill-opacity="0.8"/>')
        a(f'<text x="{cx+38}" y="{y+24}" class="t" font-size="12.5" font-weight="600" fill="#E6E4F2">{n}</text>')
        a(f'<text x="{cx+38}" y="{y+42}" class="m" font-size="10" fill="#6C7490">{k}</text>')
        a(f'<rect x="{cx+cw-96}" y="{y+16}" width="56" height="22" rx="11" fill="{C2}" fill-opacity="0.12" stroke="{C2}" stroke-opacity="0.4"/>')
        a(f'<text x="{cx+cw-68}" y="{y+31}" text-anchor="middle" class="m" font-size="9" fill="{C2}">GEREKLİ</text>')

    # sağ: canlı önizleme
    px, py, pw, ph = 802, 282, 422, 320
    a(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="14" fill="#0D0F1A" fill-opacity="0.95" stroke="#242A40"/>')
    a(f'<text x="{px+22}" y="{py+30}" class="t" font-size="11.5" fill="{C2}" letter-spacing="2">CANLI ÖNİZLEME</text>')
    a(f'<text x="{px+22}" y="{py+62}" class="t" font-size="16" font-weight="600" fill="#E6E4F2">İletişim Formu</text>')
    labels = [("Ad Soyad", "Enes Öztürk"), ("E-posta", "enes@ornek.com"), ("Mesaj", "Merhaba…")]
    for i, (l, v) in enumerate(labels):
        y = py + 92 + i * 62
        a(f'<text x="{px+22}" y="{y}" class="m" font-size="10.5" fill="#7D84A0">{l}</text>')
        a(f'<rect x="{px+22}" y="{y+10}" width="{pw-44}" height="34" rx="8" fill="#080A12" stroke="#2A3350"/>')
        a(f'<text x="{px+36}" y="{y+32}" class="t" font-size="12" fill="#9BA2BC">{v}</text>')
    a(f'<rect x="{px+22}" y="{py+ph-52}" width="130" height="34" rx="17" fill="{C1}" fill-opacity="0.18" stroke="{C1}" stroke-opacity="0.6"/>')
    a(f'<text x="{px+87}" y="{py+ph-30}" text-anchor="middle" class="t" font-size="12" font-weight="600" fill="{C1}">GÖNDER</text>')
    a(f'<text x="{px+170}" y="{py+ph-30}" class="m" font-size="10.5" fill="#5D6480">ExportModal · PreviewModal</text>')
    footer(L, W, H, C1)
    L.append("</svg>")
    return "\n".join(L) + "\n"


# ————————————————————————— HAFIZA OYUNU —————————————————————————
def hafiza() -> str:
    W, H = 1280, 720
    C1, C2 = "#F472B6", "#60A5FA"
    L = base(W, H, "Hafıza Oyunu — Frontend Projeleri", C1, C2, "OYUN", "11 · HAFIZA OYUNU")
    a = L.append
    a(f'<text x="56" y="176" class="ttl" font-size="66" fill="#FBF0F7">Hafıza Oyunu</text>')
    a(f'<text x="60" y="214" class="t" font-size="17" fill="#B39BB0" letter-spacing="3">4×3 MATRİS · HAMLE · EN İYİ SKOR</text>')
    a(f'<rect x="60" y="236" width="70" height="2" fill="{C1}" fill-opacity="0.75"/>')

    # 4x3 kart ızgarası
    symbols = ["⚛", "◈", "▲", "●", "⚛", "✚", "◈", "■", "●", "▲", "■", "✚"]
    opened = {4, 8}
    for i, sym in enumerate(symbols):
        r, c = divmod(i, 4)
        x = 56 + c * 122
        y = 276 + r * 122
        is_open = i in opened
        bg = "#241A2A" if not is_open else "#3A2440"
        a(f'<rect x="{x}" y="{y}" width="108" height="108" rx="14" fill="{bg}" stroke="{C1 if is_open else "#3A2E44"}" stroke-opacity="{0.8 if is_open else 0.6}" stroke-width="{2 if is_open else 1.4}"/>')
        if is_open:
            a(f'<text x="{x+54}" y="{y+68}" text-anchor="middle" class="t" font-size="38" fill="{C2}">{sym}</text>')
        else:
            a(f'<text x="{x+54}" y="{y+66}" text-anchor="middle" class="t" font-size="28" fill="#6A5570">?</text>')

    # skor paneli
    px, py, pw, ph = 566, 276, 658, 362
    a(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="16" fill="#140F18" fill-opacity="0.95" stroke="#3A2E44"/>')
    a(f'<text x="{px+26}" y="{py+36}" class="t" font-size="12" fill="{C1}" letter-spacing="2">SKOR TAHTASI</text>')
    stats = [("HAMLE", "14", C1), ("EŞLEŞME", "4/6", C2), ("SÜRE", "01:12", "#FBBF24"), ("REKOR", "9", "#4ADE80")]
    for i, (k, v, col) in enumerate(stats):
        x = px + 26 + i * 156
        a(f'<rect x="{x}" y="{py+54}" width="140" height="76" rx="12" fill="#1B1420" stroke="#3A2E44"/>')
        a(f'<text x="{x+16}" y="{py+76}" class="m" font-size="9.5" fill="#7C6A82">{k}</text>')
        a(f'<text x="{x+16}" y="{py+112}" class="t" font-size="24" font-weight="700" fill="{col}">{v}</text>')
    # eşleşme ilerlemesi
    a(f'<text x="{px+26}" y="{py+168}" class="m" font-size="10.5" fill="#7C6A82">EŞLEŞME İLERLEMESİ</text>')
    for i in range(6):
        x = px + 26 + i * 100
        filled = i < 4
        a(f'<rect x="{x}" y="{py+180}" width="88" height="12" rx="6" fill="{C2 if filled else "#2A2130"}" fill-opacity="{0.85 if filled else 1}"/>')
    a(f'<text x="{px+26}" y="{py+232}" class="m" font-size="10.5" fill="#7C6A82">PROJE GEREKSİNİMLERİ</text>')
    for i, t in enumerate(["4×3 matris kart dizilimi", "Hamle sayacı ve en iyi skor", "Zafer ekranı ve ses efekti"]):
        a(f'<text x="{px+26}" y="{py+256+i*24}" class="m" font-size="11.5" fill="#9B8AA2">✓ {t}</text>')
    a(f'<text x="{px+26}" y="{py+ph-24}" class="m" font-size="10.5" fill="#5A4C60">audio.ts · confetti.ts · VictoryModal</text>')
    footer(L, W, H, C1)
    L.append("</svg>")
    return "\n".join(L) + "\n"


# ————————————————————————— TAŞ KAĞIT MAKAS —————————————————————————
def tkm() -> str:
    W, H = 1280, 720
    C1, C2 = "#38BDF8", "#FBBF24"
    L = base(W, H, "Taş Kağıt Makas", C1, C2, "OYUN", "12 · TAŞ KAĞIT MAKAS")
    a = L.append
    a(f'<text x="56" y="176" class="ttl" font-size="68" fill="#EDF6FF">Taş · Kağıt · Makas</text>')
    a(f'<text x="60" y="214" class="t" font-size="17" fill="#93A6BC" letter-spacing="3">BİLGİSAYARA KARŞI · HEDEF ±3</text>')
    a(f'<rect x="60" y="236" width="70" height="2" fill="{C1}" fill-opacity="0.75"/>')

    # arena: iki taraf
    ax, ay, aw, ah = 56, 272, 700, 356
    a(f'<rect x="{ax}" y="{ay}" width="{aw}" height="{ah}" rx="16" fill="#0C1219" fill-opacity="0.95" stroke="#22303F"/>')
    a(f'<text x="{ax+aw/2}" y="{ay+34}" text-anchor="middle" class="t" font-size="12" fill="{C1}" letter-spacing="3">ARENA</text>')
    # sen
    a(f'<text x="{ax+120}" y="{ay+78}" text-anchor="middle" class="m" font-size="11" fill="#7A8CA3">SEN</text>')
    a(f'<circle cx="{ax+120}" cy="{ay+168}" r="58" fill="{C1}" fill-opacity="0.10" stroke="{C1}" stroke-opacity="0.45"/>')
    # makas çizimi
    a(f'<g stroke="{C1}" stroke-width="4" fill="none" stroke-linecap="round">'
      f'<path d="M{ax+96} {ay+140} L{ax+150} {ay+196}"/><path d="M{ax+150} {ay+140} L{ax+96} {ay+196}"/>'
      f'<circle cx="{ax+92}" cy="{ay+136}" r="9"/><circle cx="{ax+154}" cy="{ay+136}" r="9"/></g>')
    # vs
    a(f'<text x="{ax+aw/2}" y="{ay+178}" text-anchor="middle" class="t" font-size="26" font-weight="700" fill="#31465C">VS</text>')
    # bilgisayar
    a(f'<text x="{ax+aw-120}" y="{ay+78}" text-anchor="middle" class="m" font-size="11" fill="#7A8CA3">BİLGİSAYAR</text>')
    a(f'<circle cx="{ax+aw-120}" cy="{ay+168}" r="58" fill="{C2}" fill-opacity="0.10" stroke="{C2}" stroke-opacity="0.45"/>')
    a(f'<g stroke="{C2}" stroke-width="4" fill="none" stroke-linejoin="round">'
      f'<path d="M{ax+aw-146} {ay+150} h52 l-10 26 h-32 Z"/><path d="M{ax+aw-136} {ay+142} h32 l-6 8 h-20 Z"/></g>')

    # skor
    a(f'<text x="{ax+aw/2}" y="{ay+258}" text-anchor="middle" class="t" font-size="44" font-weight="700" fill="#EDF6FF">2 — 1</text>')
    a(f'<text x="{ax+aw/2}" y="{ay+282}" text-anchor="middle" class="m" font-size="11" fill="#4ADE80">SON TUR: KAZANDIN</text>')
    # seçim düğmeleri
    for i, (n, g) in enumerate([("TAŞ", "●"), ("KAĞIT", "▭"), ("MAKAS", "✂")]):
        x = ax + 150 + i * 150
        a(f'<rect x="{x}" y="{ay+300}" width="130" height="42" rx="21" fill="#121A24" stroke="{C1}" stroke-opacity="0.4"/>')
        a(f'<text x="{x+65}" y="{ay+327}" text-anchor="middle" class="t" font-size="12" font-weight="600" fill="#B9CCDD">{g}  {n}</text>')

    # tur geçmişi
    px, py, pw, ph = 786, 272, 438, 356
    a(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="16" fill="#0C1219" fill-opacity="0.95" stroke="#22303F"/>')
    a(f'<text x="{px+24}" y="{py+34}" class="t" font-size="12" fill="{C2}" letter-spacing="2">TUR GEÇMİŞİ</text>')
    hist = [("1", "Makas", "Kağıt", "Kazandın", "#4ADE80"), ("2", "Taş", "Taş", "Berabere", "#FBBF24"),
            ("3", "Kağıt", "Taş", "Kazandın", "#4ADE80"), ("4", "Taş", "Kağıt", "Kaybettin", "#F87171")]
    for i, (no, me, cpu, res, col) in enumerate(hist):
        y = py + 66 + i * 52
        a(f'<circle cx="{px+38}" cy="{y}" r="12" fill="#16202B" stroke="#2A3A4C"/>')
        a(f'<text x="{px+38}" y="{y+4}" text-anchor="middle" class="m" font-size="10" fill="#7A8CA3">{no}</text>')
        a(f'<text x="{px+62}" y="{y+4}" class="t" font-size="12.5" fill="#C9D8E6">{me}  vs  {cpu}</text>')
        a(f'<text x="{px+pw-24}" y="{y+4}" text-anchor="end" class="m" font-size="11" fill="{col}">{res}</text>')
        a(f'<line x1="{px+24}" y1="{y+22}" x2="{px+pw-24}" y2="{y+22}" stroke="#FFFFFF" stroke-opacity="0.05"/>')
    a(f'<text x="{px+24}" y="{py+ph-24}" class="m" font-size="10.5" fill="#42566B">gameLogic.ts · audio.ts · RulesModal</text>')
    footer(L, W, H, C1)
    L.append("</svg>")
    return "\n".join(L) + "\n"

PROJECTS = [
    ("enes-öztürk-atelier-_-lüks-giyim-&-e-ticaret", "Atelier — Lüks Giyim", "03",
     "#D4AF37", "#8B7355", atelier),
    ("not-defteri---enes-öztürk", "Not Defteri", "04",
     "#7DD3FC", "#FDE68A", notdefteri),
    ("vücut-kitle-endeksi-&-diyet-rehberi", "VKİ & Diyet Rehberi", "05",
     "#4ADE80", "#38BDF8", vki),
    ("kripto-para---canlı-fiyat-takip-platformu", "Kripto Takip", "06",
     "#F7931A", "#22D3EE", kripto),
    ("enes-öztürk---portfolyo-&-blog", "Portfolyo & Blog", "07",
     "#E2E8F0", "#7DD3FC", portfolyo),
    ("gerçek-zamanlı-chat-uygulaması", "Gerçek Zamanlı Chat", "08",
     "#34D399", "#818CF8", chat),
    ("kitap-arama-uygulaması---enes-öztürk", "Kitap Arama", "09",
     "#E7C07B", "#8FB8A8", kitap),
    ("form-yapımcısı", "Form Yapımcısı", "10",
     "#A78BFA", "#22D3EE", form),
    ("hafıza-oyunu---frontend-projeleri-_-enes-öztürk", "Hafıza Oyunu", "11",
     "#F472B6", "#60A5FA", hafiza),
    ("taş-kağıt-makas", "Taş Kağıt Makas", "12",
     "#38BDF8", "#FBBF24", tkm),
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
