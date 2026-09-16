from pathlib import Path
import re

path = Path('system-build-current.html')
text = path.read_text()

accounts = ('Sarah', 'Tom', 'Dick', 'Harry')
buttons = ''.join(
    f'<button data-demo-account="{name}" data-go="projects">{name.upper()} · MY PROJECTS</button>'
    for name in accounts
)
new_gate = (
    '<div class="door-next demo-account-gate">'
    '<p class="dim"><b>Choose the demo account you want to open.</b> '
    'The door sets the starting context; the account controls whose private projects you see.</p>'
    f'<div class="btns demo-account-buttons">{buttons}</div>'
    '</div>'
)

for section_id in ('new-user', 'returning', 'professional'):
    marker = f'<section class="page" id="{section_id}">'
    start = text.find(marker)
    if start < 0:
        raise SystemExit(f'missing section {section_id}')
    end = text.find('</section>', start)
    if end < 0:
        raise SystemExit(f'unclosed section {section_id}')
    end += len('</section>')
    section = text[start:end]
    section2, count = re.subn(
        r'<div class="door-next">.*?</div></div>',
        new_gate,
        section,
        count=1,
        flags=re.S,
    )
    if count != 1:
        raise SystemExit(f'{section_id}: expected one door-next block, found {count}')
    text = text[:start] + section2 + text[end:]

project_marker = '<section class="page" id="projects">'
if text.count(project_marker) != 1:
    raise SystemExit(f'expected one projects section, found {text.count(project_marker)}')
project_header = (
    project_marker
    + '<div class="demo-active-account" data-demo-active-account>'
      '<span>ACTIVE DEMO ACCOUNT</span> · <b id="demo-active-account-name">SARAH</b> · <span>MY PROJECTS</span>'
      '</div>'
      '<div class="demo-empty-projects" id="demo-empty-projects" hidden>'
      '<h2>MY PROJECTS</h2>'
      '<p><b id="demo-empty-account-name">TOM</b> has no saved projects in this public walkthrough.</p>'
      '<p class="dim">That is deliberate: changing accounts does not expose Sarah\'s private project fixtures.</p>'
      '<div class="btns"><button data-go="start-own">+ START ANOTHER PROJECT</button></div>'
      '</div>'
)
text = text.replace(project_marker, project_header, 1)

css = '''
.demo-account-gate{margin-top:20px;padding-top:14px;border-top:1px solid var(--border)}
.demo-account-buttons button{font-weight:600}
.demo-active-account{grid-column:1/-1;padding:9px 14px;border-bottom:1px solid var(--border);background:var(--tint);font-size:11.5px;color:var(--text2)}
.demo-active-account b{color:var(--accent)}
.demo-empty-projects{padding:28px 26px;border-right:1px solid var(--border);min-height:360px}
@media(max-width:760px){.demo-empty-projects{border-right:0;border-bottom:1px solid var(--border)}}
'''
if text.count('</style>') < 1:
    raise SystemExit('missing style close')
text = text.replace('</style>', css + '</style>', 1)

script = '''
<script>
(function(){
  const key='stb-review-demo-account';
  const allowed=['Sarah','Tom','Dick','Harry'];
  function renderAccount(name){
    if(!allowed.includes(name)) name='Sarah';
    const active=document.getElementById('demo-active-account-name');
    if(active) active.textContent=name.toUpperCase();
    const emptyName=document.getElementById('demo-empty-account-name');
    if(emptyName) emptyName.textContent=name.toUpperCase();
    const projects=document.getElementById('projects');
    if(!projects) return;
    const split=projects.querySelector(':scope > .split');
    const empty=document.getElementById('demo-empty-projects');
    const showSarah=name==='Sarah';
    if(split) split.hidden=!showSarah;
    if(empty) empty.hidden=showSarah;
  }
  document.addEventListener('click',function(event){
    const button=event.target.closest('[data-demo-account]');
    if(!button) return;
    const name=button.getAttribute('data-demo-account');
    if(!allowed.includes(name)) return;
    localStorage.setItem(key,name);
    renderAccount(name);
  });
  const stored=localStorage.getItem(key);
  renderAccount(allowed.includes(stored)?stored:'Sarah');
})();
</script>
'''
if text.count('</body>') != 1:
    raise SystemExit(f'expected one body close, found {text.count("</body>")}')
text = text.replace('</body>', script + '</body>', 1)

if 'Hitting "Next"' in text or '>Next →</button>' in text:
    raise SystemExit('stale Next workaround remains')
for name in accounts:
    expected = f'data-demo-account="{name}"'
    if text.count(expected) != 3:
        raise SystemExit(f'{name}: expected on all three doors, found {text.count(expected)}')

path.write_text(text)
print('visible account gate patched')
