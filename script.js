function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('#taskList li');

    taskItems.forEach(taskItem => {
        const taskText = taskItem.querySelector('span').innerText;
        const isCompleted = taskItem.querySelector('input[type="checkbox"]').checked;

        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(this)">
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button class="edit" onclick="editTask(this)">Edit</button>
                <button class="remove" onclick="removeTask(this)">Hapus</button>
            `;

            document.getElementById('taskList').appendChild(li);
        });
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();

    if (taskValue === '') {
        alert('Tugas tidak boleh kosong!');
        return;
    }

    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" onchange="toggleTaskCompletion(this)">
        <span>${taskValue}</span>
        <button class="edit" onclick="editTask(this)">Edit</button>
        <button class="remove" onclick="removeTask(this)">Hapus</button>
    `;

    taskList.appendChild(li);
    taskInput.value = '';

    saveTasks(); // Simpan tugas setelah menambah tugas baru
}

function toggleTaskCompletion(checkbox) {
    const taskItem = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskItem.classList.add('completed');
    } else {
        taskItem.classList.remove('completed');
    }

    saveTasks(); // Simpan status tugas setelah menandai tugas selesai
}

function removeTask(button) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(button.parentElement);

    saveTasks(); // Simpan tugas setelah menghapus tugas
}

function editTask(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.querySelector('span');
    const currentText = taskText.innerText;

    // Ganti span dengan input untuk mengedit
    const newTextInput = document.createElement('input');
    newTextInput.type = 'text';
    newTextInput.value = currentText;

    taskItem.replaceChild(newTextInput, taskText);

    // Ubah tombol Edit menjadi Simpan
    button.textContent = 'Simpan';
    button.onclick = function() {
        taskText.innerText = newTextInput.value;
        taskItem.replaceChild(taskText, newTextInput);
        button.textContent = 'Edit';
        button.onclick = () => editTask(button);

        saveTasks(); // Simpan perubahan setelah mengedit
    };
}

// Muat tugas saat halaman dimuat
window.onload = loadTasks;
