<template>
  <div class="container">
    <x-header class="header" :title="title"></x-header>
    <div v-if="type==1" class="block">
      <p>运单号：{{expressNo}}</p>
      <p>国内承运人：{{expressComName}}</p>
    </div>
    <div v-else class="block">
      <timeline v-if="tracks.length>0">
        <timeline-item v-for="(item,index) in tracks" :key="index">
          <p class="name">{{item.content}}</p>
          <p class="date">{{item.msgTime}}</p>
        </timeline-item>
      </timeline>
    </div>
    <toast v-model="error.code" type="warn">{{error.message}}</toast>
  </div>
</template>

<script>
  import { XHeader,Toast,Timeline, TimelineItem } from 'vux'
  import list from '@/components/orders/list'
  import {getTrack,orderApiDetail} from '@/service/getData'

  export default {
    components: {
      XHeader,
      list,
      Toast,
      Timeline,
      TimelineItem
    },
    data () {
      return {
        title: "物流信息",
        tracks: [

        ],
        expressNo:"",
        expressComName:"",
        params: {
          page: 1,
          rows: 5
        },
        type: "",
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
      async initData(){
        let id = this.$route.params.id;
        this.type = this.$route.query.type;

        if(this.type){
          let res = await orderApiDetail(id);
          if(res.code === 0){
            this.expressNo = res.resultData.expressNo;
            this.expressComName = res.resultData.expressComName;
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
        }else{
          let res = await getTrack(id);
          if(res.code === 0){
            this.tracks = res.resultData.orderTrack;
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
      },
    }
  }
</script>

<style lang="scss">
  @import "~@/styles/layout.scss";
  .container {
    width: 100%;
    min-height: 100%;
    background: #EFEFF4;
    padding-bottom: 20px;

    .block {
      background: #ffffff;
      padding: 20px 10px;
      .name{
        font-size: 0.7rem;
        line-height: 1.4rem;
      }

      .date {
        color: #c8c7cc;
        font-size: 0.4rem;
        line-height: 0.8rem;
      }
    }
  }
</style>
