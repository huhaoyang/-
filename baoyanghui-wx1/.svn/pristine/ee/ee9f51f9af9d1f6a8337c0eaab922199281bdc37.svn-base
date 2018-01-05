<template>
  <div class="vin-container">
    <p class="title">VIN码确认车型</p>
    <div v-if="status===1" class="board">
      <input class="vin" v-model="vin" placeholder="请输入车辆行驶证上的17位VIN码">
      <x-button class="btn" type="primary" @click.native="submit()">搜索</x-button>
      <p class="tips">哪里能找到vin码</p>
      <img src="~@/images/vin.png">
    </div>
    <div class="board" v-else >
      <p>
        VIN码：{{vin}}
        <x-button class="btn" type="primary" text="重新输入" @click.native="status=1"></x-button>
      </p>
      <p>可选车型</p>
      <x-button v-for="(item,index) in list" :key="index" class="btn" type="primary" :text="item.name" @click.native="choose(item)"></x-button>
    </div>
  </div>
</template>

<script>
  import {vinCode} from '@/service/getData'
  import {XButton} from 'vux'
  export default {
    name: 'vin',
    components: {
      XButton
    },
    props: ['change'],
    data () {
      return {
        status: 1,
        vin: "",
        list: []
      }
    },
    methods: {
      choose(val){
        this.status = 1;
        this.vin = "";
        this.$emit('change',val);
      },
    	async submit(){
        if(this.vin===""){
          this.$vux.toast.show({
            text: 'VIN码不能为空',
            type: "warn"
          })
          return false;
        }

        let res = await vinCode(this.vin);
        if(res.code === 0){
        	let _this = this;
          _this.list = [];
          res.resultData.forEach(function(item){
            _this.list.push({
              name: item.brand+item.series+item.model+item.salesName,
              value: item.modelId
            });
          });
          this.status = 0;
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

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .vin-container {
    .title {
      height: 40px;
      font-size: 24px;
    }

    .board {
      padding: 15px 0;
      .vin,.btn {
        width: 80%;
        height: 30px;
        line-height: 30px;
        margin: 10px auto;
      }

      .btn {
        background: #007aff;
      }

      .tips {
        margin-top: 30%;
      }

      img {
        width:100%;
        height:auto;
        margin: 10px 0
      }
    }

  }
</style>
