<template>
  <div class="calculator">

    <div class="previousDisplay">{{previous || ''}}</div>
    <div class="display">{{displayCurrent || '0'}}</div>
    <div @click="appendopenbracket('(')" class="btn">(</div>
    <div @click="appendclosebracket(')')" class="btn">)</div>
    <div @click="clear" class="clear">C</div>
    <div @click="append('7')" class="btn">7</div>
    <div @click="append('8')" class="btn">8</div>
    <div @click="append('9')" class="btn">9</div>
    <div @click="divide" class="btn operator">÷</div>
    <div @click="append('4')" class="btn">4</div>
    <div @click="append('5')" class="btn">5</div>
    <div @click="append('6')" class="btn">6</div>
    <div @click="times" class="btn operator">x</div>
    <div @click="append('1')" class="btn">1</div>
    <div @click="append('2')" class="btn">2</div>
    <div @click="append('3')" class="btn">3</div>
    <div @click="minus" class="btn operator">-</div>
    <div @click="append('0')" class="btn zero">0</div>
    <div @click="dot" class="btn">.</div>
    <div @click="equal" class="btn operator">=</div>
    <div @click="add" class="btn operator">+</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previous: null,
      displayCurrent: '',
      operator: null,
      operatorClicked: false
    }
  },
  methods: {
    clear() {
      this.displayCurrent = '';
      this.previous = '';
    },
    append(number) {

      if (this.operatorClicked) {

        this.operatorClicked = false;
      }
      this.displayCurrent = `${this.displayCurrent}${number}`;
    },
    dot() {
      if (this.displayCurrent.indexOf('.') === -1) {
        this.append('.');
      }
    },
    divide() {
      this.displayCurrent = this.displayCurrent + '/';
      this.operator = (a, b) => b / a;
    },
    times() {
      this.displayCurrent = this.displayCurrent + '*';
      this.operator = (a, b) => a * b;
    },
    minus() {
      this.displayCurrent = this.displayCurrent + '-';
      this.operator = (a, b) => b - a;
    },
    add() {
      this.displayCurrent = this.displayCurrent + '+';
      this.operator = (a, b) => a + b;
    },
    equal() {
      this.previous = this.displayCurrent + '=' + `${eval(this.displayCurrent)}`;
      this.displayCurrent = `${eval(this.displayCurrent)}`;
    },
    appendopenbracket(bracket) {
      if(this.displayCurrent.charAt(this.displayCurrent.length)!='*'||this.displayCurrent.charAt(this.displayCurrent.length)!='/'
              ||this.displayCurrent.charAt(this.displayCurrent.length)!='+'
              ||this.displayCurrent.charAt(this.displayCurrent.length)!='-'){

        this.displayCurrent = `${this.displayCurrent}${'*'}${bracket}`;
      }
      else{

        this.displayCurrent = `${this.displayCurrent}${bracket}`;
      }
    },
    appendclosebracket(bracket) {
      this.displayCurrent = `${this.displayCurrent}${bracket}`;
    }
  }
}
</script>

<style scoped>

.calculator {
  margin: 0 auto;
  width: 400px;
  font-size: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
  border: 10px solid #999;
  border-radius:25px;
}

.display {
  grid-column: 1/5;
  background-color: #FFF;
  color: black;
  border: 1px solid #999;
}

.previousDisplay {
  grid-column: 1/5;
  background-color: #FFF;
  color: grey;
  border: 10px solid #999;
  border-radius:50px;
}

.zero {
  grid-column: 1;
}

.clear {
  grid-column: 3/5 ;
  background-color: #C9DAF7;
  border: 1px solid #999;
  border-radius:50px;
}

.btn {
  background-color: #C9DAF7;
  border: 1px solid #999;
  border-radius:50px;
}

.operator {
  background-color: #C9DAF7;
  color: black;
  border-radius:50px;
}


</style>
