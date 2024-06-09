
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([]);

  const addTask = (task) => {
    tasks.value.push(task);
  };

  const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  };

  const toggleFav = (taskId) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.isFav = !task.isFav;
    }
  };

  const toggleComplete = (taskId) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  };

  const getTasks = async () => {
    tasks.value = [
      { id: 1, title: 'Membuat Tugas Praktikum PBK', isFav: true, completed: false },
      { id: 2, title: 'Membuat Tugas Praktikum Elektronika Digital', isFav: false, completed: true },
    ];
  };

  const favs = computed(() => tasks.value.filter(task => task.isFav));
  const totalCount = computed(() => tasks.value.filter(task => !task.completed).length);
  const favCount = computed(() => favs.value.length);
  const completedTasks = computed(() => tasks.value.filter(task => task.completed));
  const completedCount = computed(() => completedTasks.value.length);

  return { tasks, addTask, deleteTask, toggleFav, toggleComplete, getTasks, favs, totalCount, favCount, completedTasks, completedCount };
});
