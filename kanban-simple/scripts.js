document.addEventListener('DOMContentLoaded', function () {
    // Get the form and modal elements
    const addItemForm = document.getElementById('addItemForm');
    const addItemModal = new bootstrap.Modal(document.getElementById('addItemModal'));
    const targetColumnId = document.getElementById('targetColumnId');
  
    // Listen for form submission
    addItemForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Get the form data
      const title = document.getElementById('itemTitle').value;
      const description = document.getElementById('itemDescription').value;
  
      // Find the target column
      const targetColumn = document.getElementById(targetColumnId.value);
  
      // Create a new item
      const newItem = createNewItem(title, description);
  
      // Add the new item to the target column
      targetColumn.appendChild(newItem);
  
      // Reset the form and close the modal
      addItemForm.reset();
      addItemModal.hide();
  
  
    });
  
  // Create a new item element
  function createNewItem(title, description) {
    const item = document.createElement('div');
    item.classList.add('card');
  
    const itemBody = document.createElement('div');
    itemBody.classList.add('card-body');
  
    const itemTitle = document.createElement('h5');
    itemTitle.classList.add('card-title');
    itemTitle.textContent = title;
  
    const itemDescription = document.createElement('p');
    itemDescription.classList.add('card-text', 'description');
    itemDescription.textContent = description;
  
    // Add a delete button to the item
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
      item.remove();
    });
  
    itemBody.appendChild(itemTitle);
    itemBody.appendChild(itemDescription);
    itemBody.appendChild(deleteButton);
    item.appendChild(itemBody);
  
    return item;
  }
  
  // Add columns to the Kanban board
  function addColumn(columnTitle, columnId) {
  const column = document.createElement('div');
  column.classList.add('col-4');
  column.id = columnId;
  
  const columnHeader = document.createElement('h4');
  columnHeader.textContent = columnTitle;
  column.appendChild(columnHeader);
  
  const addButton = document.createElement('button');
  addButton.classList.add('btn', 'btn-primary', 'add-item-btn');
  addButton.textContent = 'Add';
  addButton.addEventListener('click', function() {
    targetColumnId.value = columnId;
    addItemModal.show();
  });
  column.appendChild(addButton);
  
  const container = document.querySelector('.container .row');
  container.appendChild(column);
  }
  
  // Add columns to the Kanban board
  addColumn('To Do', 'to-do');
  addColumn('In Progress', 'in-progress');
  addColumn('Done', 'done');
  });