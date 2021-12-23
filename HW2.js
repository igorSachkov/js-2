"use strict";


//task1


const task1ListLinks = document.querySelectorAll(`.task1 .list a`);

const linkActiveFn = (arrayOfElements) => {
    return (event) => {
        event.preventDefault();
        arrayOfElements.forEach(e => e.classList.contains(`active`) && e.classList.remove(`active`));
        event.currentTarget.classList.add(`active`)
    }
};

task1ListLinks.forEach(e => e.addEventListener(`click`, linkActiveFn(task1ListLinks)))


//task2


const btnStart = document.querySelector(`.start-btn`);
const btnEnd = document.querySelector(`.end-btn`);
const task2ListItems = document.querySelector(`.task2 .list`);

const addListItem = (listArray, event) => {
    const newElement = document.createElement(`li`);
    newElement.classList.add(`list__item`);
    newElement.textContent = `Element ${listArray.children.length + 1}`
    const targetBtn = event.currentTarget.classList;
    if (targetBtn.contains(`end-btn`)) listArray.appendChild(newElement)
    if (targetBtn.contains(`start-btn`)) listArray.prepend(newElement)
}

const editContent = () => {
    //блокируем кнопки добавления
    btnStart.toggleAttribute(`disabled`);
    btnEnd.toggleAttribute(`disabled`);

    //показать кнопку удалить
    document.querySelector('.delete-btn').classList.toggle(`hide`);

    //chek на элементы списка
    document.querySelector(`.task2 .list`).classList.toggle(`edit-mode`)
    document.querySelectorAll(`.task2 .list__item`).forEach(e => {
        e.classList.toggle(`delete-edit`);
        e.addEventListener(`click`, () => e.classList.toggle(`delete`))
    });
}

//функция удаления элементов

const deleteElements = () => {
    const allDelete = document.querySelectorAll(`.delete`);
    allDelete.forEach(e => e.remove());
    editContent();
}

document.querySelector(`.edit-btn`).addEventListener(`click`, editContent);
btnStart.addEventListener(`click`, (event) => addListItem(task2ListItems, event));
btnEnd.addEventListener(`click`, (event) => addListItem(task2ListItems, event));
document.querySelector(`.delete-btn`).addEventListener(`click`, deleteElements);


//task3


const dropItem = document.querySelector(`.drag-n-drop-item`);
dropItem.ondragstart = (event) => {
    event.dataTransfer.setData(`class`, event.target.className);
};

//как убрать border у переносимого элемента dropItem?


const zones = document.querySelectorAll(`.task3 .list__item`);
const dropFn = (event) => {
    const eventItem = document.getElementsByClassName(event.dataTransfer.getData(`class`));
    //проверяем что элемент тот и что перетаскивается туда, куда надо
    if (!event.dataTransfer.getData(`class`) || event.target === eventItem[0]) {
        event.target.classList.remove("list__item-hovered");
        return
    }
    event.target.classList.remove("list__item-hovered");
    event.target.append(eventItem[0])
}
zones.forEach(e => {
    e.ondragover = (event) => event.preventDefault();
    e.ondrop = dropFn;
    e.ondragenter = (event) => event.currentTarget.classList.add("list__item-hovered");
    e.ondragleave = (event) => event.currentTarget.classList.remove("list__item-hovered");
});

