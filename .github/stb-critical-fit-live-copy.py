from pathlib import Path
p=Path('system-build-current.html')
s=p.read_text()

def once(old,new,label):
    global s
    n=s.count(old)
    if n!=1: raise SystemExit(f'{label}: expected one match, found {n}')
    s=s.replace(old,new,1)

once('<p class="dim" style="margin-bottom:18px">User 1 chose no built-in gap allowance. If local drywall makes the full-width fit tight, her stated field preference is to trim drywall rather than make the unit visibly narrow. Structural adequacy and installation execution are not evaluated here.</p>', '<p id="review-fit-note" class="dim" style="margin-bottom:18px">User 1 chose no built-in gap allowance. If local drywall makes the full-width fit tight, her stated field preference is to trim drywall rather than make the unit visibly narrow. Structural adequacy and installation execution are not evaluated here.</p>', 'review fit note id')
once('<div class="band warn"><b>Current Alcove truth:</b> User 1\'s starting definition is 72″ high × 45½″ wide × 14″ deep with a 44″ nominal interior span and no built-in gap allowance. Structure, installation execution, commercial terms and allocation remain unresolved.</div>', '<div id="terms-truth" class="band warn"><b>Current Alcove truth:</b> User 1\'s starting definition is 72″ high × 45½″ wide × 14″ deep with a 44″ nominal interior span and no built-in gap allowance. Structure, installation execution, commercial terms and allocation remain unresolved.</div>', 'terms truth id')
once("document.getElementById('r-fit').textContent=gap<0.0001?'0 in — full-width fit':fmt(gap)+' in total clearance';document.getElementById('r-n').textContent=n;", "document.getElementById('r-fit').textContent=gap<0.0001?'0 in — full-width fit':fmt(gap)+' in total clearance';document.getElementById('review-fit-note').textContent=gap<0.0001?'User 1 chose no built-in gap allowance. If local drywall makes the full-width fit tight, her stated field preference is to trim drywall rather than make the unit visibly narrow. Structural adequacy and installation execution are not evaluated here.':'This version includes '+fmt(gap)+' in total opening clearance by reducing the configured unit width. Structural adequacy and installation execution are not evaluated here.';document.getElementById('r-n').textContent=n;", 'live review fit copy')
once("const n=+document.getElementById('c-n').value,d=+document.getElementById('c-d').value,h=+document.getElementById('c-h').value,w=+document.getElementById('c-w').value,span=w-1.5,sp=STORE_FIXTURE[alcove.material];", "const n=+document.getElementById('c-n').value,d=+document.getElementById('c-d').value,h=+document.getElementById('c-h').value,w=+document.getElementById('c-w').value,span=w-1.5,gap=Math.max(0,45.5-w),sp=STORE_FIXTURE[alcove.material];", 'transaction gap')
once("document.getElementById('review-span').textContent=fmt(span)+' in nominal';\n document.getElementById('request-summary').textContent=", "document.getElementById('review-span').textContent=fmt(span)+' in nominal';\n document.getElementById('terms-truth').innerHTML='<b>Current Alcove truth:</b> Confirmed definition '+fmt(h)+'″ high × '+fmt(w)+'″ wide × '+fmt(d)+'″ deep with a '+fmt(span)+'″ nominal interior span; '+(gap<0.0001?'no built-in gap allowance':fmt(gap)+'″ total opening clearance')+'. Structure, installation execution, commercial terms and allocation remain unresolved.';\n document.getElementById('request-summary').textContent=", 'live terms truth')
p.write_text(s)
assert s.count('id="review-fit-note"')==1
assert s.count('id="terms-truth"')==1
