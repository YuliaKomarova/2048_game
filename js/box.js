class Box{
    constructor(fieldElement, game) {
        this.game = game;

        this.fieldElement = fieldElement;

        this.element = createAndAppend({
            className: 'box',
            parentElement: fieldElement
        })

        //случайное заполнение
        if(Math.random() > 0.8) {
            this.spawn();
        }
    }

    get value(){
        return this._value || 0; //возвращение 2/4 или 0
    }
    set value(value){
        this._value = value;
        this.element.innerHTML = value == 0 ? '' : value; //печать в ячейку 2/4 или ничего
        this.element.setAttribute('data-ship', value); //добавление атрибута data-ship (закрашивание ячеек)
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

        new AnimateBox (box, this);

        this.value += box.value;

        box.clear();
    }

    isSameTo(box){
        return this.value == box.value;
    }

    spawn(){
        this.value = Math.random() > 0.5 ? 4 : 2;//2 or 4
    }

    get isEmpty() {
        return this.value == 0;
    }
}


class AnimateBox{
    constructor(fromBox, toBox) {
        this.element = createAndAppend({className: 'box animate'});
		this.element.setAttribute('data-ship', fromBox.element.getAttribute('data-ship'));

        this.element.style.top = fromBox.element.offsetTop + 'px';
        this.element.style.left = fromBox.element.offsetLeft + 'px';

        fromBox.fieldElement.appendChild(this.element);

        this.element.style.top = toBox.element.offsetTop + 'px';
        this.element.style.left = toBox.element.offsetLeft + 'px';

        setTimeout(function() {
            fromBox.fieldElement.removeChild(this.element);
        }.bind(this), 1000)
    }
}