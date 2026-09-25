const symbols=["🍒","🍋","🔔","💎","⭐","7️⃣"];
const balanceEl=document.querySelector("#balance"),betButtons=document.querySelectorAll(".bet");
const currentBetEl=document.querySelector("#currentBet"),lastWinEl=document.querySelector("#lastWin"),spinsEl=document.querySelector("#spins");
const message=document.querySelector("#message"),spinBtn=document.querySelector("#spin");
const reels=[document.querySelector("#reel1"),document.querySelector("#reel2"),document.querySelector("#reel3")];
let balance=1000,bet=25,spins=0,busy=false;
betButtons.forEach(btn=>btn.addEventListener("click",()=>{if(busy)return;bet=Number(btn.dataset.bet);betButtons.forEach(b=>b.classList.remove("active"));btn.classList.add("active");currentBetEl.textContent=bet;}));
function fmt(n){return n.toLocaleString("es-MX")}
function randomSymbol(){return symbols[Math.floor(Math.random()*symbols.length)]}
function prize(r){
  if(r[0]===r[1]&&r[1]===r[2]){
    if(r[0]==="7️⃣")return bet*25;
    if(r[0]==="💎")return bet*15;
    return bet*10;
  }
  if(r[0]===r[1]||r[1]===r[2]||r[0]===r[2])return bet*2;
  return 0;
}
spinBtn.addEventListener("click",()=>{
  if(busy)return;
  if(balance<bet){message.textContent="No tienes suficientes fichas.";return}
  busy=true;spinBtn.disabled=true;balance-=bet;spins++;
  spinsEl.textContent=spins;lastWinEl.textContent="0";balanceEl.textContent=fmt(balance);message.textContent="Girando…";
  reels.forEach(r=>r.parentElement.classList.add("spinning"));
  const result=[randomSymbol(),randomSymbol(),randomSymbol()];
  setTimeout(()=>reels[0].textContent=result[0],450);
  setTimeout(()=>reels[1].textContent=result[1],800);
  setTimeout(()=>{
    reels[2].textContent=result[2];
    reels.forEach(r=>r.parentElement.classList.remove("spinning"));
    const win=prize(result);
    balance+=win;lastWinEl.textContent=fmt(win);balanceEl.textContent=fmt(balance);
    message.textContent=win?"✨ ¡Ganaste "+fmt(win)+" fichas!":"Sigue intentando ✨";
    busy=false;spinBtn.disabled=false;
  },1150);
});