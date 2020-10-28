<template>
  <div class="article-container">

    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelID" placeholder="请选择频道">
            <el-option :label="channel.name" :value="channel.id" v-for="(channel,index) in channels" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
              v-model="rangeDate"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="loadArticles(1)" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-search"></i>
        <span>根据筛选条件共查询到 {{articledata.total_count}} 条结果：</span>
      </div>
      <!-- 数据列表 -->
      <el-table
          :data="articledata.results"
          stripe
          size="small"
          style="width: 100%"
          v-loading="loading"
      >

        <el-table-column
            label="封面">
          <template slot-scope="scope">
            <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" alt="" style="width: 100px;background-size: cover;height: 60px">
            <img v-else src="pic_bg.png" alt="" style="width: 100px;background-size: cover;height: 60px">
          </template>
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="pubdate"
            label="发布时间">
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle size="small"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="small" @click="onDeleteArticle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--    分页-->
      <el-pagination
          class="list-card"
          background
          @current-change="onCurrentChange"
          :page-size="pageSize"
          :disabled="loading"
          :current-page.sync="page"
          layout="prev, pager, next"
          :total="articledata.total_count">
      </el-pagination>
    </el-card>

</div>
</template>

<script>
import {getArticles ,deleteArticle} from '@/api/article'
import getArticleChannels from '@/api/channels'

export default {
name: "articleindex",
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articledata:[],
      pageSize:20,
      status:null,
      channels:[],
      channelID:null,
      rangeDate:[],
      loading:true,
      page:1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles(1)
    this.loadChannels()
  },
  mounted () {},
  methods: {
    loadArticles(s){
      getArticles({
        page:s,
        per_page:this.pageSize,
        status:this.status,
        channel_id:this.channelID,
        begin_pubdate:this.rangeDate?this.rangeDate[0]:null,
        end_pubdate:this.rangeDate?this.rangeDate[1]:null
      }).then(res=>{
        this.articledata=res.data.data
        this.loading=false
        // console.log(res)
      })
    },

    onCurrentChange(page){
      this.loadArticles(page)
    },

    loadChannels(){
      getArticleChannels().then(res=>{
        this.channels=res.data.data.channels
      })
    },

    onDeleteArticle(){
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认执行这里
        deleteArticle(articleId.toString()).then(res => {
          this.loadArticles(this.page)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  }
}
</script>

<style scoped lang="less">
.filter-card{
  margin-bottom: 10px;
}
.list-card{
  margin-top: 10px;
  padding-left: 30%;
}
</style>