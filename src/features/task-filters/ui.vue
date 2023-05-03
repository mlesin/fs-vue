<script setup lang="ts">
import { RadioButton, RadioGroup, type RadioChangeEvent } from "ant-design-vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

import { taskModel } from "@/entities/task";

import {
  filtersList,
  getFilterById,
  DEFAULT_FILTER,
  type FilterIndex,
} from "./config";

const store = useStore();

const filtersGroupModel = ref<number>(DEFAULT_FILTER);

const isListLoading = computed(
  () => store.state[taskModel.NAMESPACE].isListLoading
);
const onFilterClick = (e: RadioChangeEvent) => {
  const id = e.target.value as FilterIndex;
  store.commit(taskModel.mutations.setQueryConfig, getFilterById(id).config);
};
</script>

<template>
  <RadioGroup
    buttonStyle="solid"
    @change="onFilterClick"
    v-model:value="filtersGroupModel"
  >
    <template v-for="{ title, id } in filtersList" :key="id">
      <RadioButton :value="id" :disabled="isListLoading">
        {{ title }}
      </RadioButton>
    </template>
  </RadioGroup>
</template>
