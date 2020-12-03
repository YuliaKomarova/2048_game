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


        let fieldElement = createAndAppend({
            className: 'field',
            parentElement: gameFieldElement
        });

        //создание двумерного массива и его заполнение
        this.field = [];

        for(let i = 0; i < size; i++){
            this.field[i] = [];
            for(let j = 0; j < size; j++){
                this.field[i][j] = new Box(fieldElement, this);
            }
        }

        window.onkeyup = function(e) {
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
        }.bind(this);

        console.log(this.field);
    }

    set rating(value){
        this._rating = value;
        this.headerElement.innerHTML = 'Рейтинг: ' + value;
    }

    get rating(){
        return this._rating;
    }

    addRating(value){
        this.rating += value;
    }

    //заполнение массива раедомными числами
    spawnUnit() {
        let emptyBox = []
        for(let i = 0; i < this.field.length; i++){
            for(let j = 0; j < this.field[i].length; j++){
                if(!this.field[i][j].value){
                    emptyBox.push(this.field[i][j]);
                }
            }
        }

        if(emptyBox.length){
            emptyBox[getRangomInt(0, emptyBox.length - 1)].spawn();
        } else{
            alert('You lose!');
        }
    }

    moveRight() {
        let hasMoved = false;
        for(let i = 0; i < this.size; i++){
            for(let j = this.size - 2; j >= 0; j--){
                let currentBox = this.field[i][j];
                if(currentBox.isEmpty){
                    continue;
                }

                let nextBoxKey = j + 1;
                while (nextBoxKey < this.size) {

                    let nextBox = this.field[i][nextBoxKey];
                    if (!nextBox.isEmpty || this.isLastKey(nextBoxKey)){
                        if((nextBox.isEmpty && this.isLastKey(nextBoxKey)) //Последняя строка или пустое значение
                            || nextBox.isSameTo(currentBox)){
                                this.field[i][nextBoxKey].merge(currentBox);
                                hasMoved = true;
                            } else if(!nextBoxKey.isEmpty && nextBoxKey - 1 != j){
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

    }

    isLastKey(key){
        return key == (this.size - 1);
    }

    isFirstKey(key){
        return key == 0;
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
                        if((nextBox.isEmpty && this.isFirstKey(nextBoxKey)) //Последняя строка или пустое значение
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

    }

    moveDown() {
        let hasMoved = false;
        for(let j = 0; j < this.size; j++){
            for(let i = this.size - 2; i >= 0; i--){
                let currentBox = this.field[i][j];
                if(currentBox.isEmpty){
                    continue;
                }

                let nextBoxKey = i + 1;
                while (nextBoxKey < this.size) {

                    let nextBox = this.field[nextBoxKey][j];
                    if (!nextBox.isEmpty || this.isLastKey(nextBoxKey)){
                        if((nextBox.isEmpty && this.isLastKey(nextBoxKey)) //Последняя строка или пустое значение
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

    }

    moveUp() {
        let hasMoved = false;

        for(let j = 0; j < this.size; j++){
            for(let i = 1; i < this.size; i++){
                let currentBox = this.field[i][j];
                if(currentBox.isEmpty){
                    continue;
                }

                let nextBoxKey = i - 1;
                while (nextBoxKey < this.size) {

                    let nextBox = this.field[nextBoxKey][j];
                    if (!nextBox.isEmpty || this.isFirstKey(nextBoxKey)){
                        if((nextBox.isEmpty && this.isFirstKey(nextBoxKey)) //Последняя строка или пустое значение
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

    }

}
