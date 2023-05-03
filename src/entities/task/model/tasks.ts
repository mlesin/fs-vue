import { normalize, schema } from "normalizr";
// import type { ActionContext } from "vuex";

import { typicodeApi } from "@/shared/api";
import type { Task } from "@/shared/api";

export const NAMESPACE = "tasks";

export type QueryConfig = {
  completed?: boolean;
  userId?: number;
};

export const taskSchema = new schema.Entity<Task>(NAMESPACE);
export const normalizeTask = (data: Task) =>
  normalize<Task, { tasks: { [key: number]: Task } }, number>(data, taskSchema);
export const normalizeTasks = (data: Task[]) =>
  normalize<Task, { tasks: { [key: number]: Task } }, number>(data, [
    taskSchema,
  ]);

// namespaced is cool thing for large projects
// furthermore we hide this logic from Public API
// and exporting ready-to-use actions/mutations/etc..
// that don't depend on namespacing
// our rest code should work both with namespaced true or false
const IS_NAMESPACED = true; // so if we would turn it to false - everything will work the same :)

export interface TasksState {
  data: { [key: number]: Task };
  isListLoading: boolean;
  isDetailsLoading: boolean;
  queryConfig: QueryConfig;
}

export const initialState: Record<number, Task> = {};

export const module = {
  namespaced: IS_NAMESPACED,
  state: {
    data: initialState,
    isListLoading: false,
    isDetailsLoading: false,
    queryConfig: {},
  },
  getters: {
    isTasksListEmpty: (state: TasksState) =>
      Object.values(state.data).length === 0,
    filteredTasks: (state: TasksState) =>
      Object.values(state.data).filter(
        (task) =>
          state.queryConfig.completed === undefined ||
          task?.completed === state.queryConfig.completed
      ),
    useTask: (state: TasksState) => (taskId: any) => state.data[taskId],
  },
  mutations: {
    setTasksList: (state: TasksState, response: any) => {
      // temprorary filtered because my laptop has 6gb...
      state.data = normalizeTasks(response?.data).entities[NAMESPACE];
    },
    setListLoading: (state: TasksState, isLoading: boolean) => {
      state.isListLoading = isLoading;
    },
    setDetailsLoading: (state: TasksState, isLoading: boolean) => {
      state.isDetailsLoading = isLoading;
    },
    addTaskToList: (state: TasksState, response: any) => {
      state.data = {
        ...state.data,
        ...normalizeTask(response?.data).entities[NAMESPACE],
      };
    },
    toggleTask: (state: TasksState, taskId: number) => {
      const task = state.data[taskId];
      if (!task) return;
      const newData = {
        ...state.data,
        [taskId]: { ...task, completed: !task?.completed },
      };
      state.data = newData;
    },
    setQueryConfig: (state: TasksState, payload: QueryConfig) => {
      state.queryConfig = payload;
    },
  },
  actions: {
    getTasksListAsync: async (
      { commit }: any,
      params: typicodeApi.tasks.GetTasksListParams
    ) => {
      commit("setListLoading", true);
      try {
        commit("setTasksList", await typicodeApi.tasks.getTasksList(params));
      } finally {
        commit("setListLoading", false);
      }
    },
    getTaskByIdAsync: async (
      { commit }: any,
      params: typicodeApi.tasks.GetTaskByIdParams
    ) => {
      commit("setDetailsLoading", true);
      try {
        commit("addTaskToList", await typicodeApi.tasks.getTaskById(params));
      } finally {
        commit("setDetailsLoading", false);
      }
    },
  },
};

// Remember? our rest code should work both with namespaced true or false
const withPrefix = (name: string) =>
  IS_NAMESPACED ? `${NAMESPACE}/${name}` : name;

export const actions = {
  getTasksListAsync: withPrefix("getTasksListAsync"),
  getTaskByIdAsync: withPrefix("getTaskByIdAsync"),
};

export const mutations = {
  toggleTask: withPrefix("toggleTask"),
  setQueryConfig: withPrefix("setQueryConfig"),
};

export const getters = {
  isTasksListEmpty: withPrefix("isTasksListEmpty"),
  filteredTasks: withPrefix("filteredTasks"),
  useTask: withPrefix("useTask"),
};
