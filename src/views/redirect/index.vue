
<script lang="ts">
import { defineComponent, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Redirect',
  props: {
    path: {

    }
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { query, params } = route

    router.replace({
      path: '/' + params.path,
      query: query
    })
    return () => {
      return h('template')
    }
  }
})
</script>
