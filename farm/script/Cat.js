class Cat extends Animal{
    constructor(name, age, children = [], addToTotalList = true){
        super(name, age, children = [], addToTotalList);
        this.styleClass = "cat"
    }
}