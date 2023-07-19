<template>
  <!-- el-config-provider自定义css命名空间，为了element plus命名不和element ui冲突 -->
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="flex main-container">
      <!--w py 都是unocss-->
      <el-row w="full" py="4" justify="center">
        <el-col :span="9">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
    <el-backtop :right="100" :bottom="100" />
  </el-config-provider>
</template>

<style>
#app {
  text-align: left;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
</style>
