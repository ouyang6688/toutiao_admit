<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!--  面包线    -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
        :data="article.results"
        stripe
        style="width: 100%">
      <el-table-column
          prop="title"
          label="标题">
      </el-table-column>
      <el-table-column
          prop="total_comment_count"
          label="总评论数">
      </el-table-column>
      <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
      </el-table-column>
      <el-table-column
          prop="address"
          label="评论状态">
        <template slot-scope="scope">
          {{ scope.row.comment_status ? '正常' : '关闭' }}
        </template>
      </el-table-column>
      <el-table-column
          prop="address"
          label="操作">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStatusChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <!--  分页  -->
    <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10 , 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="article.total_count"
        background
    >
    </el-pagination>

  </el-card>
</div>
</template>

<script>
import {getArticles,updateCommentStatus} from '@/api/article'

export default {
name: "commentindex",
  components: {},
  props: {},
  data() {
    return {
      article:{},
      pageSize:10
    }
  },
  computed: {},
  watch: {},
  created() {
  this.loadArticles()
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.loadArticles()
    },
    handleCurrentChange(val) {
      this.loadArticles(val)
    },
    loadArticles(page=1){
      getArticles({
        response_type: 'comment',
        page,
        per_page:this.pageSize
      }).then(res=>{
        this.article =res.data.data
      })
    },
    onStatusChange(ev){
      updateCommentStatus(ev.id.toString(),ev.comment_status).then(res=>{
        this.$message({
          message: `${ev.comment_status?'开启文章评论状态' : '关闭文章评论状态'}`,
          type: 'success'
        });
      })
    }

  }
}
</script>

<style scoped lang="less">
.pagination{
  margin-top: 15px;
}
</style>