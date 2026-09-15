"""Run from repository root: python tests/recovery/check-preservation.py."""
import re,json,hashlib
from pathlib import Path
from html.parser import HTMLParser
class Reader(HTMLParser):
 def __init__(self):super().__init__();self.text=[];self.ids=[];self.routes=[]
 def handle_data(self,s):
  if s.strip():self.text.append(s.strip())
 def handle_starttag(self,t,a):
  a=dict(a)
  if 'id' in a:self.ids.append(a['id'])
  if 'data-go' in a:self.routes.append(a['data-go'])
def pages(s):return {m[1]:m[0] for m in re.finditer(r'<section\b[^>]*id="([^"]+)"[^>]*>.*?</section>',s,re.S)}
def read(s):r=Reader();r.feed(s);return r
baseline=json.loads(Path('provenance/recovery/pre-recovery-inventory.json').read_text())
s=Path('system-build-current.html').read_text();actual=pages(s);r=read(s)
assert len(r.ids)==len(set(r.ids)), 'Duplicate DOM ids'
assert set(r.routes)<=set(actual),'Broken route target'
for id,p in baseline['files']['system-build.html']['pages'].items():
 assert id in actual,id
 if id not in ['alcove-config','alcove-review']:
  assert hashlib.sha256(actual[id].encode()).hexdigest()==p['sha256'],id+' original section changed'
 else:
  text=read(actual[id]).text
  for phrase in p['text']:assert phrase in text,(id,phrase)
for id in ['store','request','yard','terms','recap','record']:
 p=baseline['files']['system-build-current.html']['pages'][id]
 text=read(actual[id]).text
 for phrase in p['text']:assert phrase in text,(id,phrase)
assert 'data-go="store"' in actual['alcove-config']
assert 'data-go="alcove-review"' in actual['store']
assert len(re.findall('data-go=',actual['landing']))==3
assert 'A scan gets the shape.' in actual['alcove-capture']
assert 'You get the numbers.' in actual['alcove-capture']
assert len(actual)==26
print('PASS: 26 pages; 18 original sections byte-identical; all original config/review text retained; six later pages retain all text; no duplicate IDs or broken static routes; three landing doors.')
