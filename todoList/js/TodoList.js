'use strict'
/**
 * TodoList.js
 * 
 * This class represents a list with all the items in our todo list.
 * 
 * @author McKilla Gorilla
 * @author Avik Kadakia
 */
class TodoList {
    /**
     * The constructor creates a default, empty list.
     */
    constructor() {
        this.name = "Unknown";
        this.owner = "Unknown";
        this.items = new Array();
    }

    // GETTER/SETTER METHODS

    setName(initName) {
        this.name = initName;
    }

    getName() {
        return this.name;
    }

    setOwner(initOwner) {
        this.owner = initOwner;
    }

    getOwner() {
        return this.owner;
    }

    /**
     * Adds an item to the end of the list.
     * 
     * @param {TodoListItem} itemToAdd Item to add to the list.
     */
    addItem(itemToAdd) {
        this.items.push(itemToAdd);
    }

    /**
     * Finds and then removes the argument from the list.
     * 
     * @param {TodoListItem} itemToRemove Item to remove from the list.
     */
    removeItem(itemToRemove) {
        let indexOfItem = this.items.indexOf(itemToRemove);
        this.items.splice(indexOfItem, 1);
    }

    /**
     * Finds the index of the argument in the list.
     * 
     * @param {TodoListItem} item Item to search for in the list.
     */
    getIndexOfItem(item) {
        for (let i = 0; i < this.items.length; i++) {
            let testItem = this.items[i];
            if (testItem === item) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Reeturns the length of the items[]
     */
    getLength() {
        return this.items.length;
    }

    getCurrentLength() {
        let counter = 0;

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] !== null) {
                counter++;
            }
        }

        return counter;
    }

    /**
     * Gets and returns the item at the index location.
     * 
     * @param {Number} index Location in the list of item to return.
     */
    getItemAtIndex(index) {
        return this.items[index];
    }

    moveItemUp(itemToMoveUp) {
        let indexOfItem = this.items.indexOf(itemToMoveUp);

        if (indexOfItem > 0) {
            let temp = this.items[indexOfItem - 1];
            this.items[indexOfItem - 1] = itemToMoveUp;
            this.items[indexOfItem] = temp;
        }
    }

    moveItemDown(itemToMoveDown) {
        let indexOfItem = this.items.indexOf(itemToMoveDown);

        if (indexOfItem < this.getCurrentLength() - 1) {
            let temp = this.items[indexOfItem + 1];
            this.items[indexOfItem + 1] = itemToMoveDown;
            this.items[indexOfItem] = temp;
        }

    }
}