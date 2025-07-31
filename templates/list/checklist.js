// UQBS Animated Checkbox Lists JavaScript
// Version 1.0 - Last update: 26 July 2025
// Credit: Geoffrey Blazer, 2025; CC BY-NC-SA 4.0 International License.

// Checkbox functionality
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
  } catch (e) {
    console.error('Error saving checkbox state:', e);
  }
}

function loadCheckboxStates() {
  try {
    const saved = localStorage.getItem('IBISCheckboxStates');
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    console.error('Error loading checkbox states:', e);
    return {};
  }
}

function toggleCheckbox(listItem) {
  const checkbox = listItem.querySelector('.uqbs-checkbox');
  const itemId = listItem.dataset.itemId;
  const checked = !checkbox.classList.contains('checked');
  
  if (checked) {
    checkbox.classList.add('checked');
    listItem.classList.add('completed');
  } else {
    checkbox.classList.remove('checked');
    listItem.classList.remove('completed');
  }
  
  saveCheckboxState(itemId, checked);
}

function setupCheckboxes() {
  const states = loadCheckboxStates();
  
  document.querySelectorAll('.uqbs-list-item > li, .uqbs-list-item ol > li').forEach(function(li) {
    const itemId = generateItemId(li);
    li.dataset.itemId = itemId;
    
    const checkbox = document.createElement('div');
    checkbox.className = 'uqbs-checkbox';
    
    if (states[itemId]) {
      checkbox.classList.add('checked');
      li.classList.add('completed');
    }
    
    li.insertBefore(checkbox, li.firstChild);
    
    li.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleCheckbox(li);
    });
  });
}

// Initialize
document.querySelectorAll('.uqbs-list-item > li, .uqbs-list-item ol > li').forEach(function(li,idx){
  li.style.animationDelay = (idx*0.18)+'s'; 
  li.style.opacity=1;
});

setupCheckboxes();
