// Define asset references with aliases and sources for images
export const ASSETS = [
    { alias: "background", src: "assets/environment/background.jpg" },
    { alias: "reel", src: "assets/environment/reel.png" },
    { alias: "button", src: "assets/environment/button.png" },
    { alias: "interface", src: "assets/environment/interface.png" },
    { alias: "plus", src: "assets/environment/plus.png" },
    { alias: "minus", src: "assets/environment/minus.png" },
    { alias: "highlight", src: "assets/environment/highlight.png" },
    { alias: "popup", src: "assets/environment/popup.png" },
    { alias: "payout", src: "assets/environment/payout.png" },
    { alias: "9", src: "assets/symbols/9.png" },
    { alias: "9_connect", src: "assets/symbols/9_connect.png" },
    { alias: "10", src: "assets/symbols/10.png" },
    { alias: "10_connect", src: "assets/symbols/10_connect.png" },
    { alias: "A", src: "assets/symbols/A.png" },
    { alias: "A_connect", src: "assets/symbols/A_connect.png" },
    { alias: "BONUS", src: "assets/symbols/BONUS.png" },
    { alias: "H1", src: "assets/symbols/H1.png" },
    { alias: "H1_connect", src: "assets/symbols/H1_connect.png" },
    { alias: "H2", src: "assets/symbols/H2.png" },
    { alias: "H2_connect", src: "assets/symbols/H2_connect.png" },
    { alias: "H3", src: "assets/symbols/H3.png" },
    { alias: "H3_connect", src: "assets/symbols/H3_connect.png" },
    { alias: "H4", src: "assets/symbols/H4.png" },
    { alias: "H4_connect", src: "assets/symbols/H4_connect.png" },
    { alias: "H5", src: "assets/symbols/H5.png" },
    { alias: "H5_connect", src: "assets/symbols/H5_connect.png" },
    { alias: "H6", src: "assets/symbols/H6.png" },
    { alias: "H6_connect", src: "assets/symbols/H6_connect.png" },
    { alias: "J", src: "assets/symbols/J.png" },
    { alias: "J_connect", src: "assets/symbols/J_connect.png" },
    { alias: "K", src: "assets/symbols/K.png" },
    { alias: "K_connect", src: "assets/symbols/K_connect.png" },
    { alias: "M1", src: "assets/symbols/M1.png" },
    { alias: "M1_connect", src: "assets/symbols/M1_connect.png" },
    { alias: "M2", src: "assets/symbols/M2.png" },
    { alias: "M2_connect", src: "assets/symbols/M2_connect.png" },
    { alias: "M3", src: "assets/symbols/M3.png" },
    { alias: "M3_connect", src: "assets/symbols/M3_connect.png" },
    { alias: "M4", src: "assets/symbols/M4.png" },
    { alias: "M4_connect", src: "assets/symbols/M4_connect.png" },
    { alias: "M5", src: "assets/symbols/M5.png" },
    { alias: "M5_connect", src: "assets/symbols/M5_connect.png" },
    { alias: "M6", src: "assets/symbols/M6.png" },
    { alias: "M6_connect", src: "assets/symbols/M6_connect.png" },
    { alias: "Q", src: "assets/symbols/Q.png" },
    { alias: "Q_connect", src: "assets/symbols/Q_connect.png" },
];

// Symbol payouts and connections
export const SYMBOLS = [
    { index: 0,  base: "BONUS", highlight: "BONUS",      payout: { 3: 25, 4: 50, 5: 75 } },
    { index: 1,  base: "H1",    highlight: "H1_connect", payout: { 3: 10, 4: 15, 5: 25 } },
    { index: 2,  base: "H2",    highlight: "H2_connect", payout: { 3: 10, 4: 15, 5: 25 } },
    { index: 3,  base: "H3",    highlight: "H3_connect", payout: { 3: 10, 4: 15, 5: 25 } },
    { index: 4,  base: "H4",    highlight: "H4_connect", payout: { 3: 10, 4: 15, 5: 25 } },
    { index: 5,  base: "H5",    highlight: "H5_connect", payout: { 3: 10, 4: 15, 5: 25 } },
    { index: 6,  base: "H6",    highlight: "H6_connect", payout: { 3: 10, 4: 15, 5: 25 } },
    { index: 7,  base: "M1",    highlight: "M1_connect", payout: { 3: 3,  4: 5,  5: 10 } },
    { index: 8,  base: "M2",    highlight: "M2_connect", payout: { 3: 3,  4: 5,  5: 10 } },
    { index: 9,  base: "M3",    highlight: "M3_connect", payout: { 3: 3,  4: 5,  5: 10 } },
    { index: 10, base: "M4",    highlight: "M4_connect", payout: { 3: 3,  4: 5,  5: 10 } },
    { index: 11, base: "M5",    highlight: "M5_connect", payout: { 3: 3,  4: 5,  5: 10 } },
    { index: 12, base: "M6",    highlight: "M6_connect", payout: { 3: 3,  4: 5,  5: 10 } },
    { index: 13, base: "9",     highlight: "9_connect",  payout: { 3: 1,  4: 2,  5: 3 } },
    { index: 14, base: "10",    highlight: "10_connect", payout: { 3: 1,  4: 2,  5: 3 } },
    { index: 15, base: "A",     highlight: "A_connect",  payout: { 3: 1,  4: 2,  5: 3 } },
    { index: 16, base: "K",     highlight: "K_connect",  payout: { 3: 1,  4: 2,  5: 3 } },
    { index: 17, base: "Q",     highlight: "Q_connect",  payout: { 3: 1,  4: 2,  5: 3 } },
    { index: 18, base: "J",     highlight: "J_connect",  payout: { 3: 1,  4: 2,  5: 3 } },
];

