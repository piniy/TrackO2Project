import test from 'node:test';
import assert from 'node:assert/strict';
import createGame from '../src/features/game.js';
import { evaluateRound } from '../src/features/game-math.js';

function setupGame() {
  const game=createGame(), focused=[];
  game.$nextTick=callback=>callback();
  game.$refs=Object.fromEntries(['question','reveal','finish','hubHeading'].map(target=>[target,{focus:options=>focused.push({target,...options})}]));
  return {game,focused};
}
const best=round=>round.options.find(option=>evaluateRound(round,option.id).correct).id;
function play(game) {
  while(game.phase!=='results') { game.select(best(game.round)); game.confirm(); game.next(); }
}
test('hub, invalid game IDs and unselected rounds cannot advance or score',()=>{
  const {game,focused}=setupGame();
  game.select('left');game.confirm();game.next();game.replay();game.start('missing');
  assert.equal(game.phase,'hub');assert.equal(game.progress,0);assert.deepEqual(game.answers,[]);
  game.start('energy');game.next();game.confirm();
  assert.equal(game.roundIndex,0);assert.equal(game.phase,'question');assert.equal(game.selectedOptionId,null);
  assert.deepEqual(focused,[{target:'question',preventScroll:true}]);
  for(const id of [-1,0,0.5,null,undefined,NaN,Infinity,'missing'])game.select(id);
  assert.equal(game.selectedOptionId,null);
});
test('selection stays editable and uncommitted; confirmation locks and records only once',()=>{
  const {game,focused}=setupGame();game.start('energy');
  game.select('left');game.select('right');
  assert.equal(game.selectedOptionId,'right');assert.equal(game.totals.correct,0);assert.equal(game.progress,0);
  game.confirm();game.confirm();game.select('left');
  assert.equal(game.phase,'reveal');assert.equal(game.answers.length,1);assert.equal(game.selectedOptionId,'right');
  assert.equal(game.totals.correct,1);assert.equal(game.progress,20);
  assert.equal(focused.at(-1).target,'reveal');
  game.next();assert.equal(game.roundIndex,1);assert.equal(game.phase,'question');assert.equal(game.selectedOptionId,null);
  assert.equal(game.progress,20);assert.equal(game.outcome,null);assert.equal(focused.at(-1).target,'question');
});
test('all three games produce accurate review, stable completion and fully clean replay',()=>{
  for(const id of ['energy','choice','water']){
    const {game,focused}=setupGame();game.start(id);play(game);
    assert.equal(game.totals.correct,5);assert.equal(game.progress,100);assert.equal(game.answers.length,5);
    assert.equal(game.phase,'results');assert.equal(focused.at(-1).target,'finish');
    assert.equal(game.review.length,5);
    game.review.forEach(row=>{assert.equal(row.round.id,row.roundId);assert.ok(row.outcome.correct);assert.ok(game.optionText(row.round,row.optionId));});
    const snapshot=JSON.stringify(game.answers);
    game.confirm();game.select('left');game.next();game.start('invalid');
    assert.equal(JSON.stringify(game.answers),snapshot);
    game.replay();assert.equal(game.phase,'question');assert.equal(game.activeGameId,id);
    assert.deepEqual(game.answers,[]);assert.equal(game.roundIndex,0);assert.equal(game.selectedOptionId,null);assert.equal(game.progress,0);assert.equal(game.totals.correct,0);
  }
});
test('changing games and returning to picker discard session, without persistent storage',()=>{
  const {game}=setupGame();game.start('choice');game.select('focused');game.confirm();game.hub();
  assert.equal(game.phase,'hub');assert.equal(game.activeGameId,null);assert.equal(game.selectedOptionId,null);assert.deepEqual(game.answers,[]);
  game.start('water');game.select('amount-0');game.confirm();game.start('energy');
  assert.equal(game.roundIndex,0);assert.deepEqual(game.answers,[]);assert.equal(game.selectedOptionId,null);
});
test('mixed answers and language switches preserve raw outcomes and reveal state',()=>{
  const {game}=setupGame();game.$store={i18n:{locale:'id'}};game.start('choice');
  const choices=['skip','correction','three','four','one'];
  for(const choice of choices){
    game.select(choice);
    const before=JSON.stringify([game.roundIndex,game.selectedOptionId,game.answers]);
    game.$store.i18n.locale='en';assert.equal(JSON.stringify([game.roundIndex,game.selectedOptionId,game.answers]),before);
    game.confirm();const record=JSON.stringify(game.answers);
    const english=game.announcement;game.$store.i18n.locale='id';assert.notEqual(game.announcement,english);assert.equal(JSON.stringify(game.answers),record);game.next();
  }
  assert.equal(game.totals.correct,1);assert.equal(game.totals.quantifiedCount,3);assert.ok(Math.abs(game.totals.savedWh-11.929)<1e-9);
  const before=JSON.stringify(game.answers);game.$store.i18n.locale='en';assert.equal(JSON.stringify(game.answers),before);
  assert.equal(game.duration(254.6),'4 hours 15 minutes');
});
test('memorable comparisons select the largest missed energy ratio and underestimated water amount',()=>{
  const {game}=setupGame();game.start('energy');
  for(const choice of ['left','right','right','left','right']){game.select(choice);game.confirm();game.next();}
  assert.equal(game.totals.correct,0);assert.equal(game.memorable.round.id,'energy-01');
  game.start('water');for(const choice of ['amount-0','amount-2','amount-0','amount-2','amount-0']){game.select(choice);game.confirm();game.next();}
  assert.equal(game.memorable.round.id,'water-01');
});
test('question focus scrolls only when outside the visible area below the sticky header',()=>{
  for(const {top,bottom,shouldScroll} of [{top:100,bottom:150,shouldScroll:false},{top:730,bottom:780,shouldScroll:false},{top:99,bottom:149,shouldScroll:true},{top:731,bottom:781,shouldScroll:true}]){
    const {game,focused}=setupGame(), scroll=[];
    Object.assign(game.$refs.question,{ownerDocument:{defaultView:{innerHeight:800},querySelector:()=>({getBoundingClientRect:()=>({bottom:80})})},getBoundingClientRect:()=>({top,bottom}),scrollIntoView:options=>scroll.push(options)});
    game.start('energy');assert.deepEqual(focused,[{target:'question',preventScroll:true}]);assert.deepEqual(scroll,shouldScroll?[{block:'start',behavior:'instant'}]:[]);
  }
});
test('rendered headings receive focus even when keyed template cleanup removes an Alpine ref',()=>{
  const {game,focused}=setupGame();
  const actual=[];
  game.$root={querySelector:selector=>({focus:()=>actual.push(selector)})};
  game.start('energy');
  game.select('right');game.confirm();game.next();
  assert.deepEqual(actual,['[x-ref="question"]','[x-ref="reveal"]','[x-ref="question"]']);
  assert.deepEqual(focused,[]);
});
test('focus captures the connected root before the invoking round button is removed',()=>{
  const game=createGame(),focused=[];
  const connectedRoot={querySelector:selector=>({focus:()=>focused.push(selector)})};
  let root=connectedRoot,flush;
  Object.defineProperty(game,'$root',{get:()=>root});
  game.$nextTick=callback=>{flush=callback;};
  game.start('energy');root=null;flush();
  assert.deepEqual(focused,['[x-ref="question"]']);
});
