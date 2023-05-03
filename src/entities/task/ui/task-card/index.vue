<script setup lang="ts">
import { toRefs, computed, type PropType } from "vue";
import { RouterLink } from "vue-router";
import { Card } from "ant-design-vue";
import type { Task } from "@/shared/api";
import styles from "./styles.module.scss";

const props = defineProps({
  data: { type: Object as PropType<Task> },
  titleHref: String,
  loading: Boolean,
});

const { data, loading, titleHref } = toRefs(props);
const taskNumber = computed(() => (loading?.value ? "" : data?.value?.id));
</script>

<template>
  <Card :title="`Task#${taskNumber || ''}`" :class="styles.root">
    <RouterLink v-if="titleHref" :to="titleHref">{{ data?.title }}</RouterLink>
    <span v-else>{{ data?.title }}</span>
    <slot />
    <template #actions>
      <slot name="actions" />
    </template>
    <template #extra>
      <slot name="extra" />
    </template>
  </Card>
</template>
