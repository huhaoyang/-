<template>
  <div class="container">
    <x-header class="header" :title="title"></x-header>
    <div class="board search">
      <p>
        <label class="label">关键字：</label>
        <input class="input" type="text" v-model="form.keyword" placeholder="请输入商品名称、品牌、分类">
        <router-link :to="{ name: 'merchants', query: { keyword:form.keyword,supplier:form.supplier }}">
          <span class="link">搜索</span>
        </router-link>
      </p>
      <p>
        <label class="label">供应商：</label>
        <select class="input" v-model="form.supplier">
          <option v-for="(item,index) in supplierList" :key="index" :value="item.key">
            {{item.value}}
          </option>
        </select>
      </p>
    </div>
    <div class="board hot-search">
      <p class="title">热搜：</p>
      <ul>
        <li v-for="(item,index) in hotSearch" :key="index">
          <router-link :to="{ name: 'merchants', query: { keyword:item}}">{{item}}</router-link>
        </li>
      </ul>
    </div>
    <div class="board search-history">
      <p class="title">搜索历史：</p>
      <ul>
        <li v-for="(item,index) in history" :key="index">
          <router-link :to="{ name: 'merchants', query: { keyword:item}}">{{item}}</router-link>
        </li>
      </ul>
    </div>
    <router-link :to="{name:'cart'}">
      <div class="cart">
        <img src="~@/images/cart.png" />
      </div>
    </router-link>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>

<script>
  import { Selector, Group,XHeader,XInput,XButton,Toast,Badge} from 'vux'
  import {getSuppliers,keywords} from '@/service/getData'
  export default {
    name: 'condition',
    components: {
      XHeader,
      Selector,
      Toast,
      Group,
      XInput,
      XButton
    },
    data () {
      return {
        title: "商品搜索",
        params: {
          page: 1,
          rows: 10
        },
        form: {
          keyword: "",
          supplier: "0"
        },
        supplierList: [
          {key: '0', value: '全部'}
        ],
        hotSearch: [

        ],
        history: [

        ],
        error: {
          code: false,
          message: ""
        }, //错误信息
      }
    },
    methods: {
      async suppliersList(){
        let res = await getSuppliers();
        if(res.code === 0){
        	let supplierList = this.supplierList.slice(0);
            res.resultData.items.map(function(item){
              supplierList.push({key: item.code,value: item.name})
            });
          this.supplierList = supplierList;
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
      async initList(){
        let res = await keywords(this.params);
        if(res.code === 0){
          this.hotSearch = res.resultData.hots;
          this.history = res.resultData.items;
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
    mounted(){
      this.suppliersList();
      this.initList();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "~@/styles/layout.scss";

  * {
    box-sizing: border-box;
  }

  .container {
    width: 100%;
    min-height: 100vh;
    background: #EFEFF4;
    padding-bottom: 20px;

    .board {
      width: 100%;
      background: #ffffff;
      margin-bottom: 5%;
      .title {
        padding: 5px 20px;
        color: #000;
        font-size: 14px;
        font-weight: bolder;
        border-bottom: 1px dotted #c8c7cc;
      }

      ul {
        padding: 5px 20px;
      }
    }

    .search {
      padding: 10px 20px;

      p {
        line-height: 40px;
        height:40px;
        .label {
          display: inline-block;
          width:20%;
          font-size: 0.8rem;
        }

        .input {
          width:60%;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
        }

        .link {
          display: inline-block;
          color: #007aff;
          float: right;
        }
      }
    }

    .hot-search {
      ul {
        list-style: none;
        line-height: 40px;

        li {
          display: inline-block;
          margin-right: 20px;
          height:30px;
          line-height: 30px;
          font-size: 14px;
          color: #777;
          padding: 0 10px;
          background: #eaebed;

          a {
            color: #777;

            &:hover {
              color: #777;
            }
          }
        }
      }
    }

    .search-history {
      ul {
        list-style: none;
        line-height: 40px;
        li {
          border-color: #c8c7cc;
          border-style: dotted;
          border-width: 0px 0 1px 0;
          color: #777;
          font-size: 1rem;
          line-height: 30px;

          a {
            color: #777;

            &:hover {
              color: #777;
            }
          }
        }
      }
    }
    .cart {
      position: fixed;
      left: 5%;
      bottom: 0;

      img {
        width:60px;
        height:60px;
      }
    }
  }
</style>
