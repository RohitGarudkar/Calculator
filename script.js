// get elements
const currentDisplay = document.getElementById('currentDisplay');
const prevDisplay = document.getElementById('prevDisplay');
const themeToggle = document.getElementById('themeToggle');
const clearHistoryBtn = document.getElementById('clearHistory');
const historyList = document.getElementById('historyList');

// calculator state
let current = '0';
let previous = '';
let operator = '';
let waitingForOperand = false;
let history = [];

// load saved data
function loadData() {
    const savedHistory = localStorage.getItem('calcHistory');
    const savedTheme = localStorage.getItem('calcTheme');
    
    if (savedHistory) {
        try {
            history = JSON.parse(savedHistory);
            renderHistory();
        } catch(e) {
            console.log('failed to load history');
        }
    }
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.textContent = '🌙';
    }
}

// save history to storage
function saveHistory() {
    localStorage.setItem('calcHistory', JSON.stringify(history));
}

// update display
function updateDisplay() {
    currentDisplay.textContent = current;
    
    if (previous && operator) {
        prevDisplay.textContent = `${previous} ${operator}`;
    } else {
        prevDisplay.textContent = '';
    }
}

// clear everything
function clear() {
    current = '0';
    previous = '';
    operator = '';
    waitingForOperand = false;
    updateDisplay();
}

// delete last digit
function deleteLast() {
    if (waitingForOperand) return;
    
    current = current.slice(0, -1) || '0';
    updateDisplay();
}

// handle number input
function inputNumber(num) {
    if (waitingForOperand) {
        current = String(num);
        waitingForOperand = false;
    } else {
        current = current === '0' ? String(num) : current + num;
    }
    updateDisplay();
}

// handle decimal point
function inputDecimal() {
    if (waitingForOperand) {
        current = '0.';
        waitingForOperand = false;
    } else if (current.indexOf('.') === -1) {
        current += '.';
    }
    updateDisplay();
}

// perform calculation
function calculate(nextOp) {
    const inputValue = parseFloat(current);
    
    if (previous === '') {
        previous = inputValue;
    } else if (operator) {
        const prevValue = parseFloat(previous) || 0;
        let result;
        
        // do the math
        switch(operator) {
            case '+':
                result = prevValue + inputValue;
                break;
            case '−':
                result = prevValue - inputValue;
                break;
            case '×':
                result = prevValue * inputValue;
                break;
            case '÷':
                if (inputValue === 0) {
                    current = 'Error: Div by 0';
                    previous = '';
                    operator = '';
                    waitingForOperand = true;
                    updateDisplay();
                    return;
                }
                result = prevValue / inputValue;
                break;
            default:
                result = inputValue;
        }
        
        // fix floating point issues
        result = Math.round(result * 100000000) / 100000000;
        
        // add to history if this is equals
        if (nextOp === '=') {
            addToHistory(`${prevValue} ${operator} ${inputValue}`, result);
        }
        
        current = String(result);
        previous = result;
    }
    
    waitingForOperand = true;
    operator = nextOp;
    updateDisplay();
}

// handle equals
function equals() {
    if (operator && previous !== '') {
        calculate('=');
        operator = '';
        previous = '';
    }
}

// add calculation to history
function addToHistory(calc, result) {
    const entry = {
        calculation: calc,
        result: result,
        timestamp: Date.now()
    };
    
    history.unshift(entry);
    
    // keep only last 10
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    saveHistory();
    renderHistory();
}

// render history list
function renderHistory() {
    if (history.length === 0) {
        historyList.innerHTML = '<div class="history-empty">No calculations yet</div>';
        clearHistoryBtn.classList.add('hidden');
        return;
    }
    
    clearHistoryBtn.classList.remove('hidden');
    
    historyList.innerHTML = history.map(item => `
        <button class="history-item" data-result="${item.result}">
            <div class="history-calc">${item.calculation}</div>
            <div class="history-result">= ${item.result}</div>
        </button>
    `).join('');
}

// clear history
function clearHistory() {
    history = [];
    localStorage.removeItem('calcHistory');
    renderHistory();
}

// use result from history
function useHistoryResult(result) {
    current = String(result);
    previous = '';
    operator = '';
    waitingForOperand = false;
    updateDisplay();
}

// toggle theme
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('calcTheme', isLight ? 'light' : 'dark');
}

// handle button clicks
document.querySelector('.buttons').addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    
    const action = btn.dataset.action;
    const value = btn.dataset.value;
    
    switch(action) {
        case 'clear':
            clear();
            break;
        case 'delete':
            deleteLast();
            break;
        case 'number':
            inputNumber(value);
            break;
        case 'decimal':
            inputDecimal();
            break;
        case 'operator':
            calculate(value);
            break;
        case 'equals':
            equals();
            break;
    }
});

// handle history clicks
historyList.addEventListener('click', (e) => {
    const item = e.target.closest('.history-item');
    if (!item) return;
    
    const result = parseFloat(item.dataset.result);
    useHistoryResult(result);
});

// theme toggle
themeToggle.addEventListener('click', toggleTheme);

// clear history button
clearHistoryBtn.addEventListener('click', clearHistory);

// keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        inputNumber(e.key);
    } else if (e.key === '.') {
        inputDecimal();
    } else if (e.key === '+') {
        calculate('+');
    } else if (e.key === '-') {
        calculate('−');
    } else if (e.key === '*') {
        calculate('×');
    } else if (e.key === '/') {
        e.preventDefault();
        calculate('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        equals();
    } else if (e.key === 'Escape') {
        clear();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    }
});

// initialize
loadData();
updateDisplay();