<template>
  <div class="task">
    <h3 :class="{ struck: task.completed }">{{ task.title }}</h3>
    <div class="icons">
      <i 
        class="material-icons" 
        @click="taskStore.deleteTask(task.id)">
        delete
      </i>
      <i 
        class="material-icons"
        :class="{ active: task.isFav }" 
        @click="taskStore.toggleFav(task.id)">
        favorite
      </i>
      <i 
        class="material-icons"
        :class="{ completed: task.completed }" 
        @click="taskStore.toggleComplete(task.id)">
        done
      </i>
    </div>
  </div>
</template>

<script>
  import { useTaskStore } from '../stores/TaskStore';

  export default {
    props: ['task'],
    setup() {
      const taskStore = useTaskStore();

      return { taskStore };
    }
  }
</script>

<style>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icons {
  display: flex;
}

.icons .material-icons {
  cursor: pointer;
  margin-left: 10px;
}

.icons .material-icons.active {
  color: red;
}

.icons .material-icons.completed {
  color: green;
}

.task h3.struck {
  text-decoration: line-through;
}
</style>
