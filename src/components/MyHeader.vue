<template>
  <div class="header">
    <p>
      <el-icon style="vertical-align: middle;" color="blueviolet" :size="35">
        <Comment />
      </el-icon>
      会议预约
    </p>
    <div class="user">
      <span>
        你好！用户
      </span>
      <el-avatar style="vertical-align: middle;" :size="40"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
    </div>
  </div>
</template>

<script setup>


</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 50px;
  width: 100%;
  background-color: rgb(255, 255, 255);

  p {
    position: absolute;
    left: 30px;
    top: 10px;
  }

  .user {
    position: absolute;
    right: 40px;
    top: 7px;

    span {
      margin-right: 15px;
    }
  }
}</style>