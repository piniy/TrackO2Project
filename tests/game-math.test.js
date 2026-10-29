import test from 'node:test';
import assert from 'node:assert/strict';
import { games, gameSources } from '../src/content/game-cards.js';
import { compareEnergy, closestWaterOption, evaluateRound, summarizeAnswers, durationParts, formatWh, formatWater } from '../src/features/game-math.js';
const close = (a,b) => assert.ok(Math.abs(a-b) < 1e-9, `${a} != ${b}`);
test('fifteen uniquely identified rounds have valid option IDs and complete provenance', () => {
  const rounds = games.flatMap(game => game.rounds);
  assert.equal(games.length, 3);
  assert.equal(rounds.length, 15);
  assert.equal(new Set(rounds.map(round => round.id)).size, 15);
  for (const game of games) assert.equal(game.rounds.length, 5);
  for (const round of rounds) {
    assert.equal(new Set(round.options.map(o=>o.id)).size, round.options.length);
    assert.ok(round.evidenceType);
    const source = gameSources[round.sourceId];
    for (const field of ['id','version','url','scope','assumptions','excluded']) assert.ok(source[field]);
    const evaluated = round.options.map(option => evaluateRound(round, option.id));
    assert.equal(evaluated.filter(outcome => outcome.correct).length, 1);
    assert.throws(()=>evaluateRound(round, 'missing'), RangeError);
  }
});
test('energy pairs and bars match the brief without a misleading minimum fill', () => {
  const expected = [[2.907,22,'right'],[29.07,9,'left'],[5.814,4.5,'left'],[14.535,30,'right'],[63,40,'left']];
  games[0].rounds.forEach((round,i)=>{
    const result=evaluateRound(round,'left');
    close(result.leftWh,expected[i][0]); close(result.rightWh,expected[i][1]);
    assert.equal(result.correctOptionId,expected[i][2]);
    result.widths.forEach((width,j)=>close(width,expected[i][j]/Math.max(...expected[i].slice(0,2))*100));
  });
  assert.equal(compareEnergy(2,2).winnerId,'equal');
  assert.equal(compareEnergy(0.001,100).widths[0],0.001);
  for (const value of [0,-1,NaN,Infinity,'1']) assert.throws(()=>compareEnergy(value,2),RangeError);
  const tie={...games[0].rounds[0],options:[{id:'left',wh:2},{id:'right',wh:2}]};
  assert.throws(()=>evaluateRound(tie,'left'),RangeError);
  assert.equal(evaluateRound({...tie,options:[...tie.options,{id:'equal'}]},'equal').correct,true);
});
test('all-best task choices total raw energy once and round LED minutes once', () => {
  const answers=games[1].rounds.map(round=>({outcome:evaluateRound(round,round.options.find(o=>o.best).id)}));
  const total=summarizeAnswers(answers);
  close(total.savedWh,38.190); assert.equal(total.quantifiedCount,4); assert.equal(total.correct,5);
  close(total.ledMinutes,254.6); assert.deepEqual(durationParts(total.ledMinutes),{lessThanMinute:false,hours:4,minutes:15});
  close(answers[0].outcome.savedWh,23.256);
  close(answers[2].outcome.savedWh,0.147);
  close(answers[3].outcome.savedWh,0.252);
  close(answers[4].outcome.savedWh,14.535);
});
test('inadequate and qualitative choices stay null, valid baseline zero and partial savings remain distinct', () => {
  const rounds=games[1].rounds;
  for (const [i,id] of [[0,'skip'],[3,'incomplete']]) {
    const outcome=evaluateRound(rounds[i],id);
    assert.equal(outcome.savedWh,null); assert.equal(outcome.reason,'inadequate');
  }
  rounds[1].options.forEach(o=>{const result=evaluateRound(rounds[1],o.id);assert.equal(result.savedWh,null);assert.equal(result.reason,'qualitative');});
  assert.equal(evaluateRound(rounds[0],'many').savedWh,0);
  close(evaluateRound(rounds[2],'three').savedWh,0.049);
  close(evaluateRound(rounds[4],'one').savedWh,11.628);
  const future={...rounds[0],options:[{id:'extra',inferenceCount:12,meetsGoal:true,best:false}]};
  close(evaluateRound(future,'extra').savedWh,-5.814);
});
test('water totals, split and log-distance buckets match all five authored scenarios', () => {
  const totals=[507.120,151.800,391.840,950.120,16.904];
  const buckets=['amount-1','amount-0','amount-2','amount-1','amount-2'];
  games[2].rounds.forEach((round,i)=>{
    const result=evaluateRound(round,buckets[i]);
    close(result.totalMl,totals[i]); close(result.onsiteMl+result.offsiteMl,totals[i]);
    close(result.bottles,totals[i]/500); assert.equal(result.correct,true);
  });
  const first=evaluateRound(games[2].rounds[0],'amount-1');
  close(first.onsiteMl,66); close(first.offsiteMl,441.12); assert.ok(first.bottles>1);
  assert.equal(games[2].rounds[2].location.projected,true);
  assert.throws(()=>closestWaterOption([{id:'a',ml:1},{id:'b',ml:100}],10),RangeError);
  for(const value of [0,-1,Infinity,NaN]) assert.throws(()=>closestWaterOption([{id:'a',ml:value}],10),RangeError);
  assert.throws(()=>closestWaterOption([],10),RangeError);
  assert.throws(()=>evaluateRound({...games[2].rounds[0],expectedOptionId:'amount-0'},'amount-0'),RangeError);
});
test('locale formatting preserves raw numbers, small nonzero values and duration carries', () => {
  assert.equal(formatWh(23.256,'id'),'23,3 Wh'); assert.equal(formatWh(23.256,'en'),'23.3 Wh');
  assert.equal(formatWh(0.147,'id'),'0,15 Wh'); assert.equal(formatWh(0.00001,'en'),'0.00001 Wh');
  assert.equal(formatWater(5000,'id'),'5 L'); assert.equal(formatWater(507.12,'en'),'507 mL');
  assert.deepEqual(durationParts(119.6),{lessThanMinute:false,hours:2,minutes:0});
  assert.equal(durationParts(0.4).lessThanMinute,true);
});
