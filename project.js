const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  "A": 15,
  "B": 4,
  "C": 6,
  "D": 8
};

const SYMBOL_VALUES = {
  "A": 5,
  "B": 4,
  "C": 3,
  "D": 2
};




const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter the deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);
  
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount. Please enter a valid amount.");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberOfLine = () => {
  while (true) {
    const lines = prompt("Enter the num of lines to bet on (1 - 3) ");
    const numberOfLines = parseFloat(lines);
  
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Please enter a valid amount of lines.");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the total bet per line");
    const numberBet = parseFloat(bet);
  
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, try again.");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {

      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
}

const transpose = (reels) => {
  const rows = [];

  for (i = 0; i < ROWS; i++) {
    rows.push([]);

    for (j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
}

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries() ) {
      rowString += symbol
      if (i < row.length -1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
}

const getWinning = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol !== symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }

  return winnings;
}

const game = () => {
  let balance = deposit();

  while (true) {
    console.log('you have balance of $' + balance);

    const numberOfLines = getNumberOfLine();
    const bet = getBet(balance, numberOfLines);
    
    balance -= bet * numberOfLines;

    const reels = spin();
    const rows = transpose(reels);
    
    printRows(rows);
    const winnings = getWinning(rows, bet, numberOfLines);

    balance += winnings;
    console.log('you won $' + winnings);

    if (balance <= 0) {

      console.log('you are out of money');
      break;
    }

    const playAgain = prompt('Do you want to play again? (y/n) ');

    if (playAgain !== 'y') break;
  }
}

game();

