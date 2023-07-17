<template>
  <el-main>
    <el-row justify="center">
      <el-col :span="10">
        <slot >Main</slot>
      </el-col>
    </el-row>
  </el-main>
</template>
  
<script lang="ts" setup>
import "~/styles/index.scss";

</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.ep-bg-purple {
  background-color: purple;
}
</style>
  