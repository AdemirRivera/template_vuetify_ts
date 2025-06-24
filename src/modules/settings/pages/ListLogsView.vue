<template>
  <v-container fluid>
    <!-- title -->
    <div class="d-flex justify-center justify-md-start">
      <span class="text-h4 text-sm-h3 text-primary"> Logs </span>
    </div>

    <!-- table -->
    <v-data-table-server
      ref="table"
      v-model:items-per-page="paramsLogs.perPage"
      :headers="headers"
      :items="logsQuery.data.value?.data || []"
      :items-length="paramsLogs.total"
    >
    </v-data-table-server>
  </v-container>
</template>

<script setup lang="ts">
import settingsServices from '../settings.services'

const headers = [
  { title: 'Descripción', key: 'description', sortable: false },
  { title: 'Fecha', key: 'date', sortable: false }
]

const paramsLogs = reactive({
  page: 1,
  perPage: 10,
  total: 0
})

const queryKey = computed(() => [
  'list_logs',
  { page: paramsLogs.page, per_page: paramsLogs.perPage }
])

const logsQuery = useQuery({
  queryKey,
  queryFn: () =>
    settingsServices.getListLogs({
      page: paramsLogs.page,
      per_page: paramsLogs.perPage
    })
})
</script>
