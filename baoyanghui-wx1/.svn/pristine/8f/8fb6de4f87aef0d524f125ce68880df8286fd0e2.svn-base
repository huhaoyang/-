<template>
  <div class="login-area">
    <x-header class="header" :left-options="leftOptions" :title="title"></x-header>
    <group class="form" >
      <x-input v-model="form.name" placeholder="输入账号">
        <p slot="label" class="label">账号</p>
      </x-input>
      <x-input v-model="form.password" placeholder="输入账户密码" type="password">
        <p slot="label" class="label">密码</p>
      </x-input>
    </group>
    <x-button class="btn" :text="submitText" :disabled="submitDisable" @click.native="submitEvent" type="primary"></x-button>
  </div>
</template>

<script>
  import {XHeader,Toast,XButton,XInput,Group} from 'vux'
  import {loginApi} from '@/service/getData'
  import {setStore,getStore} from '@/config/mUtils'
  export default {
    name: 'login',
    components: {
      XHeader,
      Toast,
      XButton,
      XInput,
      Group
    },
    methods: {
      async submitEvent(){
        if(this.form.name ===""){
          this.$vux.toast.show({
            text: '用户名不能为空',
            type: "warn"
          })
          return false;
        }

        if(this.form.password ===""){
          this.$vux.toast.show({
            text: '密码不能为空',
            type: "warn"
          })

          return false;
        }

        this.submitText = '处理中';
        this.submitDisable = true;
        let req = await loginApi(this.form);

        if(req.code != 0){
          this.submitText = '登录';
          this.submitDisable = false;
          this.$vux.toast.show({
            text: req.message,
            type: "cancel"
          })
        }else{
          let path = (this.$route.query.redirect && this.$route.query.redirect!="/login") ? this.$route.query.redirect : "/order"
          setStore('merchantId',req.resultData.merchantId)
          setStore('usercode',req.resultData.usercode)

          this.$vux.toast.show({
            text: "登录成功",
            type: "success"
          })

          this.$router.push({path: path});
        }

      }
    },
    data() {
      return {
        title: "登录",
        submitText: "登录",
        submitDisable: false,
        leftOptions: {
          showBack:false
        },
        form: {
          name: "",
          password: "",
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "~@/styles/layout.scss";
  .weui-cell:before {
    width:92%;
    left:4%;
  }

  .login-area {
    width:100%;
    height:auto;

    .label {
      width: 32vw;
      text-align: left;
      padding-left: 20%;
    }

    .btn {
      width:80%;
      margin: 20% 10%;
      background: #007aff;
      border-radius: 20px;
    }

    .mr-b-10 {
      margin-bottom: 10%;
    }
  }
  .login-area .btn{
    background-color: #7058a4;
  }



</style>
