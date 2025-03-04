<template>
  <router-view></router-view>
</template>

<script>
import Home from '@/pages/Home.vue'
import axios from 'axios';

// 创建 axios 实例并配置
const apiClient = axios.create({
    baseURL: 'https://api.whoiam.liangyongqi.top/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default {
  name: 'App',
  components: {
    Home
  },
  data() {
    return {
      token: null,
      userId: null,
      userName: null,
      isAuthenticated: false,
    }
  },
  // 页面加载时执行
  async created() {
      this.token = localStorage.getItem('token');
      if (!this.token) {
          console.log('没有token');
          await this.$router.push('/AppLogin/admin');
          return;
      }
      
      console.log('有token');
      const data = {
          appId: 'admin',
          token: this.token
      };
      
      try {
          const response = await apiClient.post('/AppLogin/TokenAuth', data);
          const result = response.data;
          if (result.code === 'success') {
              this.userId = result.userId;
              this.isAuthenticated = true;
              console.log('用户信息', result);
          } else {
              console.log('Token验证失败');
              localStorage.removeItem('token');  // 清除无效的 token
              await this.$router.push('/AppLogin/admin');
          }
      } catch (error) {
          console.error('Token验证失败:', error);
          localStorage.removeItem('token');  // 清除无效的 token
          await this.$router.push('/AppLogin/admin');
      }
  },
  methods: {
    // 注销
    logout() {
        sessionStorage.removeItem('authToken');
        // 尝试跳转到登录页面（参数：appId=admin）
    },
    // 切换菜单
    toggleMenu() {
        this.isMenuVisible = !this.isMenuVisible;
    }
  }
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
}
</style>
