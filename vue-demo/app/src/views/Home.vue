<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/1.png" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间：<span>2023-7-13</span></p>
          <p>上次登陆地点：<span>杭州</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 457px">
        <el-table :data="tableData" style="width: 100%">
          <!-- <el-table-column prop="name" label="型号">
          </el-table-column>
          <el-table-column prop="todayBuy" label="今日购买">
          </el-table-column>
          <el-table-column prop="monthBuy" label="本月购买">
          </el-table-column>
          <el-table-column prop="totalBuy" label="总购买">
          </el-table-column> -->
          <el-table-column
            v-for="(val, key) in tableLabel"
            :prop="key"
            :label="val"
            :key="key"
          />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <el-card style="height: 280px">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <!-- 柱状图 -->
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <!-- 饼图 -->
          <div ref="echarts3" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  data() {
    return {
      tableData: [
        {
          name: "oppo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "vivo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "apple",
          todayBuy: 100,
          monthBuy: 200,
          totalBuy: 500,
        },
        {
          name: "xiaomi",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "samsung",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "meizu",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      tableLabel: {
        name: "型号",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 111,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 111,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      // console.log({tableData})
      this.tableData = tableData;
      //折线图
      const echarts1 = echarts.init(this.$refs.echarts1);

      let echarts1Option = {};
      const { orderData } = data.data;
      // console.log({orderData})
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };
      echarts1Option.xAxis = {
        data : orderData.date,
      };
      echarts1Option.yAxis = {};
      echarts1Option.legend = xAxisData;
      echarts1Option.series = [];
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      // console.log(echarts1Option)
      echarts1.setOption(echarts1Option);

      // 柱状图
      const { UserData } = data.data;
      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Option = {
        legend: {
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: UserData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: '新增用户',
            data: UserData.map(item => item.new),
            type: 'bar'
          },
          {
            name:'活跃用户',
            data: UserData.map(item => item.active),
            type: 'bar'
          }
        ],
      };
      echarts2.setOption(echarts2Option);

      //饼图
      const { VideoData } = data.data;
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Option = {
        tooltip: {
          trigger: "item",
        },
        color:[
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf"
        ],
        series:[{
          data: VideoData,
          type: 'pie'
        }
        ]
      };
      echarts3.setOption(echarts3Option);

    });
  },
};
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    text-align: center;
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: #ffffff;
    text-align: center;
    line-height: 80px;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      line-height: 30px;
      height: 30px;
      font-size: 30px;
      margin-bottom: 10px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>