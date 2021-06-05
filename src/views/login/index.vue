<template>
  <div class="particles-wrap">
    <Particles id="login-particles"
               :options="particleOption"
    >
    </Particles>
  </div>
  <div class="login">
    <div class="login-card">
      <h3 class="login-title">管理后台账户登录</h3>
      <LoginForm/>
      <div class="more-login">
        <div class="type">
          <i class="iconfont icon-weixin"></i>
        </div>
        <div class="type">
          <i class="iconfont icon-qq"></i>
        </div>
        <div class="type">
          <i class="iconfont icon-weibo"></i>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import LoginForm from '@/views/login/LoginForm.vue'

const min = 1
const max = 7
const randomNum = Math.floor(Math.random() * (max - min)) + min
const particleOption = {
  background: {
    color: {
      value: '#0d47a1'
    },
    image: `url(${require('../../assets/images/login-bg' +
      randomNum + '.jpeg')})`,
    position: '50% 50%',
    repeat: 'no-repeat',

    size: 'cover',
    opacity: 1

  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: {
        enable: true,
        mode: 'remove'
      },
      onHover: {
        enable: true,
        mode: 'grab'
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#ffffff'
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'circle'
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
}

export default defineComponent({
  name: 'Login',
  components: {
    LoginForm
  },
  setup () {
    const comLoginStyle = computed(() => {
      const min = 1
      const max = 7
      const randomNum = Math.floor(Math.random() * (max - min)) + min
      return {
        backgroundImage: `url(${require('../../assets/images/login-bg' +
          randomNum + '.jpeg')})`
      }
    })
    return {
      particleOption
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.particles-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &-logo {
    width: 32px;
  }

  &-title {
    color: #fff;
  }

  &-card {
    position: relative;
    z-index: 998;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border-radius: 4px;
  }

  .more-login {
    position: relative;
    z-index: 998;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 300px;
    .type {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, .4);
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 20px;
        color: #fff;
      }
    }
  }
}

</style>

<style lang="scss">
#login-particles {
  width: 100%;
  height: 100%;
}
</style>
