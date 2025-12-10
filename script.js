const STORAGE_KEY = 'todo_list_v1';
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let filter = 'all';

const qAll = (selector) => document.querySelectorAll(selector);
const el = (id) => document.getElementById(id);

const newTodo = el('newTodo');
const addForm = el('addForm');
const todoList = el('todoList');
const stats = el('stats');

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  todoList.innerHTML = '';
  todos.filter(t => filter === 'all' || (filter === 'completed' ? t.completed : !t.completed)).forEach(t => {
	const li = document.createElement('li');
	if(t.completed) li.className = 'completed';
	
	const text = document.createElement('span');
	text.textContent = t.text;
	
	const actions = document.createElement('div');
	actions.className = 'actions';
	
	const toggleBtn = document.createElement('button');
	toggleBtn.className = 'icon-btn';
	toggleBtn.textContent = '✓';
	toggleBtn.title = 'Toggle';
	toggleBtn.onclick = () => { t.completed = !t.completed; save(); render(); };
	
	const editBtn = document.createElement('button');
editBtn.className = 'icon-btn';
editBtn.textContent = '✎';
editBtn.title = 'Edit';
editBtn.onclick = () => {
const val = prompt('Edit task', t.text);
if(val !== null){ t.text = val.trim(); save(); render(); }
};


const delBtn = document.createElement('button');
delBtn.className = 'icon-btn';
delBtn.textContent = '🗑';
delBtn.title = 'Delete';
delBtn.onclick = () => {
todos = todos.filter(x => x !== t);
save(); render();
};


actions.appendChild(toggleBtn);
actions.appendChild(editBtn);
actions.appendChild(delBtn);


li.appendChild(text);
li.appendChild(actions);


todoList.appendChild(li);
});


stats.textContent = todos.length + (todos.length === 1 ? ' task' : ' tasks');
}


addForm.addEventListener('submit', e => {
e.preventDefault();
const v = newTodo.value.trim();
if(!v) return;
todos.push({ text: v, completed: false, created: Date.now() });
newTodo.value = '';
save(); render();
});


qAll('.filter').forEach(btn => btn.addEventListener('click', () => {
filter = btn.dataset.filter || 'all';
qAll('.filter').forEach(b => b.classList.remove('active'));
render();
}));


el('clearCompleted').addEventListener('click', () => {
todos = todos.filter(t => !t.completed);
save(); render();
});


el('clearAll').addEventListener('click', () => {
if(!confirm('Clear all tasks?')) return;
todos = [];
save(); render();
});


render();