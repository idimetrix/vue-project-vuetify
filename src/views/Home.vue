<template>
  <div>
    <ComponentExample1 />
    <ComponentExample2 />
    <ComponentExample3 />
  </div>
</template>

<script>
import ComponentExample1 from '@/components/ComponentExample1'
import ComponentExample2 from '@/components/ComponentExample2'
import ComponentExample3 from '@/components/ComponentExample3'

export default {
  name: 'Home',
  components: {
    ComponentExample1,
    ComponentExample2,
    ComponentExample3
  }
}
</script>
