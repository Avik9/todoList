'use strict'
/**
 * TodoListController.js
 * 
 * This file provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author Avik Kadakia
 */
class TodoListController {
    /**
     * The constructor sets up all event handlers for all user interface
     * controls known at load time, meaning the controls that are declared 
     * inside index.html.
     */
    constructor() {
        // SETUP ALL THE EVENT HANDLERS FOR EXISTING CONTROLS,
        // MEANING THE ONES THAT ARE DECLARED IN index.html

        // FIRST THE NEW LIST BUTTON ON THE HOME SCREEN
        this.registerEventHandler(TodoGUIId.HOME_NEW_LIST_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CREATE_NEW_LIST]);

        // THEN THE CONTROLS ON THE LIST SCREEN
        this.registerEventHandler(TodoGUIId.LIST_HEADING, TodoHTML.CLICK, this[TodoCallback.PROCESS_GO_HOME]);
        this.registerEventHandler(TodoGUIId.LIST_TRASH, TodoHTML.CLICK, this[TodoCallback.PROCESS_CONFIRM_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.LIST_NAME_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_NAME]);
        this.registerEventHandler(TodoGUIId.LIST_OWNER_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_OWNER]);
        this.registerEventHandler(TodoGUIId.LIST_CANCEL_DELETE_LIST, TodoHTML.CLICK, this[TodoCallback.PROCESS_CANCEL_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.LIST_DELETE_LIST, TodoHTML.CLICK, this[TodoCallback.PROCESS_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.LIST_SUBMIT_LIST, TodoHTML.CLICK, this[TodoCallback.PROCESS_SUBMIT_ITEM_CHANGES]);
        this.registerEventHandler(TodoGUIId.LIST_CANCEL_SUBMIT_LIST, TodoHTML.CLICK, this[TodoCallback.PROCESS_CANCEL_ITEM_CHANGES]);
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {TodoGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {TodoHTML} eventName The type of control for which to respond.
     * @param {TodoCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        control.addEventListener(eventName, callback);
    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeOwner() {
        let ownerTextField = document.getElementById(TodoGUIId.LIST_OWNER_TEXTFIELD);
        let newOwner = ownerTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListOwner(listBeingEdited, newOwner);
    }

    processConfirmDeleteList() {
        var deleteListAlertbackground = document.getElementById(TodoGUIId.MODAL_YES_NO_DIALOG_BACKGROUND_HIDE);
        var deleteListAlert = document.getElementById(TodoGUIId.MODAL_YES_NO_DIALOG_HIDE);
        deleteListAlert.id = "modal_yes_no_dialog_show";
        deleteListAlertbackground.id = "modal_yes_no_dialog_background_show";
    }

    /**
     * This function responds when the user wants to 
     * delete the list.
     */
    processDeleteList() {
        let listName = window.todo.model.listToEdit;
        window.todo.model.removeList(listName);

        var deleteListAlertbackground = document.getElementById(TodoGUIId.MODAL_YES_NO_DIALOG_BACKGROUND_SHOW);
        var deleteListAlert = document.getElementById(TodoGUIId.MODAL_YES_NO_DIALOG_SHOW);
        deleteListAlert.id = "modal_yes_no_dialog_hide";
        deleteListAlertbackground.id = "modal_yes_no_dialog_background_hide";

        window.todo.model.goHome();
    }

    /**
     * This function hides the pop up box and returns back to the 
     */
    processCancelDeleteList() {
        
        var deleteListAlertbackground = document.getElementById(TodoGUIId.MODAL_YES_NO_DIALOG_BACKGROUND_SHOW);
        var deleteListAlert = document.getElementById(TodoGUIId.MODAL_YES_NO_DIALOG_SHOW);
        deleteListAlert.id = "modal_yes_no_dialog_hide";
        deleteListAlertbackground.id = "modal_yes_no_dialog_background_hide";
    }

    processEditItem(itemNumber) {

        let itemName = window.todo.model.listToEdit.getItemAtIndex(itemNumber);
        window.todo.model.newItem = false;

        // LOAD THE SELECTED ITEM
        window.todo.model.loadItem(itemName.getDescription());

        // CHANGE THE SCREEN
        window.todo.model.goItem();
    }

    /**
     * This function is called when the user requests to create
     * a new list.
     */
    processCreateNewList() {
        // MAKE A BRAND NEW LIST
        window.todo.model.loadNewList();

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks on a link
     * for a list on the home screen.
     * 
     * @param {String} listName The name of the list to load into
     * the controls on the list screen.
     */
    processEditList(listName) {
        // LOAD THE SELECTED LIST
        window.todo.model.loadList(listName);

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome() {
        window.todo.model.goHome();
    }

    /**
     * This function is called in response to when the user clicks
     * on the Task header in the items table.
     */
    processSortItemsByTask() {
        // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Status header in the items table.
     */
    processSortItemsByStatus() {
        // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }

    processSortItemsByDueDate() {
        // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
        }
    }

    processMoveItemUp(position) {
        window.todo.model.listToEdit.moveItemUp(window.todo.model.listToEdit.getItemAtIndex(position));
        window.todo.view.loadItems(window.todo.model.listToEdit);
        event.stopPropagation();
    }

    processMoveItemDown(position) {
        window.todo.model.listToEdit.moveItemDown(window.todo.model.listToEdit.getItemAtIndex(position));
        window.todo.view.loadItems(window.todo.model.listToEdit);
        event.stopPropagation();
    }

    processDeleteItem(position) {
        window.todo.model.listToEdit.removeItem(window.todo.model.listToEdit.getItemAtIndex(position));
        window.todo.view.loadItems(window.todo.model.listToEdit);
        event.stopPropagation();
    }

    /**
     * This function is called when the user requests to create
     * a new item in the list.
     */
    processCreateNewItem() {
        window.todo.model.newItem = true;

        window.todo.model.emptyItemPanel();
        // CHANGE THE SCREEN
        window.todo.model.goItem();

    }

    processSubmitItemChanges() {

        if (window.todo.model.newItem) {
            window.todo.model.newItem = false;
            window.todo.model.createNewItem();
        }

        else {
            window.todo.model.newItem = false;
            window.todo.model.updateItem();
        }

        window.todo.model.itemToEdit = null;

        window.todo.model.emptyItemPanel();

        // window.alert(document.getElementsByClassName("list_item_move_up").length);
        // window.alert(document.getElementsByClassName("list_item_move_up").firstChild);

        window.todo.model.goList();
    }

    processCancelItemChanges() {
        window.todo.model.itemToEdit = null;
        window.todo.model.newItem = false;

        window.todo.model.emptyItemPanel();

        window.todo.model.goList();
    }
}