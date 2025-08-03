// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Load Tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }
    
    // Create the addTask Function with Local Storage support
    function addTask(taskText = null, save = true) {
        // If taskText is not provided, get it from input field
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }
        
        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }
        
        // Task Creation and Removal
        // Create a new li element and set its text content
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        
        // Assign onclick event to remove button
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(li);
            
            // Remove from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };
        
        // Append the remove button to the li element
        li.appendChild(removeButton);
        
        // Append the li to taskList
        taskList.appendChild(li);
        
        // Clear the task input field (only when adding new tasks, not when loading)
        if (save) {
            taskInput.value = "";
        }
        
        // Save to Local Storage (only for new tasks, not when loading)
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }
    
    // Initialize and Load Tasks from Local Storage
    loadTasks();
    
    // Attach Event Listeners
    // Add event listener to addButton for click events
    addButton.addEventListener('click', function() {
        addTask(); // Call without parameters to get text from input
    });
    
    // Add event listener to taskInput for keypress events (Enter key)
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(); // Call without parameters to get text from input
        }
    });
});