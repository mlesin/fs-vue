<script setup lang="ts">
import { Layout, LayoutContent, Result, Button } from "ant-design-vue";
import { onMounted, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useStore } from "vuex";

import { ToggleTask } from "@/features/toggle-task";

import { TaskCard, taskModel } from "@/entities/task";

import type { Task } from "@/shared/api";

import styles from "./styles.module.scss";

const route = useRoute();
const taskId = Number(route.params.id as string);

const store = useStore();

const getTaskById = () => {
  store.dispatch(taskModel.actions.getTaskByIdAsync, { taskId });
};
onMounted(getTaskById);

const task = computed((): Task | undefined =>
  store.getters[taskModel.getters.useTask](taskId)
);
const isDetailsLoading = computed(
  (): boolean | undefined => store.state[taskModel.NAMESPACE].isDetailsLoading
);
</script>

<template>
  <Layout :class="styles.root">
    <LayoutContent :class="styles.content">
      <Result
        status="404"
        title="404"
        subTitle="Task was not found"
        v-if="!task && !isDetailsLoading"
      >
        <template #extra>
          <RouterLink to="/"><Button>Back to tasks list</Button></RouterLink>
        </template>
      </Result>
      <TaskCard
        v-else
        :data="task"
        size="default"
        :loading="isDetailsLoading"
        :class="styles.card"
        :bodyStyle="{ height: 400 }"
      >
        <template #actions>
          <ToggleTask :taskId="taskId" :withStatus="true" />
        </template>
        <template #extra>
          <RouterLink to="/">Back to tasks list</RouterLink>
        </template>
      </TaskCard>
    </LayoutContent>
  </Layout>
</template>
