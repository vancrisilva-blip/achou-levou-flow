"""Transcode existing approved media without replacing its artwork or text."""
from pathlib import Path
from urllib.request import urlopen
from PIL import Image, ImageOps
from io import BytesIO
import json

SOURCES = [
    ('organizador-1.jpg', 'https://static.metricool.com/planner/202610/7121557-file-16336820495806306393.jpeg', 'instagram'),
    ('organizador-2.jpg', 'https://static.metricool.com/planner/202610/7121557-file-14143062076594562370.jpeg', 'instagram'),
    ('organizador-3.jpg', 'https://static.metricool.com/planner/202610/7121557-file-13998905274260762232.jpeg', 'instagram'),
    ('percarbonato-tiktok.jpg', 'https://static.metricool.com/planner/202610/7121557-file-4534238852498338555.png', 'tiktok'),
]
out = Path('public/assets/corrigidos')
out.mkdir(parents=True, exist_ok=True)
report = []
for name, url, network in SOURCES:
    with urlopen(url, timeout=30) as response:
        data = response.read(20_000_001)
    if len(data) > 20_000_000:
        raise ValueError('Arquivo excede o limite de conversão')
    image = ImageOps.exif_transpose(Image.open(BytesIO(data)))
    original = image.size
    if image.mode == 'RGBA':
        canvas = Image.new('RGB', image.size, 'white')
        canvas.paste(image, mask=image.getchannel('A'))
        image = canvas
    else:
        image = image.convert('RGB')
    if network == 'instagram':
        # Preserve the entire artwork; add margins rather than crop text.
        fitted = ImageOps.contain(image, (1080, 1350), Image.Resampling.LANCZOS)
        canvas = Image.new('RGB', (1080, 1350), 'white')
        canvas.paste(fitted, ((1080-fitted.width)//2, (1350-fitted.height)//2))
        image = canvas
    else:
        image.thumbnail((1080, 1920), Image.Resampling.LANCZOS)
    target = out/name
    image.save(target, 'JPEG', quality=95, optimize=True)
    with Image.open(target) as check:
        assert check.format == 'JPEG' and check.mode == 'RGB'
        assert target.stat().st_size < 8_000_000
    report.append({'file': name, 'originalSize': original, 'outputSize': image.size, 'bytes': target.stat().st_size})
print(json.dumps(report))
