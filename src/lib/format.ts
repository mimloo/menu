/**
 * Menu prices: no currency sign and no ".00" ("18", "7.45"). Dropping the "$" is standard menu-pricing practice.
 * To bring the sign back everywhere, set CURRENCY = '$'.
 */
export const CURRENCY = '';

/** "18" for whole dollars, "7.45" otherwise. Pass `fixed` in price columns so every row has two decimals. */
export const money = (n: number, fixed = false) => CURRENCY + (fixed || !Number.isInteger(n) ? n.toFixed(2) : String(n));
