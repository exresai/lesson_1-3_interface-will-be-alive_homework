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
const randomButton = document.querySelector('#random-button');
const resetButton = document.querySelector('#reset-button');

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

function clearSelection() {
    cards.forEach((card) => {
        card.classList.remove('collection-card--selected');
        card.setAttribute('aria-pressed', 'false');
    });

    detailsTitle.textContent = 'Выберите карточку';
    detailsDescription.textContent = 'Здесь появится описание выбранного элемента. Используйте данные из атрибутов карточки, не дублируйте тексты в JavaScript.';
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

    const selectedCard = document.querySelector('.collection-card--selected');

    if (selectedCard && selectedCard.classList.contains('collection-card--hidden')) {
        clearSelection();
    }

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

randomButton.addEventListener('click', () => {
    const visibleCards = Array.from(cards).filter(
        (card) => !card.classList.contains('collection-card--hidden')
    );

    const selectedCard = document.querySelector('.collection-card--selected');

    let availableCards = visibleCards;

    if (selectedCard && visibleCards.length > 1) {
        availableCards = visibleCards.filter(
            (card) => card !== selectedCard
        );
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);

    selectCard(availableCards[randomIndex]);
});

resetButton.addEventListener('click', () => {
    clearSelection();

    filterButtons.forEach((button) => {
        button.classList.remove('filter-button--active');
        button.setAttribute('aria-pressed', 'false');
    });

    const allButton = document.querySelector('.filter-button[data-filter="all"]');

    allButton.classList.add('filter-button--active');
    allButton.setAttribute('aria-pressed', 'true');

    applyFilter('all');
});