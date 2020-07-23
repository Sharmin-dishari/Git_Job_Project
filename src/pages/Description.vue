<template>
    <q-page padding>
       <div v-html="description.description"></div>
    </q-page>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        description:{
            type:Object
        }
    }
}
</script>
<style>
p {
    font-weight: bold;
}
</style>