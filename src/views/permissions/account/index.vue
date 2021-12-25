<template>
  <div class="account"></div>
</template>
<script>
import { findUsersByPage } from "@/api/permissions/account";
// import { getUserInfo } from "@/utils/myAuth";
export default {
  data() {
    return {
      start: 1,
      limit: 10,
      userList: [],
      total: 0,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      findUsersByPage(this.start, this.limit).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style lang="scss">
</style>
