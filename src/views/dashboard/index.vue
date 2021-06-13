<template>
  <div>
    <DependsTable />
  </div>
</template>
<script lang="ts">

import { defineComponent } from 'vue'
import DependsTable from '@/views/dashboard/DependsTable.vue'
export default defineComponent({
  name: 'Dashboard',
  components: { DependsTable }
})
</script>
