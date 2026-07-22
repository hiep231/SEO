import sys, io, urllib.request, json, re, time
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

time.sleep(2)

url = 'http://localhost:3000/en/product?slug=sony-tai-nghe-bluetooth-soundpeats-air-3-pro-6a4637d6d538eae85ced4d23'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode('utf-8', errors='replace')
    print("OK - Size:", len(html), "bytes")

    title_m = re.search(r'<title[^>]*>(.*?)</title>', html, re.DOTALL)
    title = title_m.group(1).strip() if title_m else 'NOT FOUND'
    print("Title:", title)
    print("Title len:", len(title))

    desc_m = re.search(r'name=["\']description["\'][^>]*content=["\']([^"\']*)["\']', html)
    if not desc_m:
        desc_m = re.search(r'content=["\']([^"\']*)["\'][^>]*name=["\']description["\']', html)
    desc = desc_m.group(1).strip() if desc_m else 'NOT FOUND'
    print("Desc:", desc[:200])
    print("Desc len:", len(desc))

    # JSON-LD
    jld_blocks = re.findall(r'type="application/ld\+json"[^>]*>([\s\S]*?)</script>', html)
    print("JSON-LD blocks:", len(jld_blocks))
    for b in jld_blocks:
        try:
            s = json.loads(b.strip())
            if isinstance(s, dict):
                t = s.get('@type', '')
                print("  Schema type:", t)
                if t == 'Product':
                    print("  ✅ Product schema found!")
                    print("     name:", s.get('name', '')[:60])
                    offers = s.get('offers', {})
                    print("     price:", offers.get('price', 'N/A'), offers.get('priceCurrency', ''))
                    rating = s.get('aggregateRating', {})
                    if rating:
                        print("     rating:", rating.get('ratingValue'), "/", rating.get('reviewCount'), "reviews")
        except Exception as e:
            print("  Parse error:", str(e)[:50])

except Exception as e:
    print("Error:", e)
