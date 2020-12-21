class Game {
    constructor(parentElement, size = 4){
        this.size = size;

        let gameFieldElement = createAndAppend({
            className: 'game',
            parentElement
        });

        this.headerElement = createAndAppend({
            className: 'header',
            parentElement: gameFieldElement
        });

        //рейтинг
        this.rating = 0;


        this.fieldElement = createAndAppend({
            className: 'field',
            parentElement: gameFieldElement
        });

        //Заполнение поля
        this.restart();

        window.addEventListener('keyup', function(e) {
            switch(e.keyCode) {
                case 38:
                    this.moveUp();
                    break;
                case 40:
                    this.moveDown();
                    break;
                case 37:
                    this.moveLeft();
                    break;
                case 39:
                    this.moveRight();
                    break;
            }
        }.bind(this));
    }

    set rating(value){
        this._rating = value;
        this.headerElement.innerHTML = 'Счёт: ' + this._rating;
    }

    get rating(){
        return this._rating;
    }

    addRating(value){
        this.rating += value;
    }

    //заполнение массива рандомными числами
    spawnUnit() {
        let emptyBox = []//создание пустого массива
        for(let i = 0; i < this.field.length; i++){
            for(let j = 0; j < this.field[i].length; j++){
                if(!this.field[i][j].value){
                    emptyBox.push(this.field[i][j]);
                }
            }
        }

        if(emptyBox.length){
            emptyBox[getRangomInt(0, emptyBox.length - 1)].spawn();//в рандомную пустую клетку пишу 2 или 4
        }
    }

    restartGame(){
        this.gameOverElement = createAndAppend({
            className: 'game-over',
            parentElement: this.fieldElement
        })

        this.gameOverElement.innerHTML = 'Игра окончена!';
        
        this.restartElement = createAndAppend({
			className: 'restart',
			parentElement: this.gameOverElement,
			value: 'Новая игра'
        }, 'button');
            
        this.restartElement.addEventListener('click', this.restart.bind(this));
    }

    gameOver() {
        let losing = true;
        let vin = false;
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if (this.field[i][j].value == '') {
                    losing = false;
                    break;
                } else if (this.field[i][j].value == 2048){
                    vin = true;
                }
            }
        }
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size - 1; j++){
                if(this.field[i][j].value == this.field[i][j+1].value) {
                    losing = false;
                    break;
                }
            }
        }
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size - 1; j++){
                if(this.field[j][i].value == this.field[j+1][i].value) {
                    losing = false;
                    break;
                }
            }
        }
        if (vin) {
            this.restartGame();
        } else if (losing) {
            this.restartGame();
        }
    }

    moveRight() {
        let hasMoved = false;
        for(let i = 0; i < this.size; i++){
            for(let j = this.size - 2; j >= 0; j--){
                let currentBox = this.field[i][j];//текущая ячейка
                if(currentBox.isEmpty){
                    continue;
                }

                let nextBoxKey = j + 1;
                while (nextBoxKey < this.size) {

                    let nextBox = this.field[i][nextBoxKey];
                    if (!nextBox.isEmpty || this.isLastKey(nextBoxKey)){
                        if((nextBox.isEmpty && this.isLastKey(nextBoxKey)) //Последняя ячейка или пустое значение
                            || nextBox.isSameTo(currentBox)){//или их значения равны
                                this.field[i][nextBoxKey].merge(currentBox);
                                hasMoved = true;
                            } else if(!nextBoxKey.isEmpty && nextBoxKey - 1 != j){//не пустая ячйка и они не равны
                                this.field[i][nextBoxKey - 1].merge(currentBox);
                                hasMoved = true;
                            }
                        break;
                    }
                    nextBoxKey++;
                    nextBox = this.field[i][nextBoxKey];
                }
            }
        }
        
        if (hasMoved) {
            this.spawnUnit();
        }
        this.gameOver();
    }

    moveLeft() {
        let hasMoved = false;
        for(let i = 0; i < this.size; i++){
            for(let j = 1; j < this.size; j++){
                let currentBox = this.field[i][j];
                if(currentBox.isEmpty){
                    continue;
                }

                let nextBoxKey = j - 1;
                while (nextBoxKey >= 0) {

                    let nextBox = this.field[i][nextBoxKey];
                    if (!nextBox.isEmpty || this.isFirstKey(nextBoxKey)){
                        if((nextBox.isEmpty && this.isFirstKey(nextBoxKey))
                            || nextBox.isSameTo(currentBox)){
                                this.field[i][nextBoxKey].merge(currentBox);
                                hasMoved = true;
                            } else if(!nextBoxKey.isEmpty && nextBoxKey + 1 != j){
                                this.field[i][nextBoxKey + 1].merge(currentBox);
                                hasMoved = true;
                            }

                        break;
                    }
                    nextBoxKey--;
                    nextBox = this.field[i][nextBoxKey];
                }
            }
        }
        
        if (hasMoved) {
            this.spawnUnit();
        }
        this.gameOver();
    }

    moveDown() {
        let hasMoved = false;
        for(let i = this.size - 2; i >= 0; i--){
            for(let j = 0; j < this.size; j++){
                let currentBox = this.field[i][j];
                if(currentBox.isEmpty){
                    continue;
                }

                let nextBoxKey = i + 1;
                while (nextBoxKey < this.size) {

                    let nextBox = this.field[nextBoxKey][j];
                    if (!nextBox.isEmpty || this.isLastKey(nextBoxKey)){
                        if((nextBox.isEmpty && this.isLastKey(nextBoxKey))
                            || nextBox.isSameTo(currentBox)){
                                this.field[nextBoxKey][j].merge(currentBox);
                                hasMoved = true;
                            } else if(!nextBoxKey.isEmpty && nextBoxKey - 1 != i){
                                this.field[nextBoxKey - 1][j].merge(currentBox);
                                hasMoved = true;
                            }

                        break;
                    }
                    nextBoxKey++;
                    nextBox = this.field[nextBoxKey][j];
                }
            }
        }
        
        if (hasMoved) {
            this.spawnUnit();
        }
        this.gameOver();
    }

    moveUp() {
        let hasMoved = false;

        for(let i = 1; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                let currentBox = this.field[i][j];
                if(currentBox.isEmpty){
                    continue;
                }

                let nextBoxKey = i - 1;
                while (nextBoxKey < this.size) {

                    let nextBox = this.field[nextBoxKey][j];
                    if (!nextBox.isEmpty || this.isFirstKey(nextBoxKey)){
                        if((nextBox.isEmpty && this.isFirstKey(nextBoxKey)) 
                            || nextBox.isSameTo(currentBox)){
                                this.field[nextBoxKey][j].merge(currentBox);
                                hasMoved = true;
                            } else if(!nextBoxKey.isEmpty && nextBoxKey + 1 != i){
                                this.field[nextBoxKey + 1][j].merge(currentBox);
                                hasMoved = true;
                            }

                        break;
                    }
                    nextBoxKey--;
                    nextBox = this.field[nextBoxKey][j];
                }
            }
        }
        
        if (hasMoved) {
            this.spawnUnit();
        }
        this.gameOver();
    }

    isLastKey(key){
        return key == (this.size - 1);
    }

    isFirstKey(key){
        return key == 0;
    }

    restart() {
        this.fieldElement.innerHTML = '';
        this.rating = 0;
        this.field = [];

        for(let i = 0; i < this.size; i++){
            this.field[i] = [];
            for(let j = 0; j < this.size; j++){
                this.field[i][j] = new Box(this.fieldElement, this);
            }
        }
    }
}
