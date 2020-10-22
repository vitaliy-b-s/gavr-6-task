//Функция добавления таска в список
function addTask(event) {
  let listOfTasks = event.target.previousElementSibling.previousElementSibling;
  let li = document.createElement("li");
  let span = document.createElement("span");
  span.className = "task-description";
  li.className = "task";
  let button = document.createElement("button");
  button.className = "remove-task-button";
  button.addEventListener("click", completeTask);
  span.textContent = event.target.previousElementSibling.value;
  li.appendChild(span);
  li.appendChild(button);
  listOfTasks.appendChild(li);
  event.target.previousElementSibling.value = "";
}

//Функция поиска всех соседних элементов
function findSiblings(elem) {
  let siblings = [];
  let sibling = elem.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
}

//Функция отрисовки выбранной категории при мобильном просмотре
function showCategory(e) {
  let chosenCategory = document.querySelector(`.${e.target.dataset.id}`);
  let siblings = findSiblings(chosenCategory);
  chosenCategory.classList.add("showCategory");
  chosenCategory.classList.remove("hideCategory");
  siblings.forEach((item) => {
    item.classList.add("hideCategory");
  });
}

//Функция "таск выполнен"
function completeTask(event) {
  let listOfTasks = event.target.closest(".list-of-tasks");
  let completedTask = event.target.closest(".task");
  listOfTasks.removeChild(completedTask);
}

//Функция отрисовки приложения при возврате на широкий экран
function setup_for_width() {
  let condition = window.matchMedia("screen and (min-width: 768px)");
  if (condition.matches) {
    return;
  } else {
    document.querySelectorAll(".category__container").forEach((item) => {
      item.classList.remove("showCategory");
      item.classList.remove("hideCategory");
    });
  }
}

//Функция сборки всех листнереров в1 место
function addListener() {
  document.querySelectorAll(".add-task").forEach((item) => {
    item.addEventListener("click", addTask);
  });
  document.querySelectorAll(".mobile-button").forEach((item) => {
    item.addEventListener("click", showCategory);
  });
}

document.addEventListener("DOMContentLoaded", addListener);

//Обработчик изменения размера окна
window.addEventListener("resize", setup_for_width);
