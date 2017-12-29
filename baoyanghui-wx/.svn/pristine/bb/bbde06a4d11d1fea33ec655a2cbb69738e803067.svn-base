<template>
  <div class="container">
    <x-header class="header" :title="title" :left-options="leftOptions" @on-click-back="close"></x-header>
    <div class="block">
      <div class="line" v-for="(item,index) in invoices" :key="index" @click="changeInvoice(item)">
        <p>
          {{item.corporationName}}
          <span v-if="item.defaultFlg" class="def-flag">默认</span>
        </p>
        <p>{{item.identityNo}}</p>
        <p>{{item.address}}</p>
        <p>{{item.phone}}</p>
        <p>{{item.bankName}}</p>
        <p>{{item.bankCardNo}}</p>
        <img class="icon edit" @click.stop.prevent="edit(item.id)" src="~@/images/edit.png">
      </div>
    </div>
    <group class="add-btn">
      <x-button class="btn" type="primary" @click.native="addShow=true">
        <img class="icon" src="~@/images/add.png"/>
        新建开票信息
      </x-button>
    </group>
    <popup v-model="addShow" position="right" width="100%">
      <invoice-add v-on:close="closeAdd"></invoice-add>
    </popup>
    <popup v-model="editShow" position="right" width="100%">
      <invoice-edit v-if="invoiceId!=0" :id="invoiceId" v-on:close="closeEdit"></invoice-edit>
    </popup>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>

<script>
  import { XHeader,Toast,TransferDom,Popup,Group,XButton } from 'vux'
  import invoiceAdd from '@/pages/invoice/add'
  import invoiceEdit from '@/pages/invoice/edit'
  import {getInvoices} from '@/service/getData'

  export default {
    name: "invoice",
    components: {
      XHeader,
      Toast,
      TransferDom,
      Popup,
      invoiceAdd,
      invoiceEdit,
      Group,
      XButton
    },
    data () {
      return {
        title: "选择开票信息",
        loading: false,
        addShow: false,
        editShow: false,
        invoiceId: 0,
        leftOptions: {
          preventGoBack: true
        },
        invoices: [],
        error: {
          code: false,
          message: ""
        }, //错误信息
      }
    },
    mounted(){
      this.initData();
    },
    methods: {
      changeInvoice(item){
        this.$emit("change",item);
      },
      close(){
        this.$emit("close");
      },
      closeAdd(){
        this.addShow = false;
        this.initData();
      },
      closeEdit(){
        this.editShow = false;
        this.initData();
      },
      edit(id){
        this.invoiceId = id;
        this.editShow = true;
      },
      async initData(){

        let res = await getInvoices();
        if(res.code === 0){
          this.invoices = res.resultData.items;
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
  * {
    box-sizing: border-box;
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #EFEFF4;
    padding-bottom: 20px;

    .add-btn {
      margin: 5%;
      width:90%;

      .btn {
        background: #007aff;
        border-radius: 0;

        .icon {
          height: 20px;
          width:auto;
          vertical-align: middle;
        }
      }
    }

    .block {
      background: #ffffff;
      padding: 20px 0;

      .line {
        width:100%;
        position: relative;
        padding: 1rem 20px;
        line-height: 1.5rem;
        font-size: 1rem;
        border-bottom: 1px dotted #c8c7cc;

        p:first-child {
          font-size: 1.2rem;
        }

        .def-flag {
          color: orangered;
        }

        .icon {
          position: absolute;
          height: 30px;
          width:auto;
          top:35%;
          right:5%;
        }

        .add {
          height: 60%;
          top:20%;
        }
      }
    }
  }

</style>
