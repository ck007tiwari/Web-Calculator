class Calculator {
   constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
   }
   clear() {
      this.currentOperand = '';
      this.previousOprand = '';
      this.operation = undefined;
   }
   delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)

   }
   appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return //to take only one dot it will stop if any dot  exist in this string
      this.currentOperand = this.currentOperand.toString() + number.toString(); //To take more then one digit
   }
   chooseOperation(operation) {
      if (this.currentOperand === '') return //to take only one operation
      if (this.previousOprand !== '') {
         this.compute()
      }
      this.operation = operation;
      this.previousOprand = this.currentOperand;
      this.currentOperand = '';
   }
   compute() {
      // return eval(this.currentOperand) //by tripat...
      let computation;
      const prev = parseFloat(this.previousOprand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
         case '+':
            computation = prev + current
            break;
         case '*':
            computation = prev * current
            break;
         case '-':
            computation = prev - current
            break;
         case '/':
            computation = prev / current
            break;
         default:
            return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOprand = ' ';
   }
   getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split(',')[0])
      const decimalDigits = stringNumber.split(',')[1]
      // const floatNumber = parseFloat(number)
      // if (isNaN(floatNumber)) return ''
      // return floatNumber.toLocalString('en')
      let integerDisplay
      if (isNaN(integerDigits)) {
         integerDisplay = ' '
      } else {
         integerDisplay = integerDigits.toLocaleString('en', {
            maximunFractionDigits: 0
         })
      }
      if (decimalDigits != null) {
         return `${integerDisplay}.${decimalDigits}`
      } else {
         return integerDisplay
      }
   }
   updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand); //appending current display 
      if (this.operation != null) {
         this.previousOperandTextElement.innerText = `${this.previousOprand} ${this.operation}` //after pressing any operation button we are shifting currnt display element to previous display, with operation symble
      } else {
         this.previousOperandTextElement.innerText = '';
      }
   }
}
let numberButtons = document.querySelectorAll('[data-number]')
let operationButton = document.querySelectorAll('[data-operation]')
let equalButton = document.querySelector('[data-equal]')
let deleteButton = document.querySelector('[data-delete]')
let resetButton = document.querySelector('[data-reset]')
let previousOperandTextElement = document.querySelector('[data-previous-operand]')
let currentOperandTextElement = document.querySelector('[data-current-operand]')
// console.log(previousOperandTextElement.innerText);
let calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
   button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay();
   })
})
operationButton.forEach(button => {
   button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay();
   })
})

equalButton.addEventListener('click', button => {
   calculator.compute()
   calculator.updateDisplay()
})

resetButton.addEventListener('click', button => {
   calculator.clear()
   calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
   calculator.delete()
   calculator.updateDisplay()
})