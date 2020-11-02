<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="radio">
        <el-radio-group v-model="collect" size="medium" @change="onCollectimage">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" round @click="dialogTableVisible=true">上传图片</el-button>
      </div>

      <el-row :gutter="10">
        <el-col :xs="12" :sm="6" :md="6" :lg="4" v-for="(img,index) in images.results" :key="index" class="imgtp">
          <el-image
            style="height: 200px"
            :src="img.url"
            fit="fill">
          </el-image>
          <div class="imgsc">
            <i class="el-icon-star-on" v-if="img.is_collected" style="font-size: 30px;" @click="onStar(img,false)"></i>
            <i class="el-icon-star-off" v-else @click="onStar(img,true)"></i>
            <i class="el-icon-delete" @click="onDeleteImg(img.id)"></i>
          </div>
        </el-col>
      </el-row>
      <!--    分页    -->
      <el-pagination
          background
          layout="prev, pager, next"
          :total="images.total_count"
          :page-size="12"
          :current-page.sync="dqpage"
          @current-change="onPageChange"
          style="margin-top: 10px;"
      >
      </el-pagination>

    </el-card>
    <!--  上传素材  -->
    <el-dialog title="上传素材" :visible.sync="dialogTableVisible" :append-to-body="true">
      <el-upload
          class="upload-demo"
          drag
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          multiple
          :headers="headers"
          name="image"
          :on-success="uploadSuccess"
          :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import {getImages,collectImage,deleteImage} from '@/api/images'

//获取用户信息
const user = JSON.parse(window.localStorage.getItem('user'))

export default {
name: "imageindex",
  components: {},
  props: {},
  data() {
    return {
      collect:'false',
      images:{},
      dialogTableVisible:false,
      headers:{
        Authorization: `Bearer ${user.token}`
      },
      dqpage:1
    }
  },
  computed: {},
  watch: {},
  created() {
   this.loadimage(1,false)
  },
  mounted() {},
  methods: {
    loadimage(page,collect){
      this.dqpage=page
      getImages({
        collect:collect,
        page:page,
        per_page:12
      }).then((res)=>{
        this.images = res.data.data
      })
    },
    onCollectimage(value){
      // console.log(value)
      this.loadimage(1,value)
    },
    uploadSuccess(){
      this.dialogTableVisible=false
      this.loadimage(1,false)
    },
    onPageChange(page){
      this.loadimage(page,this.collect)
    },
    onStar(img,ev){
      collectImage(img.id,ev).then((res)=>{
        img.is_collected=ev
      })
    },
    onDeleteImg(id){
      deleteImage(id).then(res=>{
        this.loadimage(this.dqpage)
      })
    }

  }
}
</script>

<style scoped lang="less">
.radio{
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.imgtp{
  position: relative;
  .imgsc{
    height: 40px;
    font-size: 25px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(204,204,204,0.5);
    position: absolute;
    right: 5px;
    left: 5px;
    bottom: 4px;
  }
}
</style>