import { LOCAL_STORAGE_KEY, DEFAULT_BALANCE } from '$lib/constants/game';
import { balance, gameStage, collegeBudget, selectedCollege, hasDroppedCollegeBall, winRecords } from '$lib/stores/game';
import { get } from 'svelte/store';
import { browser } from '$app/environment';

export function setBalanceFromLocalStorage() {
  if (!browser) return;

  const rawValue = window.localStorage.getItem(LOCAL_STORAGE_KEY.BALANCE);
  const parsedValue = parseFloat(rawValue ?? '');
  if (!isNaN(parsedValue)) {
    balance.set(parsedValue);
  }
}

export function writeBalanceToLocalStorage() {
  if (!browser) return;

  const balanceVal = get(balance);
  if (!isNaN(balanceVal)) {
    const balanceValStr = balanceVal.toFixed(2);
    window.localStorage.setItem(LOCAL_STORAGE_KEY.BALANCE, balanceValStr);
  }
}

export function resetGame() {
  if (!browser) return;

  // Reset all game state
  balance.set(DEFAULT_BALANCE);
  gameStage.set('PLINKO_GAMBLE');
  collegeBudget.set(0);
  selectedCollege.set(null);
  hasDroppedCollegeBall.set(false);
  winRecords.set([]);

  // Clear localStorage
  window.localStorage.removeItem(LOCAL_STORAGE_KEY.BALANCE);
}
