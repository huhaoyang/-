<template>
  <div class="container">
    <x-header class="header" :title="title" :left-options="leftOptions" @on-click-back="close"></x-header>
    <div class="block">
      <group label-width="7em">
        <x-input v-model="form.corporation_name">
          <p slot="label" style="width: 7em;">
            <span style="color:red">*</span>
            公司名称
          </p>
        </x-input>
      </group>
      <group label-width="7em">
        <x-input v-model="form.identity_no">
          <p slot="label" style="width: 7em;">
            <span style="color:red">*</span>
            纳税人识别号
          </p>
        </x-input>
      </group>
      <group label-width="7em">
        <x-input title="注册地址" v-model="form.address"></x-input>
      </group>
      <group label-width="7em">
        <x-input title="注册电话" v-model="form.phone"></x-input>
      </group>
      <group label-width="7em">
        <x-input title="开户银行" v-model="form.bank_name"></x-input>
      </group>
      <group label-width="7em">
        <x-input title="银行账号" v-model="form.bank_card_no"></x-input>
      </group>
      <group>
        <x-button class="btn" type="primary" @click.native="addData()">添加</x-button>
      </group>
    </div>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>

<script>
  import { Group,XHeader,Toast,Selector,XInput,XButton } from 'vux'
  import {addInvoice} from '@/service/getData'

  export default {
    name: "invoiceAdd",
    components: {
      XHeader,
      Toast,
      Group,
      Selector,
      XInput,
      XButton
    },
    data () {
      return {
        title: "添加开票信息",
        loading: false,
        form: {
          corporation_name: "",
          identity_no: "",
          address: "",
          phone: "",
          bank_name: "",
          bank_card_no: "",
        },
        leftOptions: {
          preventGoBack: true
        },
        error: {
          code: false,
          message: ""
        }, //错误信息
      }
    },
    methods: {
      close(){
        this.$emit("close");
      },
      async addData(){
        if(this.form.corporation_name===""){
          this.error.code = true;
          this.error.message = "请填写公司名称";

          return false;
        }
        if(this.form.identity_no===""){
          this.error.code = true;
          this.error.message = "请填写纳税人识别号";

          return false;
        }

        let res = await addInvoice(this.form);
        if(res.code === 0){
          let that = this;
          this.$vux.toast.show({
            text: '添加成功',
            type: "success"
          });
          setTimeout(function(){
            that.close();
          },1000);
        }else if(res.code===90002){
          this.error.code = true;
          this.error.message = res.message;
          this.$router.push({
            name: "login",
            query: { redirect: this.$route.path }
          })
        }else{
          this.error.code = true;
          this.error.message = res.message;
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    min-height: 100%;
    background: #EFEFF4;
    padding-bottom: 20px;

    .block {
      background: #ffffff;
      padding: 20px;

      .line {
        width:100%;
        position: relative;
        padding: 1rem 0;
        line-height: 1.5rem;
        font-size: 1rem;
        border-bottom: 1px dotted #c8c7cc;
      }
      .btn {
        background: #007aff;
      }
    }
  }

</style>
