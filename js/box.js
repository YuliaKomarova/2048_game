class Box{
    constructor(fieldElement, game) {
        this.game = game;

        this.element = createAndAppend({
            className: 'box',
            parentElement: fieldElement
        })

        //случайное заполнение
        if(Math.random() > 0.8) {
            this.spawn();
        }

        this.element.onclick = function(e) {
            this.merge();
        }.bind(this);
        //or  this.element.onclick = this.merge.bind(this);
    }

    get value(){
        return this._value || 0; //возвращение 2/4 или 0
    }
    set value(value){
        this._value = value;
        this.element.innerHTML = value == 0 ? '' : value; //печать в ячейку 2/4 или ничего
        this.element.setAttribute('data-ship', value);
    }

    //очистка ячейки
    clear(){
        this.value = '';
    }

    //умножение числа в ячейке на 2
    merge(box){
        if(this.value){
            this.game.addRating(this.value + box.value);
        }

        this.value += box.value;

        box.clear();
    }

    isSameTo(box){
        return this.value == box.value;
    }

    spawn(){
        this.value = Math.random() > 0.5 ? 4 : 2;
    }

    get isEmpty() {
        return this.value == 0;
    }
}