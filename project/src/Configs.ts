export const ASSETS = [
    { alias: "background", src: "assets/environment/background.jpg" },
    { alias: "reel", src: "assets/environment/reel.png" },
    { alias: "button", src: "assets/environment/button.png" },
    { alias: "interface", src: "assets/environment/interface.png" },
    { alias: "plus", src: "assets/environment/plus.png" },
    { alias: "minus", src: "assets/environment/minus.png" },
    { alias: "highlight", src: "assets/environment/highlight.png" },
    { alias: "popup", src: "assets/environment/popup.png" },
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

export const SYMBOLS = [
    { index: 0, base: "BONUS", highlight: "BONUS", payout: { 3: 150, 4: 250, 5: 500 }, texture: "assets/symbols/BONUS.png" },
    { index: 1, base: "H1", highlight: "H1_connect", payout: { 3: 25, 4: 50, 5: 100 }, texture: "assets/symbols/H1.png" },
    { index: 2, base: "H2", highlight: "H2_connect", payout: { 3: 25, 4: 50, 5: 100 }, texture: "assets/symbols/H2.png" },
    { index: 3, base: "H3", highlight: "H3_connect", payout: { 3: 25, 4: 50, 5: 100 }, texture: "assets/symbols/H3.png" },
    { index: 4, base: "H4", highlight: "H4_connect", payout: { 3: 25, 4: 50, 5: 100 }, texture: "assets/symbols/H4.png" },
    { index: 5, base: "H5", highlight: "H5_connect", payout: { 3: 25, 4: 50, 5: 100 }, texture: "assets/symbols/H5.png" },
    { index: 6, base: "H6", highlight: "H6_connect", payout: { 3: 10, 4: 25, 5: 100 }, texture: "assets/symbols/H6.png" },
    { index: 7, base: "M1", highlight: "M1_connect", payout: { 3: 10, 4: 25, 5: 75 }, texture: "assets/symbols/M1.png" },
    { index: 8, base: "M2", highlight: "M2_connect", payout: { 3: 10, 4: 25, 5: 75 }, texture: "assets/symbols/M2.png" },
    { index: 9, base: "M3", highlight: "M3_connect", payout: { 3: 10, 4: 25, 5: 75 }, texture: "assets/symbols/M3.png" },
    { index: 10, base: "M4", highlight: "M4_connect", payout: { 3: 10, 4: 25, 5: 75 }, texture: "assets/symbols/M4.png" },
    { index: 11, base: "M5", highlight: "M5_connect", payout: { 3: 10, 4: 25, 5: 75 }, texture: "assets/symbols/M5.png" },
    { index: 12, base: "M6", highlight: "M6_connect", payout: { 3: 10, 4: 25, 5: 75 }, texture: "assets/symbols/M6.png" },
    { index: 13, base: "9", highlight: "9_connect", payout: { 3: 5, 4: 10, 5: 20 }, texture: "assets/symbols/9.png" },
    { index: 14, base: "10", highlight: "10_connect", payout: { 3: 5, 4: 10, 5: 20 }, texture: "assets/symbols/10.png" },
    { index: 15, base: "A", highlight: "A_connect", payout: { 3: 5, 4: 10, 5: 20 }, texture: "assets/symbols/A.png" },
    { index: 16, base: "K", highlight: "K_connect", payout: { 3: 5, 4: 10, 5: 20 }, texture: "assets/symbols/K.png" },
    { index: 17, base: "Q", highlight: "Q_connect", payout: { 3: 5, 4: 10, 5: 20 }, texture: "assets/symbols/Q.png" },
    { index: 18, base: "J", highlight: "J_connect", payout: { 3: 5, 4: 10, 5: 20 }, texture: "assets/symbols/J.png" },
];

export const REEL_SET = [
    [14, 14, 13, 0,  6,  4,  8,  9,  17, 1,  7,  11, 10, 1,  4, 15, 5,  14, 8,  0,  15, 9,  11, 11, 4,  9,  8,  8,  8,  14, 10, 8,  2,  2,  6,  17, 8,  8, 8,  14, 10, 18, 14, 15, 8,  5,  2, 11, 13, 13],
    [16, 4,  11, 13, 8,  5,  9,  11, 13, 6,  10, 12, 9,  8,  0, 11, 9,  5,  2,  0,  15, 4,  17, 0,  10, 17, 13, 2,  14, 12, 12, 6,  13, 0,  2,  8,  17, 6, 10, 12, 16, 14, 10, 15, 5,  17, 0, 3,  9,  13],
    [14, 11, 4,  12, 11, 18, 16, 11, 17, 14, 16, 15, 14, 1,  6, 15, 12, 14, 11, 17, 13, 0,  16, 1,  10, 17, 6,  17, 14, 15, 13, 17, 8,  15, 4,  4,  4,  3, 8,  17, 2,  2,  5,  9,  10, 1,  1, 5,  7,  16],
    [10, 11, 15, 11, 10, 1,  4,  7,  0,  0,  3,  6,  6,  13, 9, 0,  17, 11, 4,  8,  0,  16, 6,  1,  15, 15, 11, 5,  16, 1,  1,  15, 5,  13, 10, 0,  18, 8, 14, 2,  16, 18, 11, 13, 13, 10, 1, 14, 13, 13],
    [15, 8,  10, 11, 1,  11, 17, 2,  3,  5,  15, 0,  18, 12, 0, 16, 6,  3,  3,  3,  9,  4,  15, 16, 5,  10, 7,  15, 17, 0,  8,  14, 2,  7,  5,  5,  6,  9, 3,  8,  17, 10, 3,  5,  0,  11, 9, 14, 7,  2],
];

export const BET_RANGE = [5, 10, 25, 50, 100];
export enum BET_COMMANDS {
    increase = "increase",
    decrease = "decrease"
}

export const SPIN_STARTED = "spinStarted";
export const SPIN_STOPPED = "spinStopped";
export const DATA_RECEIVED = "dataRecived";