<template>
  <div class="container">
    <x-header class="header" :title="title" :left-options="leftOptions" @on-click-back="close" :right-options="rightOptions">
      <span slot="right" @click.prevent="setDefault">设为默认</span>
    </x-header>
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
        <x-button class="btn" type="primary" @click.native="addData()">修改</x-button>
      </group>
    </div>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>

<script>
  import { Group,XHeader,Toast,Selector,XInput,XButton } from 'vux'
  import {updateInvoice,getInvoices,setDefault} from '@/service/getData'

  export default {
    name: "addressEdit",
    components: {
      XHeader,
      Toast,
      Group,
      Selector,
      XInput,
      XButton
    },
    props:['id'],
    data () {
      return {
        title: "编辑收货地址",
        loading: false,
        rightOptions: {
          showMore: false
        },
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
    mounted(){
      this.getDetail();
    },
    methods: {
      close(){
        this.$emit("close");
      },
      async setDefault(){
        let res = await setDefault(this.id);
        if(res.code === 0){
          this.$vux.toast.show({
            text: '设置成功',
            type: "success"
          });
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

        let res = await updateInvoice(this.form,this.id);
        if(res.code === 0){
          let that = this;
          this.$vux.toast.show({
            text: '修改成功',
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
      async getDetail(){
        let res = await getInvoices({invoice_id:this.id});
        if(res.code === 0){
          let data = res.resultData.items[0];
          for(let p in data){
            if(this.form.hasOwnProperty(p)){
              this.form[p] = data[p];
            }
          }
          this.form.corporation_name = data.corporationName;
          this.form.identity_no = data.identityNo;
          this.form.bank_name = data.bankName;
          this.form.bank_card_no = data.bankCardNo;
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
    },
    watch: {
      id(curVal,oldVal){
        this.getDetail();
      }
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
