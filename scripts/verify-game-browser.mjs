// Optional browser acceptance suite. Uses an existing Playwright installation.
// GAME_QA_URL defaults to the local production preview; no dependencies are installed.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const baseUrl = process.env.GAME_QA_URL || 'http://127.0.0.1:5178';
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const page = await browser.newPage();
page.setDefaultTimeout(10000);
const errors = [], failures = [], qaResults = [], overflowChecks = [];
page.on('pageerror', error => errors.push(error.message));
page.on('response', response => { if (response.status() >= 400) failures.push({url: response.url(), status: response.status()}); });
const bestPaths = [['right','left','left','right','left'],['focused','manual','one','four','reuse'],['amount-1','amount-0','amount-2','amount-1','amount-2']];

const state = ()=>page.evaluate(()=>{const g=document.querySelector('[x-data="learningGame"]')._x_dataStack[0];return JSON.stringify({id:g.activeGameId,phase:g.phase,index:g.roundIndex,selected:g.selectedOptionId,answers:g.answers});});
const checkOverflow = async(label)=>{const value=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));assert.ok(value.scrollWidth<=value.width,JSON.stringify({label,...value}));overflowChecks.push({label,...value});};
const runGame = async(gameIndex,choices,lang='id',width=1440)=>{await page.setViewportSize({width,height:900});await page.goto(baseUrl + '/game.html');await page.getByRole('button',{name:lang==='en'?'English':'Bahasa Indonesia',exact:true}).click();await page.locator('.play-start').nth(gameIndex).click();for(let i=0;i<choices.length;i++){await checkOverflow(lang+'-'+gameIndex+'-'+i+'-question-'+width);const confirm=page.locator('.play-actions button').first();assert.ok(await confirm.isDisabled());await page.locator('[data-option="'+choices[i]+'"]').click();assert.equal(await page.locator('[role=progressbar]').getAttribute('aria-valuenow'),String(i));const before=await state();await page.getByRole('button',{name:lang==='en'?'Bahasa Indonesia':'English',exact:true}).click();assert.equal(await state(),before);await page.getByRole('button',{name:lang==='en'?'English':'Bahasa Indonesia',exact:true}).click();await confirm.click();assert.equal(await page.locator('[role=progressbar]').getAttribute('aria-valuenow'),String(i+1));assert.equal(await page.locator('.play-option:enabled').count(),0);const after=await state();await page.getByRole('button',{name:lang==='en'?'Bahasa Indonesia':'English',exact:true}).click();assert.equal(await state(),after);await page.getByRole('button',{name:lang==='en'?'English':'Bahasa Indonesia',exact:true}).click();assert.equal(await page.evaluate(()=>document.activeElement.tagName),'BUTTON');await page.locator('.play-method > summary').click();await checkOverflow(lang+'-'+gameIndex+'-'+i+'-reveal-'+width);await page.locator('.play-actions button').last().click();}await page.locator('.play-results').waitFor();assert.ok((await page.locator('.play-score').textContent()).includes('5'));const final=await state();await page.getByRole('button',{name:lang==='en'?'Bahasa Indonesia':'English',exact:true}).click();assert.equal(await state(),final);await page.getByRole('button',{name:lang==='en'?'English':'Bahasa Indonesia',exact:true}).click();await page.locator('.play-review > summary').click();assert.equal(await page.locator('.play-review li').count(),5);await page.locator('.play-review .play-method > summary').first().click();await checkOverflow(lang+'-'+gameIndex+'-results-'+width);if(gameIndex===1){assert.ok((await page.locator('.results-highlight .reward-number').textContent()).includes(lang==='en'?'38.2':'38,2'));assert.ok((await page.locator('.results-highlight .lamp-equivalent strong').textContent()).includes('15'));}await page.locator('.play-result-actions button').first().click();assert.equal(await page.locator('[role=progressbar]').getAttribute('aria-valuenow'),'0');assert.equal(await page.locator('.play-option[aria-pressed=true]').count(),0);assert.equal(await page.locator('details[open]').count(),0);await page.locator('.play-back').click();assert.equal(await page.locator('.play-game').count(),3);qaResults.push({gameIndex,lang,width,rounds:choices.length});};

try {
  for (const width of [320,390,768,1024,1440]) {
    for (const locale of ['id','en']) {
      for (let game=0; game<3; game++) await runGame(game,bestPaths[game],locale,width);
    }
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  for(let game=0;game<3;game++) await runGame(game,bestPaths[game],'en',320);
  for(const route of ['index.html','edukasi.html','game.html','kalkulator.html','referensi.html']) {
    await page.goto(baseUrl + '/' + route);
    await page.getByRole('button',{name:'English',exact:true}).click();
    assert.equal(await page.locator('html').getAttribute('lang'),'en');
    if(route==='kalkulator.html') await page.locator('.katex').first().waitFor();
  }
  assert.deepEqual(errors,[]);
  assert.deepEqual(failures,[]);
  console.log(JSON.stringify({sessions:qaResults.length,rounds:qaResults.reduce((sum,row)=>sum+row.rounds,0),overflowChecks:overflowChecks.length,errors,failures},null,2));
} finally {
  await browser.close();
}
