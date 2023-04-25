<template>
    <div class="footer">
        Copyright © 2020-{{year}} {{$t('10211')}}
    </div>
</template>

<script setup lang="ts">
    import {ref} from "vue";
    import m from 'moment';

    const year = ref(m().format('YYYY'))

</script>

<style scoped lang="scss">
    .footer {
        width: 100%;
        padding: 10px;
        background-color: $bg;
        border-top: 1px solid $bd;
        text-align: center;
    }
</style>
