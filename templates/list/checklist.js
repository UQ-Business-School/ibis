// Checkbox functionality
// https://uq-business-school.github.io/ibis/templates/list/checklist.js

function generateItemId(listItem) {
  const text = listItem.textContent.trim().substring(0, 50);
  const position = Array.from(listItem.parentElement.children).indexOf(listItem);
  return btoa(text + '_' + position).replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
}

function saveCheckboxState(itemId, checked) {
  try {
    const saved = localStorage.getItem('IBISCheckboxStates') || '{}';
    const states = JSON.parse(saved);
    states[itemId] = checked;
    localStorage.setItem('IBISCheckboxStates', JSON.stringify(states));
  } catch (e) { console.error('Error saving state:', e); }
}

function loadCheckboxStates() {
  try {
    const saved = localStorage.getItem('IBISCheckboxStates');
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    console.error('Error loading state:', e);
    return {};
  }
}

function toggleCheckbox(listItem) {
  const checkbox = listItem.querySelector('.uqbs-checkbox');
  const itemId = listItem.dataset.itemId;
  const checked = !checkbox.classList.contains('checked');

  checkbox.classList.toggle('checked', checked);
  listItem.classList.toggle('completed', checked);
  saveCheckboxState(itemId, checked);
}

function setupCheckboxes() {
  const states = loadCheckboxStates();
  document.querySelectorAll('.uqbs-list-item > li, .uqbs-list-item ol > li').forEach((li) => {
    const itemId = generateItemId(li);
    li.dataset.itemId = itemId;

    const checkbox = document.createElement('div');
    checkbox.className = 'uqbs-checkbox';
    if (states[itemId]) {
      checkbox.classList.add('checked');
      li.classList.add('completed');
    }

    li.insertBefore(checkbox, li.firstChild);
    li.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCheckbox(li);
    });
  });
}
