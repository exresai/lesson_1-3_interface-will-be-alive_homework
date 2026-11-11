"use strict";

// ДЗ 3. Интерактивная коллекция.
// Выполняйте практические этапы из docs/HOME_WORK.md по порядку.
// Не пытайтесь написать весь файл за один раз: после каждого этапа проверяйте
// связанный сценарий в браузере и фиксируйте рабочее состояние коммитом.

// Этап 3. Найдите карточки и элементы панели подробностей.
// Реализуйте одну общую функцию выбора карточки.

// Этап 4. Найдите кнопки фильтров.
// Показывайте подходящие карточки, обновляйте активную кнопку и счетчик.
// Учтите случай, когда новый фильтр скрывает выбранную карточку.

// Этап 5. Реализуйте случайный выбор среди видимых карточек.
// Затем реализуйте полный сброс интерфейса.

// Этап 6. Запускайте подготовленную CSS-анимацию через класс.
// Не дублируйте оформление в script.js.

const cards = document.querySelectorAll('.collection-card');
const detailsPanel = document.querySelector('#details-panel');
const detailsTitle = document.querySelector('#details-title');
const detailsDescription = document.querySelector('#details-description');

const filterButtons = document.querySelectorAll('.filter-button');
const visibleCount = document.querySelector('#visible-count');

function selectCard(card) {
    cards.forEach((item) => {
        item.classList.remove('collection-card--selected');
        item.setAttribute('aria-pressed', 'false');
    });

    card.classList.add('collection-card--selected');
    card.setAttribute('aria-pressed', 'true');

    detailsTitle.textContent = card.dataset.title;
    detailsDescription.textContent = card.dataset.description;

    detailsPanel.classList.remove('details-panel--pulse');

    requestAnimationFrame(() => {
        detailsPanel.classList.add('details-panel--pulse');
    });
}

function applyFilter(filter) {
    let count = 0;

    cards.forEach((card) => {
        const matches =
        filter === 'all' || card.dataset.category === filter;

        card.classList.toggle('collection-card--hidden', !matches);

        if (matches) {
        count += 1;
        }
    });

    visibleCount.textContent = String(count);
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((item) => {
        item.classList.remove('filter-button--active');
        item.setAttribute('aria-pressed', 'false');
        });

        button.classList.add('filter-button--active');
        button.setAttribute('aria-pressed', 'true');

        applyFilter(button.dataset.filter);
    });
});

cards.forEach((card) => {
    card.addEventListener('click', () => {
        selectCard(card);
    });
});