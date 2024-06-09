<template>
  <main>
    <!-- heading -->
    <header>
      <img src="https://i.pinimg.com/564x/c6/1a/c2/c61ac20f152403df1157c2cb7a6f8275.jpg" alt="pinia logo">
      <h1>Tugas 7 - AnyDo</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">Semua Tugas</button>
      <button @click="filter = 'favs'">Tugas Favorit</button>
      <button @click="filter = 'completed'">Semua Tugas Yang Selesai</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="loading">Memuat</div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>Kamu Mempunyai {{ totalCount }} Tugas Yang Harus Dikerjakan.</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>Kamu Mempunyai {{ favCount }} Tugas Dilist Favorit.</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'completed'">
      <p>Kamu Mempunyai {{ completedCount }} Tugas Yang Sudah Selesai.</p>
      <div v-for="task in completedTasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!-- Reset button -->
    

  </main>
</template>

<script>
  import TaskDetails from './components/TaskDetails.vue';
  import TaskForm from './components/TaskForm.vue';

  import { useTaskStore } from './stores/TaskStore';
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';

  export default {
    components: { TaskDetails, TaskForm },
    setup() {
      const taskStore = useTaskStore();

      const { tasks, loading, favs, totalCount, favCount, completedTasks, completedCount } = storeToRefs(taskStore);

      // fetch tasks
      taskStore.getTasks();

      const filter = ref('all');

      const resetTasks = () => {
        console.log("Resetting tasks...");
        taskStore.$reset();
        // Optionally, refetch tasks after reset
        taskStore.getTasks();
      };

      return { taskStore, filter, tasks, loading, favs, totalCount, favCount, completedTasks, completedCount, resetTasks };
    }
  }
</script>
