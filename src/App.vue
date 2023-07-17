<template>
  <!-- el-config-provider自定义css命名空间，为了element plus命名不和element ui冲突 -->
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="flex main-container">
      <!-- w py 都是unocss属性 -->
      <el-row w="full" py="4" justify="center">
        <el-col :span="10">
          <div>
            <p>
              <!--使用 router-link 组件进行导航 -->
              <!--通过传递 `to` 来指定链接 -->
              <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
              <router-link to="/">Go to Home</router-link>
              <router-link to="/logs">Go to About</router-link>
            </p>
            <!-- 路由出口 -->
            <!-- 路由匹配到的组件将渲染在这里 -->
            <router-view></router-view>
          </div>

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
