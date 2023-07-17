<template>
  <!-- el-config-provider自定义css命名空间，为了element plus命名不和element ui冲突 -->
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="flex main-container">
      <el-row w="full" py="4" justify="center">
        <el-col :span="10">
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
</style>
