<script setup lang="ts">
import { toRefs, type PropType } from "vue";
import { RouterLink } from "vue-router";
import { Row } from "ant-design-vue";
import type { Task } from "@/shared/api";
import styles from "./styles.module.scss";

const props = defineProps({
  data: { type: Object as PropType<Task>, required: true },
  titleHref: String,
});

const { data, titleHref } = toRefs(props);
</script>

<template>
  <Row :class="[styles.root, { completed: data?.completed }]">
    <div :class="styles.marginBefore">
      <slot name="before" />
    </div>
    <RouterLink v-if="titleHref" :to="titleHref">{{ data?.title }}</RouterLink>
    <span v-else>{{ data?.title }}</span>
  </Row>
</template>