// Reel setup for the game
export const REEL_SET = [
    [14,  0,  13,  12,   6,   4,   8,   9,  17,   1,   7,  11,  10,   1,  14,  15,   5,  14,   8,   0,  15,   9,   11,  10,   4,   9,   8,   8,  0,  14,  10,  8,    2,   4,   6,   2,   8,   1,   8,  14,   10,   18,   14,   5,   8,    1,   2,   11,  13,  13],
    [16,  1,  11,  12,   8,   5,   4,  11,  17,   6,  10,  12,   9,  14,   0,  11,   9,   5,   2,   8,  15,   4,   17,   0,  10,  17,  13,   2,  0,  12,  12,  6,   13,   0,  11,   8,   2,   6,  10,  12,   16,   14,   10,  15,   5,   17,   0,    3,   9,  13],
    [ 3,  9,   4,  12,  11,  18,  16,   4,  17,  14,  16,  15,  14,   1,   6,  15,  12,  14,   8,  17,  13,   0,   16,   1,  10,   4,   6,  17,  0,  15,  13,  17,   8,  15,   4,   2,   4,   3,   8,  17,    2,    2,    7,   9,  10,    5,   1,    9,   7,  16],
    [10,  6,  15,  12,  10,   1,   4,   7,   0,  13,   3,   6,   6,  14,   9,   0,  17,  11,   4,   8,   0,  16,    6,   1,  10,  15,  11,   5,  0,   1,   1,  15,   5,  13,  10,   0,  18,   8,  14,   2,   16,   18,   11,  13,   5,   10,   1,   14,  13,  13],
    [15,  17, 10,   0,   1,   4,   8,   2,   3,   5,  15,   0,  18,  12,  14,  16,   6,   3,   8,   1,   9,   4,   15,  10,   5,  14,   7,  15,  0,   9,   8,  14,   2,   7,   5,   5,   6,   9,   3,   8,   17,   10,    3,   5,   0,   11,   9,   14,   7,   2],
];

// Winning reel indices and patterns
export const WINNING_REEL_INDICES=[ 
    { index: 3, smyIndex: 12, count: 4, pattern: "line" },
    { index: 5, smyIndex: 4, count: 5, pattern: "v" },
    { index: 8, smyIndex: 17, count: 3, pattern: "line" },
    { index: 12, smyIndex: 14, count: 5, pattern: "reversev" },
    { index: 18, smyIndex: 8, count: 5, pattern: "w" },
    { index: 23, smyIndex: 10, count: 5, pattern: "u" },
    { index: 28, smyIndex: 0, count: 5, pattern: "line" },
    { index: 35, smyIndex: 2, count: 3, pattern: "w" },
    { index: 43, smyIndex: 5, count: 4, pattern: "v" },
];

// Bet range available for the player to choose from
export const BET_RANGE = [5, 10, 25, 50, 100];

// Enum for bet actions (increase or decrease)
export enum BET_COMMANDS {
    increase = "increase",
    decrease = "decrease"
}

// Constants for spin state events
export const SPIN_STARTED = "spinStarted";
export const SPIN_STOPPED = "spinStopped";
export const DATA_RECEIVED = "dataRecived";

// Enum for different spin types
export enum SPIN_TYPES {
    BaseSpin = "baseSpin",
    FreeSpin = "freeSpin"
}

// Payout positions on the screen (coordinates for payout symbols)
export const PAYOUT_POSITIONS=[
    [{ x: 277, y: 148 }, { x: 277, y: 299 }, { x: 277, y: 449 }],
    [{ x: 458, y: 148 }, { x: 458, y: 299 }, { x: 458, y: 449 }],
    [{ x: 639, y: 148 }, { x: 639, y: 299 }, { x: 639, y: 449 }],
    [{ x: 821, y: 148 }, { x: 821, y: 299 }, { x: 821, y: 449 }],
    [{ x: 1002, y: 148 }, { x: 1002, y: 299 }, { x: 1002, y: 449 }]
]